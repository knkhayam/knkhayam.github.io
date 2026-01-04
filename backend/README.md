# Portfolio Assistant Backend

Backend service for the portfolio help assistant chat feature.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=your_actual_api_key_here
```

4. Configure other settings in `.env` if needed:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `ALLOWED_ORIGIN`: CORS origin (default: *)

## Configuration

Model and behavior settings are in `config.js`:
- OpenAI model (currently: gpt-3.5-turbo - cheapest option)
- Rate limiting settings
- Assistant behavior settings

Secrets go in `.env` file (not committed to repo).

## Running

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

## API Endpoints

### POST `/api/chat`
Chat endpoint for assistant interactions.

**Request:**
```json
{
  "message": "Can you implement a mobile app?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Assistant response...",
  "sessionId": "session-id"
}
```

### GET `/health`
Health check endpoint.

## Rate Limiting

- 20 requests per 15 minutes per IP address
- Configured in `config.js`

## Notes

- Conversation history is stored in memory (per session)
- For production, consider using Redis or a database for persistent storage
- The assistant uses strict context based on the portfolio content

