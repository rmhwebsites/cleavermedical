# Cleaver Dermatology — Aesthetic Concierge (Treatment Recommendation Quiz)

## Overview

An interactive treatment recommendation quiz for [Cleaver Dermatology and Aesthetics](https://www.cleaverdermatologyandaesthetics.com). The quiz guides patients through a warm, educational experience to find aesthetic treatments matched to their goals, treatment area, and lifestyle preferences.

Built as a **Webflow-native** widget that reads live CMS data from a hidden Collection List — no API keys, no external databases. When new treatments are added to the CMS, the quiz automatically includes them.

---

## Quiz Flow

1. **Your Focus** — Select a treatment area (Face / Body / Hair)
2. **Your Goals** — Multi-select concerns, organized into educational groups
3. **Your Lifestyle** — Choose downtime tolerance (None through Significant, or "Show Me Everything")
4. **Your Results** — Ranked recommendations with a featured "Top Recommendation" card

---

## Files

| File | Purpose |
|------|---------|
| `treatment-quiz.js` | Quiz engine — reads CMS data, handles quiz logic, renders all UI steps |
| `treatment-quiz.css` | All styles (brand colors, layout, cards, chips, responsive) |
| `quiz-embed.html` | HTML embed snippet (`<div id="treatment-quiz">`) placed on the page |
| `SETUP.md` | Step-by-step Webflow deployment instructions |
| `README.md` | This file — project documentation |

---

## Architecture

### Data Source
The quiz reads from a **hidden Webflow CMS Collection List** on the page. The Collection List Wrapper has class `tq-data-source` (hidden via CSS `display: none`) and each Collection Item has class `tq-data-item` with data attributes bound to CMS fields:

- `data-name` — Treatment name
- `data-slug` — URL slug
- `data-area` — Treatment area(s), comma-separated (face, body, hair)
- `data-concerns` — Concern tags, comma-separated (e.g. "wrinkles,fine-lines,volume-loss")
- `data-downtime` — Downtime level (None / Minimal / Moderate / Significant)
- `data-description` — Short description
- Image element bound to CMS Image field

### Algorithm
1. Filter treatments by selected area
2. Score each treatment by counting how many of the user's selected concerns it matches
3. Filter by downtime preference (shows treatments at or below the selected level; "Show Me Everything" skips this filter)
4. Sort by match count descending, with alphabetical tiebreaker
5. Display top result as a featured card, remaining in a grid

### Dynamic CMS Integration
- **Predefined concern groups** provide a polished UX with educational descriptions (e.g. "Lines & Wrinkles — Smooth away fine lines and expression wrinkles")
- **Automatic catch-all**: Any CMS concerns not in a predefined group appear in an "Additional Concerns" group, so new treatments are never hidden
- **Known label map** (`CONCERN_LABELS`) provides friendly display names; unknown slugs auto-generate labels from the slug (e.g. "new-concern" becomes "New Concern")

---

## Brand Tokens

Extracted from the Cleaver Dermatology style guide page:

| Token | Value |
|-------|-------|
| Primary Blue | `#165b91` |
| Hover Blue | `#145283` |
| Light Background | `#eff7fc` |
| Text | `#000000` |
| Text Light | `#555555` |
| Border | `#d4e4ef` |
| Primary Font | Instrument Sans |
| Secondary Font | Inter |
| Button Radius | 40px (pill) |
| Card Radius | 12px |

These are defined as CSS custom properties in `:root` within `treatment-quiz.css`.

---

## Webflow Reference IDs

| Resource | ID |
|----------|----|
| Site | `690032f6301662f98be76300` |
| Aesthetic Treatments Collection | `698e0e8470774218b03ec31d` |
| Aesthetic Concierge Page | `69a6168c996b78eae8801a61` |

---

## CMS Collection: Aesthetic Treatments

28 treatments with the following key fields:

- **Name** — Treatment name
- **Slug** — URL slug (links to `/aesthetic-treatments/{slug}`)
- **Treatment Area** — Multi-reference or text (face, body, hair)
- **Concerns** — Comma-separated concern tags
- **Downtime** — Option field: None, Minimal, Moderate, Significant
- **Short Description** — Brief treatment description
- **Image** — Treatment photo

Additional CMS fields exist (Intro, What is it?, Benefits, FAQs, etc.) but are used on individual treatment pages, not the quiz.

---

## Tone & UX Approach

The quiz uses a **caring, luxury, friendly, educational** tone throughout:

- Welcome messaging: "Every journey is unique"
- Concern groups have educational descriptions explaining what each category addresses
- Downtime options use approachable language ("Walk-in, walk-out treatments", "Worth the Wait")
- Results include a consultation disclaimer with link to schedule
- No clinical or intimidating language

---

## What's Been Completed

- Full quiz engine (`treatment-quiz.js`) with 4-step flow
- Brand-matched CSS (`treatment-quiz.css`) with responsive design
- Warm, educational tone throughout all quiz copy
- Dynamic algorithm that auto-detects new CMS concerns
- Top recommendation featured card with match percentage
- Other results grid with CMS images, concern tags, and clickable links
- Concern grouping with educational descriptions
- SVG icons for area and downtime cards
- Consultation disclaimer with scheduling link
- Setup documentation (`SETUP.md`)
- HTML embed snippet (`quiz-embed.html`)

## What's Remaining

- **Deploy to Webflow**: Follow the steps in `SETUP.md` to:
  1. Host CSS & JS files (CDN or Webflow assets)
  2. Add CSS/JS links to Project Settings or page custom code
  3. Set up the hidden CMS Collection List with data attributes
  4. Add the HTML embed on the Aesthetic Concierge page
  5. Set Collection List item limit to 100
- **Test with live CMS data** on the published site
- **Optional**: Adjust concern groups or labels as the CMS evolves
