// Configuration file for the assistant agent
// Model and behavior settings go here (non-secret)

export const config = {
  // OpenAI Model Configuration
  openai: {
    // Using gpt-3.5-turbo as the cheapest model
    model: "gpt-3.5-turbo",
    maxTokens: 1000,
    temperature: 0.7,
  },

  // Rate Limiting Configuration
  rateLimit: {
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 30, // Limit each IP to 20 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Assistant Behavior Configuration
  assistant: {
    // Maximum conversation history to keep (number of messages)
    maxHistoryLength: 20,
    // System prompt will be loaded from portfolio context
    strictContext: true, // Enforce strict context based on portfolio
  },
};

