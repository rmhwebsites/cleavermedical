# Treatment Quiz — Build Progress

## Status: IN PROGRESS
**Last Updated:** 2026-03-03

## What's Done
- [x] Quiz engine JS (`treatment-quiz.js`) — 10-step quiz with multi-factor scoring
- [x] Quiz CSS (`treatment-quiz.css`) — Full styles with Cleaver brand variables
- [x] CMS Collection "Aesthetic Treatments" — All 28 items populated with quiz fields:
  - `treatment-area` (face/body/hair)
  - `concerns` (comma-separated tags)
  - `downtime` (Option: None/Minimal/Moderate/Significant)
- [x] Aesthetic Concierge page built in Webflow Designer with:
  - All 10 quiz step containers (data-step="1" through "10" + "results")
  - Progress bar with data-quiz attributes (progress-fill, step-label, step-counter)
  - Option grids (data-options for each step)
  - Navigation (Back/Next buttons with data-quiz attributes)
  - Results section with heading
- [x] Setup documentation (SETUP.md)

## What's Remaining
- [ ] **Add hidden CMS Collection List** on the Aesthetic Concierge page
  - Wrapper class: `tq-data-source`
  - Item class: `tq-data-item`
  - Data attributes: data-name, data-slug, data-area, data-concerns, data-downtime, data-description
  - Increase item limit to 100
- [ ] **Add custom CSS** to page/site head code
  - Link to hosted `treatment-quiz.css`
- [ ] **Add custom JS** to page/site footer code
  - Link to hosted `treatment-quiz.js`
- [ ] **Test quiz end-to-end** — verify data loads, scoring works, results display
- [ ] **Polish** — mobile responsiveness, edge cases, CTA links

## Key Info
- Site ID: `690032f6301662f98be76300`
- CMS Collection ID: `698e0e8470774218b03ec31d`
- Page ID: `69a6168c996b78eae8801a61` (Aesthetic Concierge)
- Page slug: `/aesthetic-concierge`

## Architecture
- Hidden `.tq-data-source` Collection List provides CMS data via data attributes
- JS reads `.tq-data-item` elements on page load, powers the quiz
- Quiz renders inside `#treatment-quiz` div (or the existing page structure with data-step/data-quiz attributes)
- Results link to `/aesthetic-treatments/{slug}`
