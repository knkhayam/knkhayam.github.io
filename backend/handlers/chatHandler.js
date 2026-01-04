import OpenAI from 'openai';
import { config } from '../config.js';
import { getSystemPrompt } from '../utils/systemPrompt.js';

// Store conversation history per session (in production, use Redis or database)
const conversationHistory = new Map();

// Lazy initialization of OpenAI client (after env vars are loaded)
let openai = null;

function getOpenAIClient() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export const chatHandler = async (req, res) => {
  try {
    // Validate request
    const { message, sessionId } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Message is required and must be a non-empty string'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'Configuration error',
        message: 'OpenAI API key is not configured'
      });
    }

    // Get OpenAI client (lazy initialization)
    const openaiClient = getOpenAIClient();

    // Get or create conversation history for this session
    const sessionKey = sessionId || 'default';
    let history = conversationHistory.get(sessionKey) || [];

    // Limit history length
    if (history.length > config.assistant.maxHistoryLength) {
      history = history.slice(-config.assistant.maxHistoryLength);
    }

    // Get system prompt based on portfolio
    const systemPrompt = getSystemPrompt();

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message.trim() }
    ];

    // Call OpenAI API
    const completion = await openaiClient.chat.completions.create({
      model: config.openai.model,
      messages: messages,
      max_tokens: config.openai.maxTokens,
      temperature: config.openai.temperature,
    });

    const assistantMessage = completion.choices[0].message.content;

    // Update conversation history
    history.push(
      { role: 'user', content: message.trim() },
      { role: 'assistant', content: assistantMessage }
    );
    conversationHistory.set(sessionKey, history);

    // Return response
    res.json({
      success: true,
      message: assistantMessage,
      sessionId: sessionKey
    });

  } catch (error) {
    console.error('Chat handler error:', error);

    // Handle OpenAI API errors
    if (error instanceof OpenAI.APIError) {
      return res.status(error.status || 500).json({
        error: 'OpenAI API error',
        message: error.message || 'Failed to process request'
      });
    }

    // Handle other errors
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process chat message'
    });
  }
};

