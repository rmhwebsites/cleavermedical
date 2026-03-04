# Treatment Quiz — Build Progress

## Status: LIVE
**Last Updated:** 2026-03-04

## Version History

### v3.9+ (Current — 2026-03-04)
- Laser hair removal added under Hair area with runtime fixup
- Secondary concerns now exclude the primary selection (prevents duplicates)
- Results limited to top 3 with "See More Recommendations" expand button
- Results grid centered (max-width 960px)
- Google Sheets webhook data collection infrastructure added
- Treatment type badges on result cards (Neuromodulator, Dermal Filler, Laser, etc.)
- Results speed badges (Instant, Quick, Moderate, Gradual)
- Tiered dollar sign icons for budget options ($, $, $$, $$)

### v3.4–3.8 (2026-03-03)
- Primary concern scoring: exact tag match (45pts) prioritized over partial (15pts)
- Nav button styles fixed with high-specificity selectors to override Webflow
- Badge variety: treatment type, downtime, and results speed per card
- Budget icons updated to US dollar signs with increasing tiers

### v3.0–3.3 (2026-03-02–03)
- Webflow-native architecture: real elements in Designer + JS interactivity
- 10-step quiz flow with multi-factor scoring algorithm
- 28 treatment profiles with intensity, budget, speed, maintenance, experience
- jsDelivr CDN hosting with commit-SHA pinning
- Scripts registered and applied via Webflow Scripts API

## What's Complete
- [x] Quiz engine JS with 10-step flow and multi-factor scoring
- [x] Quiz CSS with brand variables and responsive design
- [x] 28 treatments in CMS and fallback JSON data
- [x] Aesthetic Concierge page built with native Webflow elements
- [x] Scripts hosted on GitHub, delivered via jsDelivr CDN
- [x] 4 Webflow scripts registered and applied to page
- [x] Primary concern exact-match scoring priority
- [x] Unique treatment type + downtime + speed badges on result cards
- [x] Tiered budget icons ($–$$)
- [x] Hair area includes laser hair removal
- [x] Secondary concerns exclude primary selection
- [x] Top 3 results with expandable "See More"
- [x] Centered results grid
- [x] Google Sheets webhook infrastructure (needs URL)
- [x] README, SETUP, and PROGRESS docs updated

## What's Remaining
- [ ] **Google Sheets webhook URL**: User needs to deploy the Apps Script and set `WEBHOOK_URL` in treatment-quiz.js
- [ ] **Optional CMS Collection List**: Add hidden `.tq-data-source` list in Webflow Designer for live CMS data (currently using JSON fallback)
- [ ] **Mobile testing**: Edge cases on small screens
- [ ] **Analytics**: Monitor quiz completion rates via Google Sheets data

## CDN URLs
- CSS: `https://cdn.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-quiz.css`
- JS: `https://cdn.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-quiz.js`
- Data: `https://cdn.jsdelivr.net/gh/rmhwebsites/cleavermedical@main/treatment-data.js`

## Key IDs
- Site ID: `690032f6301662f98be76300`
- CMS Collection ID: `698e0e8470774218b03ec31d`
- Page ID: `69a6168c996b78eae8801a61` (Aesthetic Concierge)
- Page slug: `/aesthetic-concierge`
