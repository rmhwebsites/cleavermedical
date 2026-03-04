# Cleaver Dermatology — Aesthetic Concierge (Treatment Recommendation Quiz)

## Overview

An interactive treatment recommendation quiz for [Cleaver Dermatology and Aesthetics](https://www.cleaverdermatologyandaesthetics.com). The quiz guides patients through a warm, educational experience to find aesthetic treatments matched to their goals, treatment area, and lifestyle preferences.

Built as a **Webflow-native** widget using hidden CMS Collection List + custom JS/CSS delivered via jsDelivr CDN. When new treatments are added to the CMS, the quiz automatically includes them.

**Live page:** `/aesthetic-concierge`

---

## Quiz Flow (10 Steps)

1. **Treatment Area** — Face / Body / Hair
2. **Primary Concern** — Dynamic options based on selected area
3. **Secondary Concerns** — Multi-select (excludes primary, auto-skipped if ≤1 option)
4. **Skin Sensitivity** — Very Sensitive / Somewhat / Not Very / Not Sure
5. **Treatment Experience** — First Time / Tried a Few / Regular / Open to Anything
6. **Treatment Intensity** — Gentle / Moderate / Advanced / Maximum
7. **Downtime Tolerance** — None / A Day or Two / A Few Days / Whatever It Takes
8. **Budget Range** — $ / $ / $$ / $$ (tiered dollar sign icons)
9. **Results Timeline** — Immediate / Within Weeks / Gradual / Patient
10. **Age Range** — Under 25 / 25-35 / 36-50 / Over 50

**Results:** Top 3 ranked recommendations with match percentages, treatment type badges, downtime level, and results speed. "See More Recommendations" button reveals additional matches.

---

## Files

| File | Purpose |
|------|---------|
| `treatment-quiz.js` | Quiz engine — reads CMS/JSON data, 10-step flow, multi-factor scoring, results rendering, data collection |
| `treatment-quiz.css` | All styles (brand colors, layout, cards, progress bar, responsive) |
| `treatment-data.js` | Fallback treatment data (28 treatments as JSON) for when CMS list is unavailable |
| `quiz-embed.html` | HTML embed snippet (`<div id="treatment-quiz">`) |
| `SETUP.md` | Webflow deployment and architecture documentation |
| `PROGRESS.md` | Build progress tracker |
| `README.md` | This file |

---

## Architecture

### Data Source
The quiz reads from a **hidden Webflow CMS Collection List** on the page (`.tq-data-source` wrapper, `.tq-data-item` items with data attributes). Falls back to `treatment-data.js` JSON if the CMS list is absent.

### Scoring Algorithm
Multi-factor weighted scoring system:

| Factor | Points | Description |
|--------|--------|-------------|
| Area match | Required | Treatment must match selected area |
| Primary concern (exact) | 45 pts | Exact tag match against treatment concerns |
| Primary concern (partial) | 15 pts | Partial term match (fallback) |
| Secondary concerns | 18 pts max | Up to 3 matches at 6 pts each |
| Downtime tolerance | 12 pts | Treatment downtime vs. user preference |
| Intensity match | 10 pts | Treatment intensity vs. user preference |
| Budget match | 8 pts | Treatment cost tier vs. user budget |
| Timeline match | 7 pts | Result speed vs. user expectations |
| Experience level | 5 pts | Treatment complexity vs. user experience |
| Sensitivity modifier | -8 to +3 | Adjusts for sensitive skin |
| Age bonus | +2 to +3 | Age-appropriate treatment boost |

### Treatment Profiles
Each of the 28 treatments has a knowledge-base profile with: intensity, budget tier, results speed, maintenance frequency, experience level, and treatment type (e.g., Neuromodulator, Dermal Filler, Laser, Chemical Peel, etc.).

### Result Card Badges
Each result card displays 3 contextual badges:
- **Treatment Type** (e.g., "RF Microneedling", "Dermal Filler", "CO2 Laser")
- **Downtime** (None / Minimal / Moderate / Significant)
- **Results Speed** (Instant / Quick / Moderate / Gradual)

### Data Collection
Quiz submissions are sent to a Google Sheets webhook (via Google Apps Script). Collected data includes all quiz answers, top result, and full results list. Set the `WEBHOOK_URL` variable in `treatment-quiz.js` to enable.

---

## Brand Tokens

| Token | Value |
|-------|-------|
| Primary Blue | `#165b91` |
| Hover Blue | `#145283` |
| Light Background | `#eff7fc` |
| Text | `#1a1a1a` |
| Text Light | `#555555` |
| Border | `#d4e4ef` |
| Primary Font | Instrument Sans |
| Secondary Font | Inter |
| Button Radius | 40px (pill) |
| Card Radius | 12px |

Defined as CSS custom properties (`--tq-*`) in `:root`.

---

## Webflow Reference IDs

| Resource | ID |
|----------|----|
| Site | `690032f6301662f98be76300` |
| Aesthetic Treatments Collection | `698e0e8470774218b03ec31d` |
| Aesthetic Concierge Page | `69a6168c996b78eae8801a61` |
| Page Slug | `/aesthetic-concierge` |

---

## CDN URLs (jsDelivr from GitHub)

- **CSS:** `https://cdn.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-quiz.css`
- **JS:** `https://cdn.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-quiz.js`
- **Data:** `https://cdn.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-data.js`

For cache-busted URLs, use a specific commit SHA instead of `@main`.

---

## Webflow Scripts (Applied to Page)

Four scripts registered via Webflow Scripts API:

1. **Quiz Dynamic Styles** (header) — Inline CSS for dynamic elements
2. **Quiz CSS Loader** (header) — Loads `treatment-quiz.css` from jsDelivr
3. **Quiz Data Loader** (header) — Loads `treatment-data.js` from jsDelivr
4. **Quiz JS Loader** (footer) — Loads `treatment-quiz.js` from jsDelivr

---

## CMS Collection: Aesthetic Treatments

28 treatments with fields:

- **Name** — Treatment name
- **Slug** — URL slug (links to `/aesthetic-treatments/{slug}`)
- **Treatment Area** — Comma-separated (face, body, hair)
- **Concerns** — Comma-separated concern tags
- **Downtime** — Option: None / Minimal / Moderate / Significant
- **Short Description** — Brief treatment description
- **Image** — Treatment photo

---

## Deployment

See `SETUP.md` for full deployment instructions. Quick update workflow:

```bash
git add . && git commit -m "Update quiz" && git push
```

Then purge jsDelivr cache:
```
https://purge.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-quiz.js
https://purge.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-quiz.css
```
