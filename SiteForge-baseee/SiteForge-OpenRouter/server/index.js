require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const PORT = process.env.PORT || 4000;

if (!OPENROUTER_API_KEY) {
  console.warn('Warning: OPENROUTER_API_KEY not set in server/.env');
}

/*
POST /api/generate
Body: { prompt: string, theme: { mode:'dark'|'light', color:'#hex' } }
Returns: { html, css, js, raw }
*/
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, theme } = req.body;
    if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

    const systemInstruction = `
You are an expert web developer. Given the user's prompt, output a fully functional multi-page website (minimum 5 pages: Home, About, Services/Contact, Gallery/Resources, and one more relevant page) with three sections marked exactly as below (no extra commentary):

===HTML===
<!-- Full HTML content for a single file that simulates multi-page navigation using JavaScript (e.g., show/hide sections or use iframes for pages). Include responsive navigation (e.g., <nav> with buttons/links to switch pages), contextually relevant content (text, forms, etc.), and images from Unsplash (e.g., <img src="https://source.unsplash.com/random?relevant-keyword" alt="Description">). Ensure interactive functionality (e.g., forms, trackers) using embedded JS. Reference style.css and app.js inline or via links. -->
===CSS===
/* Full CSS for style.css, including responsive design and theme application (${JSON.stringify(theme || {})}) */
===JS===
/* Full JavaScript for app.js, handling multi-page navigation and interactivity */

Make the output self-contained, responsive, and aligned with the theme. Do not output other text.
    `.trim();

    const messages = [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: prompt }
    ];

    // OpenRouter Chat Completions endpoint
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'openai/gpt-oss-20b:free',
        messages,
        max_tokens: 4000,  // Increased for multi-page content
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const t = await response.text();
      return res.status(500).json({ error: 'OpenRouter error', details: t });
    }

    const data = await response.json();
    // OpenRouter follows OpenAI-compatible shape: choices[0].message.content
    const content = (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ? data.choices[0].message.content : (data.choices && data.choices[0] && data.choices[0].text) || '';

    if (!content) {
      return res.status(500).json({ error: 'No content from model', raw: data });
    }

    // Parse the three sections
    const htmlMatch = content.match(/===HTML===(.*?)===CSS===/is);
    const cssMatch = content.match(/===CSS===(.*?)===JS===/is);
    const jsMatch  = content.match(/===JS===(.*)$/is);

    const html = htmlMatch ? htmlMatch[1].trim() : '';
    const css  = cssMatch  ? cssMatch[1].trim() : '';
    const js   = jsMatch   ? jsMatch[1].trim() : '';

    return res.json({ html, css, js, raw: content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
