# SiteForge - AI based Automatic Website Builder (OpenRouter)

This project uses OpenRouter (model `openai/gpt-oss-20b:free`) to generate complete single-page websites from natural language prompts.
The project includes a small Express server (to keep your API key secret) and a React (Vite) frontend.

## Quick steps (VS Code)

1. **Download & unzip**
   - Download the provided ZIP and open the folder in VS Code.

2. **Server setup**
   - Open a terminal in VS Code, `cd server`
   - Copy the example env and paste your OpenRouter API key:
     ```bash
     cp .env.example .env
     # then open .env and set OPENROUTER_API_KEY=your_key_here
     ```
   - Install and start:
     ```bash
     npm install
     npm start
     ```
   - Server will run at `http://localhost:4000`

3. **Client setup**
   - Open a new terminal, `cd client`
   - Install and start Vite:
     ```bash
     npm install
     npm run dev
     ```
   - Open `http://localhost:5173` in your browser.

4. **Generate websites**
   - Enter a prompt or click a sample prompt, then press `Generate`.
   - Preview appears in the right panel.
   - Toggle `Show Code` to view HTML/CSS/JS and `Download ZIP` to save the generated site.

## Where to paste the API key
Paste your OpenRouter key into `server/.env`:
```
OPENROUTER_API_KEY=sk_...
OPENROUTER_MODEL=openai/gpt-oss-20b:free
PORT=4000
```

## Notes
- The server sends the prompt + a strict system instruction asking the model to output 3 exact sections: `===HTML===`, `===CSS===`, `===JS===`.
- If the model output misses the markers, try regenerating or slightly reword the prompt. You can also increase `max_tokens` in `server/index.js`.
- Do **not** share your `.env` or API key publicly.

Enjoy! If you want, I can:
- Replace the server to use the official `openai` npm client configured for OpenRouter.
- Add a nicer UI / favicon / sample images.
- Improve parsing to be tolerant of missing markers.