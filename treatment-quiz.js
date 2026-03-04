/* ============================================
   Cleaver Dermatology — Aesthetic Concierge
   Treatment Recommendation Quiz Engine

   Reads live CMS data from a hidden Collection List.
   Concerns and treatments auto-update when new CMS
   items are added — no code changes needed.
   ============================================ */

(function () {
  'use strict';

  /* --------------------------------------------------
     Friendly display names for known concern slugs.
     Any NEW slugs added to the CMS will auto-generate
     a label from the slug (e.g. "new-concern" → "New Concern").
     -------------------------------------------------- */
  const CONCERN_LABELS = {
    'wrinkles': 'Wrinkles',
    'fine-lines': 'Fine Lines',
    'expression-lines': 'Expression Lines',
    'frown-lines': 'Frown Lines',
    'crows-feet': "Crow's Feet",
    'deep-lines': 'Deep Lines',
    'volume-loss': 'Volume Loss',
    'facial-folds': 'Facial Folds',
    'lip-enhancement': 'Lip Enhancement',
    'nasolabial-folds': 'Nasolabial Folds',
    'lift': 'Lift & Firmness',
    'skin-firmness': 'Skin Firmness',
    'dark-spots': 'Dark Spots',
    'uneven-tone': 'Uneven Skin Tone',
    'hyperpigmentation': 'Hyperpigmentation',
    'discoloration': 'Discoloration',
    'pigmentation': 'Pigmentation',
    'brown-spots': 'Brown Spots',
    'sun-damage': 'Sun Damage',
    'redness': 'Redness',
    'texture': 'Skin Texture',
    'pores': 'Pores',
    'acne-scars': 'Acne Scars',
    'scars': 'Scars',
    'resurfacing': 'Skin Resurfacing',
    'smoothing': 'Smoothing',
    'skin-tightening': 'Skin Tightening',
    'collagen-stimulation': 'Collagen Boost',
    'dull-skin': 'Dull Skin',
    'glow': 'Healthy Glow',
    'radiance': 'Radiance',
    'brightening': 'Brightening',
    'refreshing': 'Refreshing',
    'hydration': 'Hydration',
    'deep-cleansing': 'Deep Cleansing',
    'cleansing': 'Cleansing',
    'exfoliation': 'Exfoliation',
    'acne': 'Acne',
    'oily-skin': 'Oily Skin',
    'skin-clarity': 'Skin Clarity',
    'brow-enhancement': 'Brow Enhancement',
    'sparse-brows': 'Sparse Brows',
    'brow-shaping': 'Brow Shaping',
    'hair-removal': 'Hair Removal',
    'unwanted-hair': 'Unwanted Hair',
    'double-chin': 'Double Chin',
    'fat-reduction': 'Fat Reduction',
    'submental-fat': 'Submental Fullness',
    'body-contouring': 'Body Contouring',
    'stubborn-fat': 'Stubborn Fat',
    'spider-veins': 'Spider Veins',
    'leg-veins': 'Leg Veins',
    'vascular': 'Vascular Concerns',
    'tattoo-removal': 'Tattoo Removal',
    'ink-removal': 'Ink Removal',
    'hair-loss': 'Hair Loss',
    'thinning-hair': 'Thinning Hair',
    'hair-restoration': 'Hair Restoration',
    'hair-rejuvenation': 'Hair Rejuvenation',
    'skin-rejuvenation': 'Skin Rejuvenation',
    'relaxation': 'Relaxation',
  };

  /* --------------------------------------------------
     Known concern groupings for a polished UX.
     Groups only appear if the CMS actually contains
     treatments with those concerns for the selected area.

     Any CMS concerns NOT listed here will automatically
     appear in an "Additional Concerns" group at the end,
     so new treatments are never hidden.
     -------------------------------------------------- */
  const CONCERN_GROUP_DEFS = {
    face: [
      { label: 'Lines & Wrinkles', desc: 'Smooth away fine lines and expression wrinkles', concerns: ['wrinkles', 'fine-lines', 'expression-lines', 'frown-lines', 'crows-feet', 'deep-lines'] },
      { label: 'Volume & Contouring', desc: 'Restore fullness and sculpt natural contours', concerns: ['volume-loss', 'facial-folds', 'lip-enhancement', 'nasolabial-folds', 'lift', 'skin-firmness'] },
      { label: 'Dark Spots & Tone', desc: 'Even out discoloration for a clearer complexion', concerns: ['dark-spots', 'uneven-tone', 'hyperpigmentation', 'discoloration', 'pigmentation', 'brown-spots'] },
      { label: 'Sun Damage & Redness', desc: 'Repair visible effects of sun exposure', concerns: ['sun-damage', 'redness'] },
      { label: 'Texture & Pores', desc: 'Refine skin surface for a smoother feel', concerns: ['texture', 'pores', 'acne-scars', 'scars', 'resurfacing', 'smoothing'] },
      { label: 'Tightening & Firming', desc: 'Promote collagen for a firmer, lifted look', concerns: ['skin-tightening', 'collagen-stimulation'] },
      { label: 'Glow & Radiance', desc: 'Revive dull, tired skin with a healthy luminosity', concerns: ['dull-skin', 'glow', 'radiance', 'brightening', 'refreshing'] },
      { label: 'Hydration & Cleansing', desc: 'Deeply nourish and purify your skin', concerns: ['hydration', 'deep-cleansing', 'cleansing', 'exfoliation'] },
      { label: 'Acne & Oil Control', desc: 'Calm breakouts and balance oily skin', concerns: ['acne', 'oily-skin', 'skin-clarity'] },
      { label: 'Brow Enhancement', desc: 'Shape and define your brows beautifully', concerns: ['brow-enhancement', 'sparse-brows', 'brow-shaping'] },
      { label: 'Hair Removal', desc: 'Safely reduce unwanted facial hair', concerns: ['hair-removal', 'unwanted-hair'] },
    ],
    body: [
      { label: 'Body Contouring & Fat Reduction', desc: 'Sculpt and refine your natural silhouette', concerns: ['fat-reduction', 'body-contouring', 'stubborn-fat', 'double-chin', 'submental-fat'] },
      { label: 'Vein Treatments', desc: 'Minimize visible veins for smoother-looking legs', concerns: ['spider-veins', 'leg-veins', 'vascular'] },
      { label: 'Tattoo Removal', desc: 'Safely fade unwanted ink over time', concerns: ['tattoo-removal', 'ink-removal'] },
      { label: 'Hair Removal', desc: 'Long-lasting smoothness with targeted treatments', concerns: ['hair-removal', 'unwanted-hair'] },
    ],
    hair: [
      { label: 'Hair Restoration', desc: 'Support healthier, fuller-looking hair growth', concerns: ['hair-loss', 'thinning-hair', 'hair-restoration', 'hair-rejuvenation'] },
    ],
  };

  /* ---------- Area card config (warm, educational tone) ---------- */
  const AREA_OPTIONS = [
    {
      value: 'face',
      label: 'Face',
      icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="13" rx="8" ry="9"/><circle cx="9" cy="11" r="0.5" fill="currentColor"/><circle cx="15" cy="11" r="0.5" fill="currentColor"/><path d="M10 16a4 4 0 004 0"/></svg>',
      desc: 'Rejuvenate your complexion with treatments for wrinkles, tone, texture, and more',
    },
    {
      value: 'body',
      label: 'Body',
      icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 100 6 3 3 0 000-6zM16 21v-2a4 4 0 00-8 0v2"/><path d="M12 8v5m-3 3l3-3 3 3"/></svg>',
      desc: 'Contour, smooth, and refine with body-focused aesthetic treatments',
    },
    {
      value: 'hair',
      label: 'Hair',
      icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 4 5 4 10c0 3 1.5 5 4 6v6h8v-6c2.5-1 4-3 4-6 0-5-4-8-8-8z"/><path d="M8 10c0-3 2-5 4-5"/></svg>',
      desc: 'Restore volume and vitality with advanced hair rejuvenation solutions',
    },
  ];

  /* ---------- Downtime card config (caring, informative) ---------- */
  const DOWNTIME_OPTIONS = [
    {
      value: 'any',
      label: 'Show Me Everything',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>',
      desc: "I'm open to all options — let's see what's best for my goals",
    },
    {
      value: 'None',
      label: 'No Downtime',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      desc: 'Walk-in, walk-out treatments — return to your day right away',
    },
    {
      value: 'Minimal',
      label: 'Minimal',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
      desc: 'A day or two of mild redness or sensitivity — easy to plan around',
    },
    {
      value: 'Moderate',
      label: 'Moderate',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      desc: 'A few days to a week — plan a little time for healing',
    },
    {
      value: 'Significant',
      label: 'Worth the Wait',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      desc: 'More dramatic results that are well worth a recovery period',
    },
  ];

  /* ====================================================
     Quiz Class
     ==================================================== */
  class TreatmentQuiz {
    constructor() {
      this.container = document.getElementById('treatment-quiz');
      if (!this.container) return;

      this.treatments = [];
      this.currentStep = 0;
      this.totalSteps = 4;
      this.selections = {
        area: null,
        concerns: [],
        downtime: null,
      };

      this.parseTreatments();
      this.render();
    }

    /* ---- Parse treatment data ----
       Priority: 1) Hidden CMS Collection List  2) window.__QUIZ_TREATMENTS JSON
       ---------------------------------------------------------------- */
    parseTreatments() {
      const source = document.querySelector('.tq-data-source');
      if (source) {
        const items = source.querySelectorAll('.tq-data-item');
        this.treatments = Array.from(items).map(el => {
          const img = el.querySelector('img');
          return {
            name: (el.getAttribute('data-name') || '').trim(),
            slug: (el.getAttribute('data-slug') || '').trim(),
            areas: (el.getAttribute('data-area') || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
            concerns: (el.getAttribute('data-concerns') || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
            downtime: (el.getAttribute('data-downtime') || '').trim(),
            description: (el.getAttribute('data-description') || '').trim(),
            image: img ? img.getAttribute('src') : '',
          };
        });
        return;
      }

      if (window.__QUIZ_TREATMENTS && Array.isArray(window.__QUIZ_TREATMENTS)) {
        this.treatments = window.__QUIZ_TREATMENTS.map(t => ({
          name: (t.name || '').trim(),
          slug: (t.slug || '').trim(),
          areas: (t.area || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
          concerns: (t.concerns || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
          downtime: (t.downtime || '').trim(),
          description: (t.description || '').trim(),
          image: t.image || '',
        }));
        return;
      }

      console.warn('Aesthetic Concierge: No treatment data found.');
    }

    /* ---- Dynamically build concern groups for the selected area ----
       Uses predefined groups for polish, but auto-detects any NEW
       CMS concerns and adds them in an "Additional Concerns" group
       so nothing is ever hidden when the CMS is updated.
       ---------------------------------------------------------------- */
    getAvailableConcernGroups() {
      const area = this.selections.area;
      if (!area) return [];

      // Collect every concern present in treatments for this area
      const available = new Set();
      this.treatments.forEach(t => {
        if (t.areas.includes(area)) {
          t.concerns.forEach(c => available.add(c));
        }
      });

      // Start with the predefined groups, filtered to what's actually in the CMS
      const defs = CONCERN_GROUP_DEFS[area] || [];
      const claimed = new Set();
      const groups = [];

      defs.forEach(g => {
        const filtered = g.concerns.filter(c => available.has(c));
        if (filtered.length > 0) {
          groups.push({ label: g.label, desc: g.desc, concerns: filtered });
          filtered.forEach(c => claimed.add(c));
        }
      });

      // Any CMS concerns NOT in a predefined group → "Additional Concerns"
      const unclaimed = [...available].filter(c => !claimed.has(c));
      if (unclaimed.length > 0) {
        groups.push({
          label: 'Additional Concerns',
          desc: 'Other goals our team can help with',
          concerns: unclaimed,
        });
      }

      return groups;
    }

    /* ---- Score & rank treatments ---- */
    getResults() {
      const { area, concerns, downtime } = this.selections;

      let filtered = this.treatments.filter(t => t.areas.includes(area));

      // Score by number of matching concerns
      let scored = filtered.map(t => {
        const matchCount = concerns.filter(c => t.concerns.includes(c)).length;
        return { ...t, matchCount };
      });

      // Must match at least one concern
      scored = scored.filter(t => t.matchCount > 0);

      // Filter by downtime preference (show up to the selected level)
      if (downtime && downtime !== 'any') {
        const order = ['None', 'Minimal', 'Moderate', 'Significant'];
        const maxIdx = order.indexOf(downtime);
        if (maxIdx >= 0) {
          scored = scored.filter(t => {
            const tIdx = order.indexOf(t.downtime);
            return tIdx >= 0 && tIdx <= maxIdx;
          });
        }
      }

      // Sort: highest match count first, then alphabetical for ties
      scored.sort((a, b) => {
        if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
        return a.name.localeCompare(b.name);
      });

      return scored;
    }

    /* ================= Rendering ================= */

    render() {
      if (this.treatments.length === 0) {
        this.container.innerHTML = `
          <div class="tq-wrapper">
            <div class="tq-loading">
              <div class="tq-spinner"></div>
              <p>Preparing your experience&hellip;</p>
            </div>
          </div>`;
        return;
      }
      this.renderStep();
    }

    renderStep() {
      const step = this.currentStep;
      let html = `<div class="tq-wrapper">`;
      html += this.renderProgress();

      if (step === 0) html += this.renderAreaStep();
      else if (step === 1) html += this.renderConcernsStep();
      else if (step === 2) html += this.renderDowntimeStep();
      else if (step === 3) html += this.renderResultsStep();

      html += `</div>`;
      this.container.innerHTML = html;
      this.bindEvents();
    }

    renderProgress() {
      const step = this.currentStep;
      const labels = ['Your Focus', 'Your Goals', 'Your Lifestyle', 'Your Results'];
      let html = `<div class="tq-progress">`;
      for (let i = 0; i < this.totalSteps; i++) {
        html += `<div class="tq-progress-step ${i <= step ? 'active' : ''}"></div>`;
      }
      html += `<span class="tq-progress-label">${labels[step]}</span>`;
      html += `</div>`;
      return html;
    }

    /* ---- Step 0: Area ---- */
    renderAreaStep() {
      let html = `<div class="tq-step active">`;
      html += `<div class="tq-step-header">
        <h2 class="tq-step-title">Welcome! Let's find your perfect treatment.</h2>
        <p class="tq-step-subtitle">Every journey is unique. Start by telling us which area you'd like to focus on.</p>
      </div>`;
      html += `<div class="tq-options">`;
      AREA_OPTIONS.forEach(opt => {
        const sel = this.selections.area === opt.value ? 'selected' : '';
        html += `<div class="tq-option ${sel}" data-action="select-area" data-value="${opt.value}">
          <span class="tq-option-icon">${opt.icon}</span>
          <span class="tq-option-label">${opt.label}</span>
          <span class="tq-option-desc">${opt.desc}</span>
        </div>`;
      });
      html += `</div>`;
      html += this.renderNav({ showBack: false, nextDisabled: !this.selections.area });
      html += `</div>`;
      return html;
    }

    /* ---- Step 1: Concerns ---- */
    renderConcernsStep() {
      const groups = this.getAvailableConcernGroups();
      const areaName = this.selections.area === 'face' ? 'facial' : this.selections.area;

      let html = `<div class="tq-step active">`;
      html += `<div class="tq-step-header">
        <h2 class="tq-step-title">What matters most to you?</h2>
        <p class="tq-step-subtitle">Select any goals that resonate with you. There are no wrong answers — we'll tailor your recommendations to your unique needs.</p>
      </div>`;

      groups.forEach(group => {
        html += `<div class="tq-concern-group">
          <div class="tq-concern-group-header">
            <p class="tq-concern-group-label">${group.label}</p>
            ${group.desc ? `<p class="tq-concern-group-desc">${group.desc}</p>` : ''}
          </div>
          <div class="tq-chips">`;
        group.concerns.forEach(c => {
          const sel = this.selections.concerns.includes(c) ? 'selected' : '';
          const label = CONCERN_LABELS[c] || this.slugToLabel(c);
          html += `<div class="tq-chip ${sel}" data-action="toggle-concern" data-value="${c}">
            <svg class="tq-chip-check" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
            ${label}
          </div>`;
        });
        html += `</div></div>`;
      });

      html += this.renderNav({ showBack: true, nextDisabled: this.selections.concerns.length === 0 });
      html += `</div>`;
      return html;
    }

    /* ---- Step 2: Downtime ---- */
    renderDowntimeStep() {
      let html = `<div class="tq-step active">`;
      html += `<div class="tq-step-header">
        <h2 class="tq-step-title">How does recovery fit into your life?</h2>
        <p class="tq-step-subtitle">Some of our most transformative treatments need a little healing time. Let us know what works best for your schedule.</p>
      </div>`;
      html += `<div class="tq-options tq-options-downtime">`;
      DOWNTIME_OPTIONS.forEach(opt => {
        const sel = this.selections.downtime === opt.value ? 'selected' : '';
        html += `<div class="tq-option ${sel}" data-action="select-downtime" data-value="${opt.value}">
          <span class="tq-option-icon">${opt.icon}</span>
          <span class="tq-option-label">${opt.label}</span>
          <span class="tq-option-desc">${opt.desc}</span>
        </div>`;
      });
      html += `</div>`;
      html += this.renderNav({ showBack: true, nextLabel: 'See My Recommendations', nextDisabled: !this.selections.downtime });
      html += `</div>`;
      return html;
    }

    /* ---- Step 3: Results ---- */
    renderResultsStep() {
      const results = this.getResults();
      const totalConcerns = this.selections.concerns.length;
      let html = `<div class="tq-step active">`;

      if (results.length === 0) {
        html += `<div class="tq-results-header">
          <h2 class="tq-results-title">We'd love to help you further</h2>
          <p class="tq-results-subtitle">We didn't find an exact match for your combination of goals and preferences, but our team would be happy to create a personalized plan just for you.</p>
        </div>`;
        html += `<div class="tq-no-results">
          <p>Try adjusting your downtime preference, or schedule a complimentary consultation and we'll guide you in person.</p>
          <button class="tq-btn tq-btn-primary" data-action="restart">Explore Again</button>
        </div>`;
      } else {
        html += `<div class="tq-results-header">
          <h2 class="tq-results-title">Your Personalized Recommendations</h2>
          <p class="tq-results-subtitle">Based on your goals, we've curated ${results.length} treatment${results.length !== 1 ? 's' : ''} that may be a great fit for you. Tap any card to learn more.</p>
        </div>`;

        const top = results[0];
        const rest = results.slice(1);
        const topMatchPct = Math.round((top.matchCount / totalConcerns) * 100);

        // Matched concern labels for the top pick
        const topMatchedConcerns = this.selections.concerns
          .filter(c => top.concerns.includes(c))
          .map(c => CONCERN_LABELS[c] || this.slugToLabel(c));

        // ---- Top Recommendation (featured) ----
        html += `<div class="tq-top-pick">
          <div class="tq-top-pick-label">Our Top Recommendation for You</div>
          <a class="tq-top-pick-card" href="/aesthetic-treatments/${top.slug}">
            ${top.image ? `<div class="tq-top-pick-image-wrap"><img class="tq-top-pick-image" src="${top.image}" alt="${top.name}" loading="lazy"></div>` : ''}
            <div class="tq-top-pick-body">
              <div class="tq-result-badges">
                <span class="tq-badge tq-badge-match">${topMatchPct}% Match</span>
                ${top.downtime ? `<span class="tq-badge tq-badge-downtime">${top.downtime} Downtime</span>` : ''}
              </div>
              <h3 class="tq-top-pick-name">${top.name}</h3>
              <p class="tq-top-pick-desc">${top.description}</p>
              ${topMatchedConcerns.length > 0 ? `<div class="tq-top-pick-matches">
                <span class="tq-matches-label">Addresses your goals:</span>
                <div class="tq-matches-list">${topMatchedConcerns.map(c => `<span class="tq-match-tag">${c}</span>`).join('')}</div>
              </div>` : ''}
              <span class="tq-btn tq-btn-primary tq-top-pick-cta">Learn More About ${top.name}</span>
            </div>
          </a>
        </div>`;

        // ---- Other matching treatments ----
        if (rest.length > 0) {
          html += `<div class="tq-other-results">
            <h3 class="tq-other-results-title">Other Treatments Worth Exploring</h3>
            <div class="tq-results-grid">`;
          rest.forEach(t => {
            const matchPct = Math.round((t.matchCount / totalConcerns) * 100);
            const matchedNames = this.selections.concerns
              .filter(c => t.concerns.includes(c))
              .map(c => CONCERN_LABELS[c] || this.slugToLabel(c));

            html += `<a class="tq-result-card" href="/aesthetic-treatments/${t.slug}">
              ${t.image ? `<img class="tq-result-image" src="${t.image}" alt="${t.name}" loading="lazy">` : `<div class="tq-result-image tq-result-image-placeholder"></div>`}
              <div class="tq-result-body">
                <div class="tq-result-badges">
                  <span class="tq-badge tq-badge-match">${matchPct}% Match</span>
                  ${t.downtime ? `<span class="tq-badge tq-badge-downtime">${t.downtime} Downtime</span>` : ''}
                </div>
                <h3 class="tq-result-name">${t.name}</h3>
                <p class="tq-result-desc">${t.description}</p>
                ${matchedNames.length > 0 ? `<p class="tq-result-matches">Helps with: ${matchedNames.join(', ')}</p>` : ''}
                <span class="tq-result-link">Learn More</span>
              </div>
            </a>`;
          });
          html += `</div></div>`;
        }
      }

      // Disclaimer + restart
      html += `<div class="tq-results-footer">
        <p class="tq-disclaimer">These recommendations are based on general treatment information and your selected preferences. For a personalized treatment plan, we encourage you to <a href="/schedule-online">schedule a consultation</a> with one of our expert providers.</p>
        <button class="tq-btn tq-btn-back" data-action="restart">Start Over</button>
      </div>`;

      html += `</div>`;
      return html;
    }

    /* ---- Navigation ---- */
    renderNav({ showBack = true, nextLabel = 'Continue', nextDisabled = false }) {
      let html = `<div class="tq-nav">`;
      if (showBack) {
        html += `<button class="tq-btn tq-btn-back" data-action="back">Back</button>`;
      } else {
        html += `<div class="tq-nav-spacer"></div>`;
      }
      if (this.currentStep < 3) {
        html += `<button class="tq-btn tq-btn-primary" data-action="next" ${nextDisabled ? 'disabled' : ''}>${nextLabel}</button>`;
      }
      html += `</div>`;
      return html;
    }

    /* ================= Events ================= */

    bindEvents() {
      this.container.addEventListener('click', (e) => {
        const el = e.target.closest('[data-action]');
        if (!el) return;

        const action = el.getAttribute('data-action');
        const value = el.getAttribute('data-value');

        switch (action) {
          case 'select-area':
            this.selections.area = value;
            this.selections.concerns = [];
            this.renderStep();
            break;

          case 'toggle-concern':
            const idx = this.selections.concerns.indexOf(value);
            if (idx === -1) this.selections.concerns.push(value);
            else this.selections.concerns.splice(idx, 1);
            this.renderStep();
            break;

          case 'select-downtime':
            this.selections.downtime = value;
            this.renderStep();
            break;

          case 'next':
            if (this.currentStep < 3) {
              this.currentStep++;
              this.renderStep();
              this.scrollToTop();
            }
            break;

          case 'back':
            if (this.currentStep > 0) {
              this.currentStep--;
              this.renderStep();
              this.scrollToTop();
            }
            break;

          case 'restart':
            this.currentStep = 0;
            this.selections = { area: null, concerns: [], downtime: null };
            this.renderStep();
            this.scrollToTop();
            break;
        }
      });
    }

    scrollToTop() {
      const rect = this.container.getBoundingClientRect();
      if (rect.top < 0) {
        this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    /* ---- Utility ---- */
    slugToLabel(slug) {
      return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
  }

  /* ---------- Initialize on DOM ready ---------- */
  function init() {
    new TreatmentQuiz();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
