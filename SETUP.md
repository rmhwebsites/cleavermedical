# Cleaver Dermatology — Treatment Recommendation Quiz Setup

## Overview

The Treatment Quiz is a Webflow-native interactive widget that recommends aesthetic treatments based on user preferences. It reads live CMS data from a hidden Collection List on the page, so recommendations stay in sync with the CMS automatically.

**Quiz Flow:**
1. Select treatment area (Face / Body / Hair)
2. Select concerns (multi-select, filtered by area)
3. Choose downtime preference
4. View matched & ranked treatment results

---

## Files

| File | Purpose |
|------|---------|
| `treatment-quiz.css` | All quiz styles (Cleaver brand colors/fonts) |
| `treatment-quiz.js` | Quiz engine — reads CMS data, runs quiz logic, renders UI |
| `quiz-embed.html` | HTML embed snippet (the `<div id="treatment-quiz">` container) |

---

## Setup Instructions

### Step 1: Host CSS & JS Files

Upload `treatment-quiz.css` and `treatment-quiz.js` to a CDN or file host. Options:

- **Webflow Assets:** Upload as assets and get the URLs
- **External CDN:** GitHub Pages, Netlify, Cloudflare Pages, etc.
- **Inline in Project Settings:** Paste CSS into `<head>` and JS into `</body>` in Project Settings > Custom Code (not ideal for large files)

### Step 2: Add CSS & JS to the Site

In **Webflow Project Settings > Custom Code**:

**Head Code** — add the CSS link:
```html
<link rel="stylesheet" href="YOUR_CSS_URL/treatment-quiz.css">
```

**Footer Code** — add the JS:
```html
<script src="YOUR_JS_URL/treatment-quiz.js"></script>
```

Or add these only to the specific page (Aesthetic Concierge) via the page's custom code settings.

### Step 3: Set Up the Hidden CMS Collection List

On the **Aesthetic Concierge** page in the Webflow Designer:

1. **Add a Collection List** anywhere on the page (before the quiz embed is fine)
2. **Bind it** to the **"Aesthetic Treatments"** collection
3. Set the **Collection List Wrapper** class to: `tq-data-source`
4. On each **Collection Item**, set the class to: `tq-data-item`
5. Add these **custom attributes** to the Collection Item element (bind each to the CMS field):

| Attribute | CMS Field |
|-----------|-----------|
| `data-name` | Name |
| `data-slug` | Slug |
| `data-area` | Treatment Area |
| `data-concerns` | Concerns |
| `data-downtime` | Downtime |
| `data-description` | Short Description |

6. **Add an Image element** inside the Collection Item, bound to the **Image** field
7. The Collection List Wrapper will be hidden by the CSS (`display: none`), so it won't appear on the page

> **Note:** In Webflow Designer, you add custom attributes via the element settings panel (gear icon) > Custom Attributes section. When binding to a CMS field, click the "Get from (field)" option.

### Step 4: Add the Quiz Embed

1. Below the hidden Collection List, add an **HTML Embed** element
2. Paste the contents of `quiz-embed.html`:
```html
<div id="treatment-quiz"></div>
```
3. That's it — the JavaScript will render the full quiz UI inside this div

### Step 5: Increase Collection List Limit

By default, Webflow limits Collection Lists to 5 items. Since there are 28 treatments:

1. Select the Collection List Wrapper
2. In the settings panel, change the **item limit** to **100**

---

## How It Works

1. When the page loads, the JS reads all `.tq-data-item` elements from the hidden `.tq-data-source` Collection List
2. It parses the `data-*` attributes into a treatment array
3. The quiz renders step-by-step inside `#treatment-quiz`
4. On the results step, treatments are scored by how many of the user's selected concerns they match
5. Results link to `/aesthetic-treatments/{slug}` (the CMS template page)

---

## Customization

### Colors & Fonts
Edit the CSS variables at the top of `treatment-quiz.css`:
```css
:root {
  --quiz-primary: #165b91;     /* Headings, card labels */
  --quiz-accent: #165b91;      /* Buttons, active states, links */
  --quiz-accent-hover: #145283;/* Button hover */
  --quiz-bg: #eff7fc;          /* Light background */
  --quiz-text: #000000;        /* Body text */
  --quiz-text-light: #555555;  /* Secondary text */
  --quiz-border: #d4e4ef;      /* Card borders */
  --quiz-font: 'Instrument Sans', 'Inter', sans-serif;
}
```

### Concern Groups
Edit `CONCERN_GROUPS` in `treatment-quiz.js` to change how concerns are categorized in Step 2.

### Treatment Page URL Pattern
The results link to `/aesthetic-treatments/{slug}`. If your URL structure differs, edit the `renderResultsStep()` method in `treatment-quiz.js`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Quiz shows "Loading treatments..." | Collection List not found. Make sure the wrapper has class `tq-data-source` and items have class `tq-data-item` |
| Only 5 treatments appear | Increase the Collection List item limit to 100 in Webflow |
| No concerns show for an area | The `Treatment Area` field may be empty for some treatments. Check CMS entries |
| Images missing in results | Ensure each Collection Item has an Image element bound to the CMS Image field |
| Downtime filter shows nothing | Make sure the `Downtime` Option field is set for each treatment in the CMS |
