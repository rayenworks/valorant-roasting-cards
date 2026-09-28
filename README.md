# Valorant Roast Cards

Enter a Valorant Riot ID and get swipeable roast cards about your rank, worst map, worst agent and overall win rate.

**Live demo:** https://YOUR-APP-NAME.onrender.com

> The free host sleeps when idle, so the first load can take about a minute.

![Screenshot](screenshot.png)

## Features
- Swipeable card deck (touch, mouse drag, arrows, keyboard)
- Rank and agent icons on the cards
- Real stats through the HenrikDev API, with a demo mode that uses fake data
- Rate limiting, input validation and security headers (helmet)

## Tech stack
Node.js, Express, axios, vanilla JavaScript, HTML/CSS. Deployed on Render.

## Run it locally
1. `git clone https://github.com/rayenworks/valorant-roasting-cards.git`
2. `cd valorant-roasting-cards`
3. `npm install`
4. Copy `.env.example` to `.env`
5. `npm run dev`, then open http://localhost:5000

With `MOCK_MODE=true` (the default in `.env.example`) it runs with fake demo data and needs no key. For real stats, set `MOCK_MODE=false` and add a free HenrikDev API key as `HENRIK_API_KEY`.

## Disclaimer
Not affiliated with Riot Games. Uses the unofficial HenrikDev API.
