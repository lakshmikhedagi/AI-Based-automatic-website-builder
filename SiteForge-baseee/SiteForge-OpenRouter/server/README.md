# Server (Express) for SiteForge - OpenRouter

1. Copy `.env.example` to `.env` and paste your OpenRouter API key:
   ```bash
   cp .env.example .env
   # then edit .env and set OPENROUTER_API_KEY
   ```

2. Install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Start server:
   ```bash
   npm start
   ```

The server exposes POST /api/generate which the client uses.