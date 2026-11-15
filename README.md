# KisahJadiLagu — Phase 1 foundation

A bilingual (Indonesian/English) responsive web starter for a personalized-song service.

## Included in this phase
- Responsive landing page and brand starter
- Indonesian / English interface switch
- Two-step story intake form
- Lyrics-generation API route using an OpenAI API key stored server-side
- Clear placeholder boundary for the future music-generation provider, database, auth, payments, and admin dashboard

## Requirements
- Node.js 20+
- An OpenAI API key for live lyric generation

## Run locally
1. Install Node.js from https://nodejs.org/
2. Open a terminal in this folder.
3. Run `npm install`
4. Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`.
5. Start the API: `npm run server` (terminal 1).
6. Start the website: `npm run dev` (terminal 2).
7. Open the local URL printed by Vite, usually http://localhost:5173.

## Important
The frontend is configured to call `/api/lyrics`. For local development, configure a Vite proxy or serve the API behind the same origin. Add the following to `vite.config.js` under `server`: `proxy: { '/api': 'http://localhost:8787' }`.

No music-generation provider is wired in yet. Select a provider with an official API and confirm its licensing, commercial terms, output rights, and regional availability before phase 3. Do not expose API keys in frontend code.
