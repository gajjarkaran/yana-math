# Yana's Math Guide 🧠

A personal math study guide for **Yana Mistry (Grade 6)**. Covers all core US Common Core Grade 6 math topics with formulas, practice problems, step-by-step solutions, and progress tracking.

## What this app does

- 7 topics: Fractions, Decimals, Ratios & Proportions, Percentages, Geometry, Integers, Expressions & Equations
- 15 problems per topic (105 total), all aligned to US Common Core Grade 6 standards
- Each problem has a "Reveal Answer" button that shows a step-by-step solution
- After revealing, Yana can mark herself as "Got it 👍" or "Still learning 🤔"
- Problems can also be manually toggled as done/not done
- Progress is tracked per topic and overall, with a streak counter
- A confetti celebration fires when a topic is fully completed
- All progress is saved in the browser (localStorage) — it persists across sessions

## Running locally

```bash
cd yana-math
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Resetting progress

In the app, scroll below the hero section on the home screen. You'll see a **"Reset progress"** button next to the Topics heading. Click it and confirm to wipe all progress and start fresh.

## Deploying to GitHub Pages

```bash
npm run deploy
```

This builds the app and pushes it to the `gh-pages` branch. Make sure GitHub Pages is configured to serve from that branch in your repo settings.

Live at: https://gajjarkaran.github.io/yana-math/

## Tech stack

- React + Vite
- Tailwind CSS
- canvas-confetti
