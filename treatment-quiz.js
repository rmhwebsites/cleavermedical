/* ============================================
   Cleaver Dermatology — Aesthetic Concierge
   Treatment Quiz Engine v3.0

   Minimal JS that enhances native Webflow
   elements with interactivity and scoring.
   ============================================ */
(function () {
  'use strict';

  /* ---------- GOOGLE SHEETS WEBHOOK ---------- */
  /* Paste your Google Apps Script web app URL below */
  var WEBHOOK_URL = '';

  /* ---------- SVG ICONS ---------- */
  var IC = {
    face: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="13" rx="8" ry="9"/><circle cx="9" cy="11" r=".8" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r=".8" fill="currentColor" stroke="none"/><path d="M10 16c.8.7 1.5 1 2 1s1.2-.3 2-1"/></svg>',
    body: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M9 21v-5.5l-2.5-4L9 9h6l2.5 2.5-2.5 4V21"/></svg>',
    hair: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-6"/><path d="M8 22v-4"/><path d="M16 22v-4"/><path d="M5 11c0-5 3-9 7-9s7 4 7 9c0 2-1 3.5-3 4H8c-2-.5-3-2-3-4z"/></svg>',
    wrinkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 8c4-2 8 2 12-1s4-2 4-2"/><path d="M4 13c4-2 8 2 12-1s4-2 4-2"/><path d="M4 18c4-2 8 2 12-1s4-2 4-2"/></svg>',
    spots: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="7" cy="8" r="2.5"/><circle cx="16" cy="7" r="1.8"/><circle cx="12" cy="15" r="3"/><circle cx="18" cy="14" r="1.5"/><circle cx="5" cy="16" r="1.2"/></svg>',
    texture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 12h18M12 3v18M3 7.5h18M3 16.5h18M7.5 3v18M16.5 3v18" opacity=".4"/></svg>',
    volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 3c-4 0-7 4-7 9s3 9 7 9 7-4 7-9-3-9-7-9z"/><path d="M9 13c1 1 2 1.5 3 1.5s2-.5 3-1.5" opacity=".5"/></svg>',
    redness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 10c1-1 2-1.5 4-1.5s3 .5 4 1.5"/><path d="M8 15c1 1 2 1.5 4 1.5s3-.5 4-1.5"/></svg>',
    tightening: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M7 4l-3 3 3 3"/><path d="M17 4l3 3-3 3"/><path d="M4 7h16"/><path d="M7 14l-3 3 3 3"/><path d="M17 14l3 3-3 3"/><path d="M4 17h16"/></svg>',
    acne: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="2"/><circle cx="16" cy="10" r="1.5"/><circle cx="10" cy="16" r="2.5"/><circle cx="17" cy="16" r="1"/></svg>',
    hair_loss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22v-8"/><path d="M8 22v-5"/><path d="M16 22v-5"/><path d="M5 10c0-5 3-8 7-8s7 3 7 8"/><path d="M9 8l3-3 3 3" opacity=".5"/></svg>',
    veins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 20c3-4 5-8 5-12"/><path d="M9 8c2 4 4 8 7 12"/><path d="M12 14c2-3 4-6 8-8"/></svg>',
    contouring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 20l4-8 4 4 4-6 4 10"/></svg>',
    glow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7.1l2.1-2.1"/></svg>',
    brows: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 11c2-3 5-4 8-2"/><path d="M21 11c-2-3-5-4-8-2"/></svg>',
    tattoo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 3l1 4-3 2 4 1-1 4 3-2-1 4"/><circle cx="12" cy="12" r="9"/></svg>',
    sensitivity_low: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 14c1.5 2 2.5 2.5 4 2.5s2.5-.5 4-2.5"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/></svg>',
    sensitivity_med: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 15h6"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/></svg>',
    sensitivity_high: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 16c1.5-2 2.5-2.5 4-2.5s2.5.5 4 2.5"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/></svg>',
    newbie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4"/><circle cx="12" cy="16" r=".5" fill="currentColor" stroke="none"/></svg>',
    some_exp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z"/></svg>',
    expert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 9l6-6 6 6"/><path d="M6 15l6 6 6-6"/><path d="M12 3v18"/></svg>',
    gentle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 21c-4.4 0-8-3.6-8-8 0-6 8-11 8-11s8 5 8 11c0 4.4-3.6 8-8 8z"/></svg>',
    moderate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg>',
    intensive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    clock_none: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>',
    clock_min: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    clock_mod: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l-4 2"/></svg>',
    clock_ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5"/><path d="M16 16l-4-4"/></svg>',
    budget_1: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><text x="12" y="16" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor" stroke="none">$</text></svg>',
    budget_2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><text x="12" y="16" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor" stroke="none">$$</text></svg>',
    budget_3: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><text x="12" y="16" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" stroke="none">$$$</text></svg>',
    budget_4: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><text x="12" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" stroke="none">$$$$</text></svg>',
    fast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    gradual: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 20l6-6 4 4 8-10"/></svg>',
    longterm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 2v4M16 2v4"/></svg>',
    age: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="8" r="5"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>'
  };

  /* ---------- STEP OPTIONS CONFIG ---------- */
  var STEP_OPTIONS = {
    area: [
      { value: 'face', icon: 'face', label: 'Face', desc: 'Skin, wrinkles, tone, and texture' },
      { value: 'body', icon: 'body', label: 'Body', desc: 'Contouring, veins, and hair removal' },
      { value: 'hair', icon: 'hair', label: 'Hair', desc: 'Hair removal, loss, and restoration' }
    ],
    concern: {
      face: [
        { value: 'wrinkles', icon: 'wrinkles', label: 'Wrinkles & Fine Lines', desc: 'Smooth expression lines and creases' },
        { value: 'dark-spots', icon: 'spots', label: 'Dark Spots & Pigmentation', desc: 'Even out discoloration and sun damage' },
        { value: 'texture', icon: 'texture', label: 'Texture & Pores', desc: 'Refine skin surface and minimize pores' },
        { value: 'volume-loss', icon: 'volume', label: 'Volume Loss', desc: 'Restore fullness to cheeks, lips, and folds' },
        { value: 'redness', icon: 'redness', label: 'Redness & Rosacea', desc: 'Calm redness and visible blood vessels' },
        { value: 'skin-tightening', icon: 'tightening', label: 'Skin Tightening', desc: 'Firm and lift sagging areas' },
        { value: 'acne', icon: 'acne', label: 'Acne & Scarring', desc: 'Clear breakouts and reduce scars' },
        { value: 'dull-skin', icon: 'glow', label: 'Dull Skin & Radiance', desc: 'Brighten and restore a healthy glow' },
        { value: 'brow-enhancement', icon: 'brows', label: 'Brow Enhancement', desc: 'Shape and define your brows' }
      ],
      body: [
        { value: 'fat-reduction', icon: 'contouring', label: 'Fat Reduction', desc: 'Target stubborn fat areas' },
        { value: 'spider-veins', icon: 'veins', label: 'Spider Veins', desc: 'Minimize visible leg veins' },
        { value: 'hair-removal', icon: 'body', label: 'Hair Removal', desc: 'Reduce unwanted body hair' },
        { value: 'tattoo-removal', icon: 'tattoo', label: 'Tattoo Removal', desc: 'Fade or remove unwanted tattoos' },
        { value: 'double-chin', icon: 'contouring', label: 'Double Chin', desc: 'Reduce submental fullness' }
      ],
      hair: [
        { value: 'hair-removal', icon: 'body', label: 'Hair Removal', desc: 'Reduce unwanted hair with laser' },
        { value: 'hair-loss', icon: 'hair_loss', label: 'Hair Thinning', desc: 'Address gradual hair loss' },
        { value: 'hair-restoration', icon: 'hair', label: 'Hair Restoration', desc: 'Stimulate regrowth and fullness' }
      ]
    },
    sensitivity: [
      { value: 'low', icon: 'sensitivity_low', label: 'Not Sensitive', desc: 'Rarely irritated by products or treatments' },
      { value: 'medium', icon: 'sensitivity_med', label: 'Somewhat Sensitive', desc: 'Occasional reactions to certain products' },
      { value: 'high', icon: 'sensitivity_high', label: 'Very Sensitive', desc: 'Skin reacts easily to most treatments' }
    ],
    experience: [
      { value: 'none', icon: 'newbie', label: 'Brand New', desc: 'This would be my first aesthetic treatment' },
      { value: 'some', icon: 'some_exp', label: 'Some Experience', desc: "I've had a few treatments before" },
      { value: 'experienced', icon: 'expert', label: 'Very Experienced', desc: 'I regularly get aesthetic treatments' }
    ],
    intensity: [
      { value: 'gentle', icon: 'gentle', label: 'Gentle & Subtle', desc: 'Light treatments with natural-looking results' },
      { value: 'moderate', icon: 'moderate', label: 'Moderate', desc: 'Balanced approach with noticeable improvement' },
      { value: 'intensive', icon: 'intensive', label: 'Intensive', desc: 'Maximum results, willing to commit to recovery' }
    ],
    downtime: [
      { value: 'none', icon: 'clock_none', label: 'No Downtime', desc: 'I need to get right back to my routine' },
      { value: 'minimal', icon: 'clock_min', label: 'Minimal (1-2 days)', desc: 'A little redness or swelling is okay' },
      { value: 'moderate', icon: 'clock_mod', label: 'Moderate (3-5 days)', desc: 'I can plan a few days for recovery' },
      { value: 'extended', icon: 'clock_ext', label: 'Extended (1+ week)', desc: "I'm committed and can take time off" }
    ],
    budget: [
      { value: 'budget', icon: 'budget_1', label: 'Budget-Friendly', desc: 'Under $300 per session' },
      { value: 'mid', icon: 'budget_2', label: 'Mid-Range', desc: '$300 - $800 per session' },
      { value: 'premium', icon: 'budget_3', label: 'Premium', desc: '$800 - $2,000 per session' },
      { value: 'no-limit', icon: 'budget_4', label: 'Best Available', desc: 'Investment is flexible for best results' }
    ],
    timeline: [
      { value: 'immediate', icon: 'fast', label: 'Immediate Results', desc: 'I want to see a difference right away' },
      { value: 'gradual', icon: 'gradual', label: 'Gradual Improvement', desc: 'Steady results over a few weeks' },
      { value: 'long-term', icon: 'longterm', label: 'Long-Term Plan', desc: 'Building lasting results over months' }
    ],
    age: [
      { value: 'under-30', icon: 'age', label: 'Under 30', desc: 'Preventive care and early concerns' },
      { value: '30-40', icon: 'age', label: '30 - 40', desc: 'Early signs of aging and maintenance' },
      { value: '40-50', icon: 'age', label: '40 - 50', desc: 'Visible aging and rejuvenation' },
      { value: '50-plus', icon: 'age', label: '50+', desc: 'Advanced restoration and revitalization' }
    ]
  };

  /* ---------- STEP LABELS ---------- */
  var STEP_LABELS = [
    'Getting Started', 'Primary Concern', 'Additional Concerns',
    'Skin Sensitivity', 'Your Experience', 'Treatment Intensity',
    'Downtime Preference', 'Budget Range', 'Results Timeline', 'About You'
  ];

  /* ---------- TREATMENT KNOWLEDGE BASE ---------- */
  var PROFILES = {
    'xeomin':             { intensity: 3, budget: 4, speed: 8, maintenance: 6, expLevel: 2, type: 'Neuromodulator' },
    'discoloration':      { intensity: 4, budget: 4, speed: 5, maintenance: 5, expLevel: 2, type: 'Topical' },
    'sublative-radio-frequency': { intensity: 5, budget: 5, speed: 4, maintenance: 4, expLevel: 3, type: 'Radiofrequency' },
    'photofacial':        { intensity: 3, budget: 4, speed: 6, maintenance: 5, expLevel: 2, type: 'Light Therapy' },
    'sciton-bbl':         { intensity: 4, budget: 6, speed: 6, maintenance: 5, expLevel: 3, type: 'Light Therapy' },
    'vivace-microneedling': { intensity: 5, budget: 6, speed: 5, maintenance: 5, expLevel: 3, type: 'RF Microneedling' },
    'juvederm':           { intensity: 4, budget: 6, speed: 9, maintenance: 6, expLevel: 3, type: 'Dermal Filler' },
    'hair-loss-and-rejuvenation': { intensity: 3, budget: 5, speed: 3, maintenance: 7, expLevel: 2, type: 'PRP Therapy' },
    'kybella':            { intensity: 6, budget: 7, speed: 4, maintenance: 3, expLevel: 4, type: 'Injectable' },
    'belotero-balance':   { intensity: 3, budget: 5, speed: 9, maintenance: 6, expLevel: 2, type: 'Dermal Filler' },
    'radiesse':           { intensity: 4, budget: 6, speed: 8, maintenance: 5, expLevel: 3, type: 'Biostimulator' },
    'co2re-laser':        { intensity: 9, budget: 8, speed: 5, maintenance: 3, expLevel: 5, type: 'CO2 Laser' },
    'peels':              { intensity: 3, budget: 3, speed: 5, maintenance: 6, expLevel: 1, type: 'Chemical Peel' },
    'sclerotherapy':      { intensity: 4, budget: 5, speed: 5, maintenance: 4, expLevel: 2, type: 'Sclerotherapy' },
    'facials':            { intensity: 1, budget: 2, speed: 7, maintenance: 8, expLevel: 1, type: 'Facial' },
    'bioglow':            { intensity: 2, budget: 3, speed: 8, maintenance: 7, expLevel: 1, type: 'Facial' },
    'microblading':       { intensity: 5, budget: 5, speed: 9, maintenance: 3, expLevel: 3, type: 'Semi-Permanent' },
    'oxy-trio-glow-facial': { intensity: 1, budget: 3, speed: 8, maintenance: 7, expLevel: 1, type: 'Oxygen Facial' },
    'carbon-glow-peel':   { intensity: 3, budget: 4, speed: 7, maintenance: 6, expLevel: 2, type: 'Laser Peel' },
    'bela-md-facial':     { intensity: 2, budget: 3, speed: 7, maintenance: 7, expLevel: 1, type: 'Medical Facial' },
    'fractional-resurfacing': { intensity: 7, budget: 7, speed: 5, maintenance: 4, expLevel: 4, type: 'Fractional Laser' },
    'photofacials-ipl':   { intensity: 3, budget: 4, speed: 6, maintenance: 5, expLevel: 2, type: 'IPL' },
    'tattoo-removal':     { intensity: 6, budget: 6, speed: 2, maintenance: 2, expLevel: 3, type: 'Laser' },
    'coolsculpting':      { intensity: 4, budget: 7, speed: 4, maintenance: 3, expLevel: 2, type: 'Cryolipolysis' },
    'botox-fillers':      { intensity: 3, budget: 5, speed: 9, maintenance: 7, expLevel: 2, type: 'Neurotoxin + Filler' },
    'microneedling':      { intensity: 4, budget: 4, speed: 5, maintenance: 5, expLevel: 2, type: 'Microneedling' },
    'hydrafacial':        { intensity: 1, budget: 3, speed: 8, maintenance: 8, expLevel: 1, type: 'HydraFacial' },
    'laser-hair-removal': { intensity: 4, budget: 5, speed: 3, maintenance: 2, expLevel: 2, type: 'Laser' }
  };

  /* ---------- STATE ---------- */
  var state = {
    step: 1,
    answers: {},
    treatments: []
  };

  /* ---------- DOM REFERENCES ---------- */
  var root, progressFill, stepLabel, stepCounter, navRow, backBtn, nextBtn;
  var stepEls = {};

  /* ---------- INIT ---------- */
  function init() {
    root = document.getElementById('treatment-quiz');
    if (!root) return;

    /* Load treatment data */
    if (window.__QUIZ_TREATMENTS) {
      state.treatments = window.__QUIZ_TREATMENTS;
    }
    /* Also try reading CMS data attributes */
    var cmsItems = document.querySelectorAll('.tq-data-item');
    if (cmsItems.length) {
      state.treatments = [];
      cmsItems.forEach(function (el) {
        state.treatments.push({
          name: el.getAttribute('data-name') || '',
          slug: el.getAttribute('data-slug') || '',
          area: el.getAttribute('data-area') || '',
          concerns: el.getAttribute('data-concerns') || '',
          downtime: el.getAttribute('data-downtime') || '',
          description: el.getAttribute('data-description') || '',
          image: el.getAttribute('data-image') || ''
        });
      });
    }

    /* Runtime fixup: ensure laser hair removal is available under hair area */
    state.treatments.forEach(function (t) {
      if (t.slug === 'laser-hair-removal' && t.area.indexOf('hair') < 0) {
        t.area = t.area + ', hair';
      }
    });

    /* Cache DOM elements */
    progressFill = root.querySelector('[data-quiz="progress-fill"]');
    stepLabel = root.querySelector('[data-quiz="step-label"]');
    stepCounter = root.querySelector('[data-quiz="step-counter"]');
    navRow = root.querySelector('[data-quiz="nav"]');
    backBtn = root.querySelector('[data-quiz="back"]');
    nextBtn = root.querySelector('[data-quiz="next"]');

    /* Cache step elements */
    var steps = root.querySelectorAll('[data-step]');
    steps.forEach(function (el) {
      stepEls[el.getAttribute('data-step')] = el;
    });

    /* Populate option cards for all steps */
    populateAllSteps();

    /* Bind events */
    root.addEventListener('click', handleClick);

    /* Show initial state */
    updateUI();
  }

  /* ---------- POPULATE OPTIONS ---------- */
  function populateAllSteps() {
    /* Step 1: Area */
    populateGrid('area', STEP_OPTIONS.area);

    /* Steps 4-10 have static options */
    populateGrid('sensitivity', STEP_OPTIONS.sensitivity);
    populateGrid('experience', STEP_OPTIONS.experience);
    populateGrid('intensity', STEP_OPTIONS.intensity);
    populateGrid('downtime', STEP_OPTIONS.downtime);
    populateGrid('budget', STEP_OPTIONS.budget);
    populateGrid('timeline', STEP_OPTIONS.timeline);
    populateGrid('age', STEP_OPTIONS.age);

    /* Steps 2-3 (concern, secondary-concerns) populated dynamically when area is chosen */
  }

  function populateGrid(optionKey, options) {
    var grid = root.querySelector('[data-options="' + optionKey + '"]');
    if (!grid || !options) return;
    grid.innerHTML = '';
    options.forEach(function (opt) {
      var card = document.createElement('div');
      card.className = 'quiz-option-card';
      card.setAttribute('data-value', opt.value);
      var iconSvg = IC[opt.icon] || '';
      card.innerHTML =
        '<div class="icon-embed-medium" style="color:#165b91">' + iconSvg + '</div>' +
        '<div class="quiz-option-label">' + opt.label + '</div>' +
        '<div class="quiz-option-desc">' + opt.desc + '</div>';
      grid.appendChild(card);
    });
  }

  /* ---------- EVENT HANDLING ---------- */
  function handleClick(e) {
    var card = e.target.closest('.quiz-option-card');
    if (card) {
      handleOptionClick(card);
      return;
    }
    var btn = e.target.closest('[data-quiz="next"]');
    if (btn) { goNext(); return; }
    var back = e.target.closest('[data-quiz="back"]');
    if (back) { goBack(); return; }

    /* Result card link click */
    var learnMore = e.target.closest('[data-action="learn-more"]');
    if (learnMore) {
      var slug = learnMore.getAttribute('data-slug');
      if (slug) window.location.href = '/aesthetic-treatments/' + slug;
    }

    /* See More results */
    var seeMore = e.target.closest('[data-quiz="see-more"]');
    if (seeMore) {
      var extras = root.querySelectorAll('[data-extra-result]');
      extras.forEach(function (el) { el.style.display = ''; });
      seeMore.parentElement.remove();
      return;
    }

    /* Restart */
    var restart = e.target.closest('[data-quiz="restart"]');
    if (restart) {
      state.step = 1;
      state.answers = {};
      updateUI();
    }
  }

  function handleOptionClick(card) {
    var grid = card.parentElement;
    var optionKey = grid.getAttribute('data-options');
    var value = card.getAttribute('data-value');

    /* Multi-select for secondary concerns */
    if (optionKey === 'secondary-concerns') {
      card.classList.toggle('quiz-option-selected');
      var selected = grid.querySelectorAll('.quiz-option-selected');
      var vals = [];
      selected.forEach(function (s) { vals.push(s.getAttribute('data-value')); });
      state.answers['secondary-concerns'] = vals;
      /* Update button text based on selection */
      if (nextBtn) nextBtn.textContent = vals.length > 0 ? 'Next' : 'Skip';
      return;
    }

    /* Single select */
    var siblings = grid.querySelectorAll('.quiz-option-card');
    siblings.forEach(function (s) { s.classList.remove('quiz-option-selected'); });
    card.classList.add('quiz-option-selected');
    state.answers[optionKey] = value;

    /* If area changed, repopulate concerns */
    if (optionKey === 'area') {
      var concerns = STEP_OPTIONS.concern[value] || [];
      populateGrid('concern', concerns);
      state._allConcerns = concerns;
      state._concernCount = concerns.length;
    }

    /* If primary concern selected, rebuild secondary without it */
    if (optionKey === 'concern') {
      var filtered = (state._allConcerns || []).filter(function (c) { return c.value !== value; });
      populateGrid('secondary-concerns', filtered);
      /* Update count for skip logic (secondary has one fewer option) */
      state._secondaryCount = filtered.length;
    }

    /* Auto-advance after selection (slight delay for visual feedback) */
    setTimeout(function () { goNext(); }, 300);
  }

  /* ---------- NAVIGATION ---------- */
  function goNext() {
    var stepKey = getStepOptionKey(state.step);
    if (stepKey && !state.answers[stepKey] && stepKey !== 'secondary-concerns') return; /* Need selection */

    if (state.step < 10) {
      state.step++;
      /* Skip secondary concerns if only 1 or fewer options after excluding primary */
      if (state.step === 3 && (state._secondaryCount || 0) <= 1) {
        state.answers['secondary-concerns'] = [];
        state.step++;
      }
      updateUI();
    } else {
      showResults();
    }
  }

  function goBack() {
    if (state.step > 1) {
      state.step--;
      /* Skip secondary concerns going back too if it was skipped */
      if (state.step === 3 && (state._secondaryCount || 0) <= 1) {
        state.step--;
      }
      updateUI();
    }
  }

  function getStepOptionKey(step) {
    var keys = ['area', 'concern', 'secondary-concerns', 'sensitivity', 'experience', 'intensity', 'downtime', 'budget', 'timeline', 'age'];
    return keys[step - 1] || null;
  }

  /* ---------- UI UPDATE ---------- */
  function updateUI() {
    /* Hide all steps, show current */
    Object.keys(stepEls).forEach(function (key) {
      var el = stepEls[key];
      el.classList.remove('quiz-step-active');
    });

    var current = stepEls[String(state.step)];
    if (current) current.classList.add('quiz-step-active');

    /* Progress bar */
    var pct = (state.step / 10) * 100;
    if (progressFill) progressFill.style.width = pct + '%';

    /* Labels */
    if (stepLabel) stepLabel.textContent = STEP_LABELS[state.step - 1] || '';
    if (stepCounter) stepCounter.textContent = 'Question ' + state.step + ' of 10';

    /* Nav buttons */
    if (backBtn) backBtn.style.visibility = state.step === 1 ? 'hidden' : 'visible';

    var stepKey = getStepOptionKey(state.step);
    if (nextBtn) {
      if (stepKey === 'secondary-concerns') {
        var secVals = state.answers['secondary-concerns'] || [];
        nextBtn.textContent = secVals.length > 0 ? 'Next' : 'Skip';
      } else {
        nextBtn.textContent = 'Next';
      }
      nextBtn.style.display = '';
    }

    /* Show nav row for quiz, hide for results */
    if (navRow) navRow.style.display = '';

    /* Restore selected state if going back */
    if (stepKey && state.answers[stepKey]) {
      var grid = root.querySelector('[data-options="' + stepKey + '"]');
      if (grid) {
        if (stepKey === 'secondary-concerns') {
          var vals = state.answers[stepKey] || [];
          grid.querySelectorAll('.quiz-option-card').forEach(function (c) {
            if (vals.indexOf(c.getAttribute('data-value')) >= 0) {
              c.classList.add('quiz-option-selected');
            }
          });
        } else {
          grid.querySelectorAll('.quiz-option-card').forEach(function (c) {
            if (c.getAttribute('data-value') === state.answers[stepKey]) {
              c.classList.add('quiz-option-selected');
            } else {
              c.classList.remove('quiz-option-selected');
            }
          });
        }
      }
    }
  }

  /* ---------- SCORING & RESULTS ---------- */
  function showResults() {
    /* Score all treatments */
    var scored = state.treatments.map(function (t) {
      return { treatment: t, score: scoreTreatment(t) };
    });

    /* Sort by score descending */
    scored.sort(function (a, b) { return b.score - a.score; });

    /* Take top results (max 6) */
    var top = scored.filter(function (s) { return s.score > 0; }).slice(0, 6);

    /* Render results */
    var resultsGrid = root.querySelector('[data-quiz="results-grid"]');
    if (!resultsGrid) return;

    if (top.length === 0) {
      resultsGrid.innerHTML =
        '<div class="quiz-no-results">' +
          '<p class="text-size-medium">We couldn\'t find a perfect match based on your selections. Please contact us for a personalized consultation.</p>' +
          '<a href="/contact" class="button">Contact Us</a>' +
        '</div>';
    } else {
      var maxScore = top[0].score;
      function buildCard(item, i) {
        var t = item.treatment;
        var matchPct = Math.round((item.score / maxScore) * 100);
        if (i === 0) matchPct = 100;
        var img = t.image || 'https://placehold.co/400x200/eff7fc/165b91?text=' + encodeURIComponent(t.name);
        /* Build unique badges for each card */
        var badges = [];
        var profile = PROFILES[t.slug];
        if (profile && profile.type) badges.push('<span class="badge">' + profile.type + '</span>');
        badges.push('<span class="badge">' + (t.downtime || 'Minimal') + ' Downtime</span>');
        if (profile) {
          var spdLabel = profile.speed >= 7 ? 'Quick Results' : profile.speed >= 4 ? 'Gradual Results' : 'Series Required';
          badges.push('<span class="badge">' + spdLabel + '</span>');
        }
        var hidden = i >= 3 ? ' style="display:none" data-extra-result' : '';
        return '<div class="quiz-result-card"' + hidden + '>' +
          '<img class="quiz-result-image" src="' + img + '" alt="' + t.name + '" loading="lazy">' +
          '<div class="quiz-result-content">' +
            '<div class="quiz-match-badge">' + matchPct + '% Match</div>' +
            '<h4 class="heading-style-h6" style="color:#165b91;margin:0 0 8px">' + t.name + '</h4>' +
            '<p class="text-size-small" style="color:#555;margin:0 0 12px;line-height:1.5">' + (t.description || '') + '</p>' +
            '<div style="margin-top:auto;margin-bottom:12px;display:flex;flex-wrap:wrap;gap:6px">' + badges.join('') + '</div>' +
            '<a data-action="learn-more" data-slug="' + t.slug + '" class="Button Primary Small">Learn More</a>' +
          '</div>' +
        '</div>';
      }
      resultsGrid.innerHTML = top.map(buildCard).join('');
      /* Add "See More" button if there are extra results */
      if (top.length > 3) {
        var seeMoreDiv = document.createElement('div');
        seeMoreDiv.style.cssText = 'text-align:center;margin-top:24px;grid-column:1/-1';
        seeMoreDiv.innerHTML = '<button data-quiz="see-more" style="padding:12px 28px;background:transparent;border:2px solid #d4e4ef;border-radius:40px;font-size:15px;font-weight:600;color:#555;cursor:pointer;font-family:var(--tq-font);transition:all .3s ease">See More Recommendations</button>';
        resultsGrid.appendChild(seeMoreDiv);
      }
    }

    /* Submit quiz data to Google Sheets */
    var resultNames = top.map(function (item) { return item.treatment.name; });
    submitQuizData(resultNames);

    /* Show results step */
    Object.keys(stepEls).forEach(function (key) {
      stepEls[key].classList.remove('quiz-step-active');
    });
    if (stepEls['results']) stepEls['results'].classList.add('quiz-step-active');

    /* Update progress */
    if (progressFill) progressFill.style.width = '100%';
    if (stepLabel) stepLabel.textContent = 'Your Results';
    if (stepCounter) stepCounter.textContent = 'Complete';

    /* Hide nav, show restart */
    if (navRow) navRow.style.display = 'none';

    /* Add restart button if not already there */
    var existingRestart = root.querySelector('[data-quiz="restart"]');
    if (!existingRestart) {
      var restartDiv = document.createElement('div');
      restartDiv.style.textAlign = 'center';
      restartDiv.style.marginTop = '32px';
      restartDiv.innerHTML = '<button data-quiz="restart" class="button-outline">Start Over</button>';
      resultsGrid.parentElement.appendChild(restartDiv);
    }
  }

  function scoreTreatment(t) {
    var score = 0;
    var a = state.answers;

    /* 1. Area match (required) */
    var areas = (t.area || '').split(',').map(function (s) { return s.trim().toLowerCase(); });
    if (a.area && areas.indexOf(a.area) < 0) return 0;

    /* 2. Primary concern match — exact match heavily prioritized */
    var concerns = (t.concerns || '').toLowerCase();
    var concernTags = concerns.split(',').map(function (s) { return s.trim(); });
    if (a.concern) {
      /* Exact tag match (e.g. "tattoo-removal" is a tag) → strong bonus */
      var exactMatch = concernTags.indexOf(a.concern) >= 0;
      if (exactMatch) {
        score += 45;
      } else {
        /* Partial: any term from the concern appears in tags */
        var primaryTerms = a.concern.split('-');
        var partialMatch = primaryTerms.some(function (term) {
          return term.length > 2 && concerns.indexOf(term) >= 0;
        });
        if (partialMatch) score += 15;
      }
    }

    /* 3. Secondary concerns (18pts total) */
    if (a['secondary-concerns'] && a['secondary-concerns'].length) {
      var secMatches = 0;
      a['secondary-concerns'].forEach(function (sc) {
        var terms = sc.split('-');
        if (terms.some(function (term) { return concerns.indexOf(term) >= 0; })) secMatches++;
      });
      score += Math.min(secMatches * 6, 18);
    }

    /* 4. Downtime tolerance (12pts) */
    if (a.downtime) {
      var dtMap = { 'None': 0, 'Minimal': 1, 'Moderate': 2, 'Significant': 3 };
      var prefMap = { 'none': 0, 'minimal': 1, 'moderate': 2, 'extended': 3 };
      var treatDT = dtMap[t.downtime] || 0;
      var userDT = prefMap[a.downtime] || 0;
      if (treatDT <= userDT) score += 12;
      else if (treatDT === userDT + 1) score += 6;
    }

    /* 5. Profile-based scoring using knowledge base */
    var profile = PROFILES[t.slug];
    if (profile) {
      /* Intensity match (10pts) */
      if (a.intensity) {
        var intMap = { gentle: 3, moderate: 5, intensive: 8 };
        var userInt = intMap[a.intensity] || 5;
        var diff = Math.abs(profile.intensity - userInt);
        score += Math.max(0, 10 - diff * 2);
      }

      /* Budget match (8pts) */
      if (a.budget) {
        var budMap = { budget: 3, mid: 5, premium: 7, 'no-limit': 10 };
        var userBud = budMap[a.budget] || 5;
        if (profile.budget <= userBud) score += 8;
        else if (profile.budget <= userBud + 2) score += 4;
      }

      /* Speed/timeline (7pts) */
      if (a.timeline) {
        var spdMap = { immediate: 8, gradual: 5, 'long-term': 3 };
        var userSpd = spdMap[a.timeline] || 5;
        var spdDiff = Math.abs(profile.speed - userSpd);
        score += Math.max(0, 7 - spdDiff);
      }

      /* Experience match (5pts) */
      if (a.experience) {
        var expMap = { none: 1, some: 3, experienced: 5 };
        var userExp = expMap[a.experience] || 3;
        if (profile.expLevel <= userExp * 1.5) score += 5;
        else score += 2;
      }
    }

    /* 6. Skin sensitivity modifier */
    if (a.sensitivity === 'high' && profile && profile.intensity > 6) {
      score -= 8;
    } else if (a.sensitivity === 'low' && profile && profile.intensity >= 5) {
      score += 3;
    }

    /* 7. Age bonus */
    if (a.age && profile) {
      if (a.age === 'under-30' && profile.intensity <= 4) score += 3;
      if (a.age === '50-plus' && profile.intensity >= 5) score += 3;
      if ((a.age === '30-40' || a.age === '40-50') && profile.intensity >= 3 && profile.intensity <= 7) score += 2;
    }

    return Math.max(0, score);
  }

  /* ---------- DATA COLLECTION (Google Sheets) ---------- */
  function submitQuizData(topResults) {
    if (!WEBHOOK_URL) return;
    var a = state.answers;
    var payload = {
      timestamp: new Date().toISOString(),
      area: a.area || '',
      concern: a.concern || '',
      secondaryConcerns: (a['secondary-concerns'] || []).join(', '),
      sensitivity: a.sensitivity || '',
      experience: a.experience || '',
      intensity: a.intensity || '',
      downtime: a.downtime || '',
      budget: a.budget || '',
      timeline: a.timeline || '',
      age: a.age || '',
      topResult: topResults[0] || '',
      allResults: topResults.join(', ')
    };
    try {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) { /* silent fail */ }
  }

  /* ---------- LAUNCH ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
