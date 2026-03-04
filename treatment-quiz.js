/* ============================================
   Cleaver Dermatology — Aesthetic Concierge
   Advanced Treatment Recommendation Engine v2.0

   12-question personalized quiz with multi-factor
   weighted scoring algorithm. Reads CMS data from
   a hidden Collection List or JSON fallback.
   ============================================ */

(function () {
  'use strict';

  /* ==========================================================
     SVG ICON LIBRARY — Clean line icons, medical/aesthetic feel
     ========================================================== */
  var IC = {
    face: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="13" rx="8" ry="9"/><circle cx="9" cy="11" r=".8" fill="currentColor" stroke="none"/><circle cx="15" cy="11" r=".8" fill="currentColor" stroke="none"/><path d="M10 16c.8.7 1.5 1 2 1s1.2-.3 2-1"/></svg>',
    body: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2.5"/><path d="M9 21v-5.5l-2.5-4L9 9h6l2.5 2.5-2.5 4V21"/></svg>',
    hair: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-6"/><path d="M8 22v-4"/><path d="M16 22v-4"/><path d="M5 11c0-5 3-9 7-9s7 4 7 9c0 2-1 3.5-3 4H8c-2-.5-3-2-3-4z"/></svg>',
    wrinkles: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 8c4-2 8 2 12-1s4-2 4-2"/><path d="M4 13c4-2 8 2 12-1s4-2 4-2"/><path d="M4 18c4-2 8 2 12-1s4-2 4-2"/></svg>',
    volume: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L20 12L12 21L4 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    tone: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="2"/><circle cx="15" cy="14" r="1.5"/><circle cx="13" cy="8" r="1"/></svg>',
    sun: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M4.93 4.93l2.12 2.12m9.9 9.9l2.12 2.12M2 12h3m14 0h3M4.93 19.07l2.12-2.12m9.9-9.9l2.12-2.12"/></svg>',
    texture: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    tighten: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M8 7l4-4 4 4"/><path d="M8 17l4 4 4-4"/><path d="M3 12h4m10 0h4"/></svg>',
    glow: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z"/><path d="M17 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/></svg>',
    hydration: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 8 4 12 4 16a8 8 0 0016 0c0-4-4-8-8-14z"/></svg>',
    acne: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.5"/><circle cx="15" cy="9" r="1"/><circle cx="13" cy="15" r="1.5"/></svg>',
    brow: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 10c2-3 5-4 8-3"/><path d="M20 10c-2-3-5-4-8-3"/><path d="M7 16c2 1.5 4 2 5 2s3-.5 5-2"/></svg>',
    scissors: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/></svg>',
    contour: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20C4 12 8 4 12 4s8 8 8 16"/><path d="M8 20c0-6 2-12 4-12s4 6 4 12"/></svg>',
    veins: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 3v18"/><path d="M12 6c-3 2-5 4-6 8"/><path d="M12 6c3 2 5 4 6 8"/><path d="M12 12c-2 1-4 3-5 6"/><path d="M12 12c2 1 4 3 5 6"/></svg>',
    tattoo: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l-1-5-5-1 5-1 1-5 1 5 5 1-5 1z"/><circle cx="12" cy="12" r="9"/></svg>',
    hairRestore: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22v-8"/><path d="M12 14c-3-2-5-6-5-10"/><path d="M12 14c3-2 5-6 5-10"/><path d="M9 18c-2 0-3.5-1-4-3"/><path d="M15 18c2 0 3.5-1 4-3"/></svg>',
    plus: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    /* Question-specific icons */
    age20: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22v-6m0 0c-2 0-4-2-4-5 0-4 2-8 4-9 2 1 4 5 4 9 0 3-2 5-4 5z"/></svg>',
    age30: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22v-4"/><path d="M12 18c-3 0-6-2-6-6 0-5 3-10 6-10s6 5 6 10c0 4-3 6-6 6z"/><path d="M9 12h6"/></svg>',
    age40: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="11" r="7"/><path d="M12 18v4"/><path d="M9 8c1.5 1.5 4.5 1.5 6 0"/><path d="M9 12c1.5 1 4.5 1 6 0"/></svg>',
    age50: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="10" r="7"/><path d="M12 17v5"/><path d="M7 8c2 2 3 3 5 3s3-1 5-3"/><path d="M8 12c1 1 2.5 1.5 4 1.5s3-.5 4-1.5"/></svg>',
    age60: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="10" r="7"/><path d="M12 17v5"/><path d="M7 7c2 2 3 3 5 3s3-1 5-3"/><path d="M7 11c2 1.5 3 2 5 2s3-.5 5-2"/><path d="M8 14c1 .5 2.5 1 4 1s3-.5 4-1"/></svg>',
    shield: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3 9-8 11-5-2-8-6-8-11V7z"/></svg>',
    balance: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M4 7l8 3 8-3"/><circle cx="4" cy="14" r="3"/><circle cx="20" cy="14" r="3"/></svg>',
    leaf: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 21c5-5 6-12 14-17-4 7-3 14-14 17z"/><path d="M5 21c0-6 3-11 7-14"/></svg>',
    wave: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 12c2-3 4-3 6 0s4 3 6 0 4-3 4-3"/></svg>',
    thumbsUp: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 22H4a2 2 0 01-2-2v-5a2 2 0 012-2h3"/><path d="M7 13V4a1 1 0 011-1h0a3 3 0 013 3v3h4.5a2 2 0 012 2.1l-1 7a2 2 0 01-2 1.9H7"/></svg>',
    gem: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20"/><path d="M12 22L9 9l3-6 3 6z"/></svg>',
    subtle: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6"/></svg>',
    moderate: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>',
    dramatic: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 9 17 14 18 22 12 18 6 22 7 14 2 9 9 9"/></svg>',
    globe: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>',
    bolt: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    clock: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    calendar: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    star: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>',
    rocket: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3 5-3 9-3 13h6c0-4 0-8-3-13z"/><path d="M9 15l-2 4h10l-2-4"/><path d="M12 2c2 3 4 6 5 10"/><path d="M12 2c-2 3-4 6-5 10"/></svg>',
    refresh: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>',
    target: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    calendarCheck: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 16l2 2 4-4"/></svg>',
    dollar: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M16 7c-1.5-1.5-3-2-4-2s-3 .5-4 2 .5 3 2 4 4 2 5 3.5-.5 3.5-2 3.5-3-1-4-2"/></svg>',
    card: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    crown: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20l-2-12-5 5-3-8-3 8-5-5z"/></svg>',
    handshake: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11l-3-4-5 2-4-3-5 4"/><path d="M3 11v5l7 4 4-2 4 2 3-4v-5"/></svg>',
    search: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
    newcomer: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5 21v-2a7 7 0 0114 0v2"/></svg>',
    someExp: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0114 0v2"/><path d="M17 8l2 2 4-4"/></svg>',
    expert: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0114 0v2"/><path d="M19 8v6m-3-3h6"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>',
  };

  /* ==========================================================
     TREATMENT KNOWLEDGE BASE
     ========================================================== */
  var TREATMENT_PROFILES = {
    'xeomin':                  { intensity: 3, budget: 5, speed: 7, maintenance: 6, expLevel: 3 },
    'botox-fillers':           { intensity: 4, budget: 6, speed: 8, maintenance: 7, expLevel: 3 },
    'juvederm':                { intensity: 4, budget: 7, speed: 9, maintenance: 5, expLevel: 4 },
    'belotero-balance':        { intensity: 3, budget: 6, speed: 9, maintenance: 5, expLevel: 3 },
    'radiesse':                { intensity: 5, budget: 7, speed: 8, maintenance: 4, expLevel: 4 },
    'kybella':                 { intensity: 6, budget: 7, speed: 3, maintenance: 2, expLevel: 5 },
    'co2re-laser':             { intensity: 9, budget: 9, speed: 4, maintenance: 1, expLevel: 7 },
    'fractional-resurfacing':  { intensity: 7, budget: 8, speed: 4, maintenance: 2, expLevel: 6 },
    'sciton-bbl':              { intensity: 5, budget: 7, speed: 5, maintenance: 4, expLevel: 4 },
    'photofacial':             { intensity: 4, budget: 6, speed: 5, maintenance: 5, expLevel: 3 },
    'photofacials-ipl':        { intensity: 4, budget: 6, speed: 5, maintenance: 5, expLevel: 3 },
    'sublative-radio-frequency': { intensity: 5, budget: 6, speed: 4, maintenance: 3, expLevel: 4 },
    'vivace-microneedling':    { intensity: 5, budget: 7, speed: 5, maintenance: 3, expLevel: 4 },
    'carbon-glow-peel':        { intensity: 3, budget: 5, speed: 8, maintenance: 5, expLevel: 2 },
    'laser-hair-removal':      { intensity: 4, budget: 6, speed: 3, maintenance: 2, expLevel: 3 },
    'facials':                 { intensity: 1, budget: 3, speed: 8, maintenance: 8, expLevel: 1 },
    'hydrafacial':             { intensity: 2, budget: 4, speed: 9, maintenance: 8, expLevel: 1 },
    'bioglow':                 { intensity: 1, budget: 3, speed: 9, maintenance: 7, expLevel: 1 },
    'oxy-trio-glow-facial':    { intensity: 1, budget: 3, speed: 9, maintenance: 7, expLevel: 1 },
    'bela-md-facial':          { intensity: 2, budget: 4, speed: 8, maintenance: 7, expLevel: 1 },
    'peels':                   { intensity: 3, budget: 4, speed: 7, maintenance: 5, expLevel: 2 },
    'microneedling':           { intensity: 4, budget: 5, speed: 4, maintenance: 4, expLevel: 3 },
    'discoloration':           { intensity: 4, budget: 5, speed: 5, maintenance: 4, expLevel: 3 },
    'microblading':            { intensity: 5, budget: 6, speed: 8, maintenance: 2, expLevel: 4 },
    'sclerotherapy':           { intensity: 4, budget: 5, speed: 4, maintenance: 2, expLevel: 3 },
    'tattoo-removal':          { intensity: 6, budget: 7, speed: 2, maintenance: 2, expLevel: 5 },
    'coolsculpting':           { intensity: 4, budget: 8, speed: 3, maintenance: 1, expLevel: 3 },
    'hair-loss-and-rejuvenation': { intensity: 3, budget: 6, speed: 2, maintenance: 4, expLevel: 3 },
  };
  var DEFAULT_PROFILE = { intensity: 5, budget: 5, speed: 5, maintenance: 5, expLevel: 3 };

  /* ==========================================================
     CONCERN GROUP DEFINITIONS
     ========================================================== */
  var CONCERN_GROUP_DEFS = {
    face: [
      { key: 'lines-wrinkles', label: 'Lines & Wrinkles', icon: IC.wrinkles, concerns: ['wrinkles','fine-lines','expression-lines','frown-lines','crows-feet','deep-lines'] },
      { key: 'volume-contouring', label: 'Volume & Contouring', icon: IC.volume, concerns: ['volume-loss','facial-folds','lip-enhancement','nasolabial-folds','lift','skin-firmness'] },
      { key: 'tone-discoloration', label: 'Dark Spots & Tone', icon: IC.tone, concerns: ['dark-spots','uneven-tone','hyperpigmentation','discoloration','pigmentation','brown-spots'] },
      { key: 'sun-redness', label: 'Sun Damage & Redness', icon: IC.sun, concerns: ['sun-damage','redness'] },
      { key: 'texture-pores', label: 'Texture & Pores', icon: IC.texture, concerns: ['texture','pores','acne-scars','scars','resurfacing','smoothing'] },
      { key: 'tightening', label: 'Tightening & Firming', icon: IC.tighten, concerns: ['skin-tightening','collagen-stimulation'] },
      { key: 'glow-radiance', label: 'Glow & Radiance', icon: IC.glow, concerns: ['dull-skin','glow','radiance','brightening','refreshing'] },
      { key: 'hydration', label: 'Hydration & Cleansing', icon: IC.hydration, concerns: ['hydration','deep-cleansing','cleansing','exfoliation'] },
      { key: 'acne', label: 'Acne & Oil Control', icon: IC.acne, concerns: ['acne','oily-skin','skin-clarity'] },
      { key: 'brow', label: 'Brow Enhancement', icon: IC.brow, concerns: ['brow-enhancement','sparse-brows','brow-shaping'] },
      { key: 'hair-removal-face', label: 'Hair Removal', icon: IC.scissors, concerns: ['hair-removal','unwanted-hair'] },
    ],
    body: [
      { key: 'body-contouring', label: 'Body Contouring', icon: IC.contour, concerns: ['fat-reduction','body-contouring','stubborn-fat','double-chin','submental-fat'] },
      { key: 'veins', label: 'Vein Treatments', icon: IC.veins, concerns: ['spider-veins','leg-veins','vascular'] },
      { key: 'tattoo', label: 'Tattoo Removal', icon: IC.tattoo, concerns: ['tattoo-removal','ink-removal'] },
      { key: 'hair-removal-body', label: 'Hair Removal', icon: IC.scissors, concerns: ['hair-removal','unwanted-hair'] },
    ],
    hair: [
      { key: 'hair-restoration', label: 'Hair Restoration', icon: IC.hairRestore, concerns: ['hair-loss','thinning-hair','hair-restoration','hair-rejuvenation'] },
    ],
  };

  var CONCERN_LABELS = {
    'wrinkles': 'Wrinkles', 'fine-lines': 'Fine Lines', 'expression-lines': 'Expression Lines',
    'frown-lines': 'Frown Lines', 'crows-feet': "Crow's Feet", 'deep-lines': 'Deep Lines',
    'volume-loss': 'Volume Loss', 'facial-folds': 'Facial Folds', 'lip-enhancement': 'Lip Enhancement',
    'nasolabial-folds': 'Nasolabial Folds', 'lift': 'Lift & Firmness', 'skin-firmness': 'Skin Firmness',
    'dark-spots': 'Dark Spots', 'uneven-tone': 'Uneven Tone', 'hyperpigmentation': 'Hyperpigmentation',
    'discoloration': 'Discoloration', 'pigmentation': 'Pigmentation', 'brown-spots': 'Brown Spots',
    'sun-damage': 'Sun Damage', 'redness': 'Redness', 'texture': 'Skin Texture', 'pores': 'Pores',
    'acne-scars': 'Acne Scars', 'scars': 'Scars', 'resurfacing': 'Resurfacing', 'smoothing': 'Smoothing',
    'skin-tightening': 'Skin Tightening', 'collagen-stimulation': 'Collagen Boost',
    'dull-skin': 'Dull Skin', 'glow': 'Healthy Glow', 'radiance': 'Radiance',
    'brightening': 'Brightening', 'refreshing': 'Refreshing',
    'hydration': 'Hydration', 'deep-cleansing': 'Deep Cleansing', 'cleansing': 'Cleansing',
    'exfoliation': 'Exfoliation', 'acne': 'Acne', 'oily-skin': 'Oily Skin', 'skin-clarity': 'Skin Clarity',
    'brow-enhancement': 'Brow Enhancement', 'sparse-brows': 'Sparse Brows', 'brow-shaping': 'Brow Shaping',
    'hair-removal': 'Hair Removal', 'unwanted-hair': 'Unwanted Hair',
    'double-chin': 'Double Chin', 'fat-reduction': 'Fat Reduction', 'submental-fat': 'Submental Fullness',
    'body-contouring': 'Body Contouring', 'stubborn-fat': 'Stubborn Fat',
    'spider-veins': 'Spider Veins', 'leg-veins': 'Leg Veins', 'vascular': 'Vascular Concerns',
    'tattoo-removal': 'Tattoo Removal', 'ink-removal': 'Ink Removal',
    'hair-loss': 'Hair Loss', 'thinning-hair': 'Thinning Hair',
    'hair-restoration': 'Hair Restoration', 'hair-rejuvenation': 'Hair Rejuvenation',
    'skin-rejuvenation': 'Skin Rejuvenation', 'relaxation': 'Relaxation',
    'skin-tone': 'Skin Tone', 'lip-lines': 'Lip Lines',
  };

  /* ==========================================================
     QUESTION DEFINITIONS
     ========================================================== */
  var QUESTIONS = [
    {
      id: 'area', title: "Let's start with the basics",
      subtitle: 'Which area would you most like to improve?',
      type: 'single-card', required: true, progressLabel: 'Focus Area',
      options: [
        { value: 'face', label: 'Face', icon: IC.face, desc: 'Rejuvenate your complexion with treatments for wrinkles, tone, texture, and more' },
        { value: 'body', label: 'Body', icon: IC.body, desc: 'Contour, smooth, and refine with body-focused aesthetic treatments' },
        { value: 'hair', label: 'Hair', icon: IC.hair, desc: 'Restore volume and vitality with advanced hair rejuvenation solutions' },
      ],
    },
    {
      id: 'primaryConcern', title: "What's your #1 concern?",
      subtitle: 'Pick the single issue that matters most to you right now.',
      type: 'single-card', required: true, progressLabel: 'Main Goal',
      options: function (state, treatments) {
        return getAvailableConcernGroups(state.area, treatments).map(function (g) {
          return { value: g.key, label: g.label, icon: g.icon, desc: g.concerns.length + ' treatment targets in this category' };
        });
      },
      condition: function (s) { return !!s.area; },
    },
    {
      id: 'secondaryConcerns', title: 'Anything else on your wish list?',
      subtitle: 'Select any additional goals, or skip ahead.',
      type: 'multi-chip', required: false, skippable: true, skipLabel: 'Just my main concern',
      progressLabel: 'Other Goals',
      options: function (state, treatments) {
        return getAvailableConcernGroups(state.area, treatments)
          .filter(function (g) { return g.key !== state.primaryConcern; })
          .map(function (g) { return { value: g.key, label: g.label, icon: g.icon }; });
      },
      condition: function (s) { return !!s.primaryConcern; },
    },
    {
      id: 'ageRange', title: 'Where are you in your skin journey?',
      subtitle: 'This helps us recommend treatments best suited to your stage of life.',
      type: 'single-card', required: true, progressLabel: 'Life Stage',
      options: [
        { value: '20s', label: '20s', icon: IC.age20, desc: 'Prevention & early maintenance' },
        { value: '30s', label: '30s', icon: IC.age30, desc: 'Early signs & proactive care' },
        { value: '40s', label: '40s', icon: IC.age40, desc: 'Visible changes & restoration' },
        { value: '50s', label: '50s', icon: IC.age50, desc: 'Deeper correction & rejuvenation' },
        { value: '60plus', label: '60+', icon: IC.age60, desc: 'Comprehensive renewal' },
      ],
      condition: function (s) { return s.area === 'face' || s.area === 'hair'; },
    },
    {
      id: 'skinSensitivity', title: 'How would you describe your skin?',
      subtitle: "Understanding your skin helps us recommend treatments you'll be comfortable with.",
      type: 'single-card', required: true, progressLabel: 'Skin Type',
      options: [
        { value: 'resilient', label: 'Resilient', icon: IC.shield, desc: 'Rarely reacts, handles products well' },
        { value: 'normal', label: 'Normal', icon: IC.balance, desc: 'Occasional sensitivity, generally balanced' },
        { value: 'sensitive', label: 'Sensitive', icon: IC.leaf, desc: 'Reacts easily, needs gentle approaches' },
      ],
      condition: function (s) { return s.area === 'face'; },
    },
    {
      id: 'experience', title: 'Have you had aesthetic treatments before?',
      subtitle: 'No experience needed. This just helps refine our suggestions.',
      type: 'single-card', required: true, progressLabel: 'Experience',
      options: [
        { value: 'newcomer', label: 'This Is New to Me', icon: IC.newcomer, desc: "Exploring for the first time" },
        { value: 'some', label: 'A Few Treatments', icon: IC.someExp, desc: "Tried one or two things" },
        { value: 'experienced', label: 'Regular Visitor', icon: IC.expert, desc: "Comfortable with various treatments" },
      ],
    },
    {
      id: 'resultsIntensity', title: 'What kind of results are you after?',
      subtitle: "Both paths lead to beautiful outcomes \u2014 it's about what feels right for you.",
      type: 'single-card', required: true, progressLabel: 'Results Goal',
      options: [
        { value: 'subtle', label: 'Subtle & Natural', icon: IC.subtle, desc: 'Refreshed look, nobody has to know' },
        { value: 'moderate', label: 'Noticeable Improvement', icon: IC.moderate, desc: 'Clear, visible enhancement' },
        { value: 'dramatic', label: 'Dramatic Transformation', icon: IC.dramatic, desc: 'Significant, transformative change' },
      ],
    },
    {
      id: 'downtime', title: 'How much recovery time works for you?',
      subtitle: 'Some transformative treatments need a little healing time.',
      type: 'single-card', required: true, progressLabel: 'Lifestyle',
      options: [
        { value: 'any', label: 'Show Me Everything', icon: IC.globe, desc: "Open to all options" },
        { value: 'None', label: 'Zero Downtime', icon: IC.bolt, desc: 'Back to my day immediately' },
        { value: 'Minimal', label: 'A Day or Two', icon: IC.clock, desc: 'Mild redness, easy to plan around' },
        { value: 'Moderate', label: 'Up to a Week', icon: IC.calendar, desc: 'Happy to plan some healing time' },
        { value: 'Significant', label: 'Whatever It Takes', icon: IC.star, desc: 'Worth the wait for best results' },
      ],
    },
    {
      id: 'timeline', title: 'How quickly do you want to see results?',
      subtitle: 'Some treatments show results in days, others build over weeks.',
      type: 'single-card', required: true, progressLabel: 'Timeline',
      options: [
        { value: 'immediate', label: 'Right Away', icon: IC.rocket, desc: 'Want to see a difference fast' },
        { value: 'gradual', label: 'Gradual Is Fine', icon: IC.leaf, desc: "Patient for the best outcome" },
        { value: 'noPreference', label: 'No Preference', icon: IC.thumbsUp, desc: 'Either works for me' },
      ],
    },
    {
      id: 'maintenance', title: 'How do you feel about follow-up visits?',
      subtitle: 'Some treatments are one-and-done, others work best as part of a routine.',
      type: 'single-card', required: true, progressLabel: 'Maintenance',
      options: [
        { value: 'oneTime', label: 'One & Done', icon: IC.target, desc: 'Single treatment or short series' },
        { value: 'periodic', label: 'Happy to Return', icon: IC.refresh, desc: 'Periodic touch-ups every few months' },
        { value: 'routine', label: 'Make It a Routine', icon: IC.calendarCheck, desc: 'Regular self-care appointments' },
      ],
    },
    {
      id: 'budget', title: "What's your comfort level for investment?",
      subtitle: 'Every budget has great options. This helps us prioritize.',
      type: 'single-card', required: true, progressLabel: 'Budget',
      options: [
        { value: 'conservative', label: 'Keep It Accessible', icon: IC.dollar, desc: 'Best results per dollar' },
        { value: 'moderate', label: 'Ready to Invest', icon: IC.card, desc: 'Open to mid-range treatments' },
        { value: 'premium', label: 'Go All Out', icon: IC.crown, desc: 'The very best, whatever it takes' },
        { value: 'noPreference', label: 'Flexible', icon: IC.handshake, desc: 'Show me all options' },
      ],
    },
    {
      id: 'curiosity', title: "Anything you've been curious about?",
      subtitle: "If you've heard of specific treatments, let us know \u2014 totally optional.",
      type: 'multi-chip', required: false, skippable: true, skipLabel: 'Surprise me!',
      progressLabel: 'Interests',
      options: function (state, treatments) {
        return treatments.filter(function (t) { return t.areas.includes(state.area); })
          .map(function (t) { return { value: t.slug, label: t.name }; })
          .sort(function (a, b) { return a.label.localeCompare(b.label); });
      },
      condition: function (s) { return !!s.area; },
    },
  ];

  /* ==========================================================
     HELPERS
     ========================================================== */
  function getAvailableConcernGroups(area, treatments) {
    if (!area) return [];
    var available = new Set();
    treatments.forEach(function (t) {
      if (t.areas.includes(area)) t.concerns.forEach(function (c) { available.add(c); });
    });
    var defs = CONCERN_GROUP_DEFS[area] || [];
    var claimed = new Set();
    var groups = [];
    defs.forEach(function (g) {
      var filtered = g.concerns.filter(function (c) { return available.has(c); });
      if (filtered.length > 0) {
        groups.push({ key: g.key, label: g.label, icon: g.icon, concerns: filtered });
        filtered.forEach(function (c) { claimed.add(c); });
      }
    });
    var unclaimed = [];
    available.forEach(function (c) { if (!claimed.has(c)) unclaimed.push(c); });
    if (unclaimed.length > 0) {
      groups.push({ key: 'additional', label: 'Additional Concerns', icon: IC.plus, concerns: unclaimed });
    }
    return groups;
  }

  function slugToLabel(slug) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  /* ==========================================================
     SCORING ENGINE
     ========================================================== */
  var DOWNTIME_ORDER = ['None', 'Minimal', 'Moderate', 'Significant'];

  function proxScore(actual, target, tolerance) {
    return Math.max(0, 1 - Math.abs(actual - target) / tolerance);
  }

  function scoreTreatments(treatments, state) {
    var pool = treatments.filter(function (t) { return t.areas.includes(state.area); });

    if (state.downtime && state.downtime !== 'any') {
      var maxDT = DOWNTIME_ORDER.indexOf(state.downtime);
      if (maxDT >= 0) {
        pool = pool.filter(function (t) {
          var tDT = DOWNTIME_ORDER.indexOf(t.downtime);
          return tDT >= 0 && tDT <= maxDT;
        });
      }
    }

    var allGroups = getAvailableConcernGroups(state.area, treatments);
    var pGroup = allGroups.find(function (g) { return g.key === state.primaryConcern; });
    var pTags = pGroup ? pGroup.concerns : [];
    var sTags = [];
    if (state.secondaryConcerns && state.secondaryConcerns.length > 0) {
      state.secondaryConcerns.forEach(function (key) {
        var g = allGroups.find(function (x) { return x.key === key; });
        if (g) sTags = sTags.concat(g.concerns);
      });
    }

    var intTarget = { subtle: 2.5, moderate: 5.5, dramatic: 8.5 }[state.resultsIntensity] || 5.5;
    var budTarget = { conservative: 3, moderate: 5.5, premium: 8, noPreference: null }[state.budget];
    var spdTarget = { immediate: 8, gradual: 3, noPreference: null }[state.timeline];
    var mntTarget = { oneTime: 2, periodic: 5, routine: 8 }[state.maintenance] || 5;
    var expTarget = { newcomer: 2, some: 4, experienced: 7 }[state.experience] || 4;

    var scored = pool.map(function (t) {
      var p = TREATMENT_PROFILES[t.slug] || DEFAULT_PROFILE;
      var bd = {};
      var s = 0;

      var pm = 0;
      if (pTags.length > 0) {
        var pc = pTags.filter(function (c) { return t.concerns.includes(c); }).length;
        pm = Math.min(1, pc / Math.max(1, pTags.length * 0.4));
      }
      bd.primary = pm; s += pm * 30;

      var sm = 0.5;
      if (sTags.length > 0) {
        var sc2 = sTags.filter(function (c) { return t.concerns.includes(c); }).length;
        sm = sc2 / sTags.length;
      }
      bd.secondary = sm; s += sm * 18;

      var intf = proxScore(p.intensity, intTarget, 4);
      bd.intensity = intf; s += intf * 12;

      var budf = budTarget !== null ? proxScore(p.budget, budTarget, 4) : 0.7;
      bd.budget = budf; s += budf * 10;

      var spdf = spdTarget !== null ? proxScore(p.speed, spdTarget, 4) : 0.7;
      bd.speed = spdf; s += spdf * 8;

      var mntf = proxScore(p.maintenance, mntTarget, 4);
      bd.maintenance = mntf; s += mntf * 8;

      var expf = proxScore(p.expLevel, expTarget, 4);
      bd.experience = expf; s += expf * 7;

      var cur = 0;
      if (state.curiosity && state.curiosity.indexOf(t.slug) !== -1) cur = 1;
      bd.curiosity = cur; s += cur * 7;

      if (state.skinSensitivity === 'sensitive') {
        if (p.intensity >= 7) s *= 0.65;
        else if (p.intensity >= 5) s *= 0.85;
      } else if (state.skinSensitivity === 'resilient' && p.intensity >= 6) {
        s += 3;
      }

      if (state.ageRange === '20s' && p.intensity <= 3) s += 3;
      if (state.ageRange === '20s' && p.intensity >= 7) s -= 3;
      if (state.ageRange === '50s' && p.intensity >= 5) s += 2;
      if (state.ageRange === '60plus' && p.intensity >= 5) s += 3;

      if (state.downtime && state.downtime !== 'any' && t.downtime === state.downtime) s += 3;

      s = Math.max(0, Math.min(100, Math.round(s)));

      return { treatment: t, score: s, breakdown: bd, profile: p };
    });

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.treatment.name.localeCompare(b.treatment.name);
    });
    return scored;
  }

  function generateReasoning(result, state) {
    var reasons = [];
    var b = result.breakdown;
    var defs = CONCERN_GROUP_DEFS[state.area] || [];
    var pLabel = '';
    defs.forEach(function (g) { if (g.key === state.primaryConcern) pLabel = g.label; });

    if (b.primary >= 0.6 && pLabel) reasons.push('Directly targets your ' + pLabel.toLowerCase() + ' concerns');
    if (b.secondary >= 0.5 && state.secondaryConcerns && state.secondaryConcerns.length > 0) reasons.push('Also addresses your secondary goals');
    if (b.intensity >= 0.7) reasons.push('Matches your desired results intensity');
    if (b.budget >= 0.7 && state.budget !== 'noPreference') reasons.push('Fits within your budget comfort zone');
    if (b.speed >= 0.7 && state.timeline !== 'noPreference') reasons.push('Aligns with your timeline expectations');
    if (b.maintenance >= 0.7) reasons.push('Works with your follow-up preferences');
    if (b.experience >= 0.7) reasons.push('Well-suited to your experience level');
    if (b.curiosity > 0) reasons.push('A treatment you expressed interest in');
    if (reasons.length === 0) reasons.push('A solid option based on your overall profile');
    return reasons.slice(0, 3);
  }

  /* ==========================================================
     QUIZ CLASS
     ========================================================== */
  function TreatmentQuiz() {
    this.container = document.getElementById('treatment-quiz');
    if (!this.container) return;
    this.treatments = [];
    this.state = this.freshState();
    this.currentIndex = 0;
    this.showResults = false;
    this.parseTreatments();
    if (this.treatments.length > 0) this.render();
    else this.container.innerHTML = '<div class="tq-wrapper"><div class="tq-loading"><div class="tq-spinner"></div><p>Preparing your experience&hellip;</p></div></div>';
  }

  TreatmentQuiz.prototype.freshState = function () {
    return {
      area: null, primaryConcern: null, secondaryConcerns: [],
      ageRange: null, skinSensitivity: null, experience: null,
      resultsIntensity: null, downtime: null, timeline: null,
      maintenance: null, budget: null, curiosity: [],
    };
  };

  TreatmentQuiz.prototype.parseTreatments = function () {
    var source = document.querySelector('.tq-data-source');
    if (source) {
      var items = source.querySelectorAll('.tq-data-item');
      if (items.length > 0) {
        this.treatments = Array.from(items).map(function (el) {
          var img = el.querySelector('img');
          return {
            name: (el.getAttribute('data-name') || '').trim(),
            slug: (el.getAttribute('data-slug') || '').trim(),
            areas: (el.getAttribute('data-area') || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean),
            concerns: (el.getAttribute('data-concerns') || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean),
            downtime: (el.getAttribute('data-downtime') || '').trim(),
            description: (el.getAttribute('data-description') || '').trim(),
            image: img ? img.getAttribute('src') : '',
          };
        });
        return;
      }
    }
    if (window.__QUIZ_TREATMENTS && Array.isArray(window.__QUIZ_TREATMENTS)) {
      this.treatments = window.__QUIZ_TREATMENTS.map(function (t) {
        return {
          name: (t.name || '').trim(), slug: (t.slug || '').trim(),
          areas: (t.area || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean),
          concerns: (t.concerns || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean),
          downtime: (t.downtime || '').trim(), description: (t.description || '').trim(), image: t.image || '',
        };
      });
      return;
    }
    console.warn('Aesthetic Concierge: No treatment data found.');
  };

  TreatmentQuiz.prototype.getVisible = function () {
    var s = this.state;
    return QUESTIONS.filter(function (q) { return !q.condition || q.condition(s); });
  };

  TreatmentQuiz.prototype.getCurrent = function () {
    return this.getVisible()[this.currentIndex] || null;
  };

  TreatmentQuiz.prototype.getOptions = function (q) {
    if (typeof q.options === 'function') return q.options(this.state, this.treatments);
    return q.options || [];
  };

  TreatmentQuiz.prototype.canAdvance = function () {
    var q = this.getCurrent();
    if (!q) return false;
    if (!q.required) return true;
    var val = this.state[q.id];
    if (Array.isArray(val)) return val.length > 0;
    return val !== null && val !== undefined;
  };

  /* ================ RENDER ================ */
  TreatmentQuiz.prototype.render = function () {
    if (this.showResults) this.renderResults();
    else this.renderQuestion();
    this.bindEvents();
  };

  TreatmentQuiz.prototype.renderQuestion = function () {
    var visible = this.getVisible();
    var q = visible[this.currentIndex];
    if (!q) { this.showResults = true; this.renderResults(); return; }
    var opts = this.getOptions(q);
    var total = visible.length;
    var pct = Math.round((this.currentIndex / total) * 100);
    var h = '<div class="tq-wrapper">';

    /* Progress */
    h += '<div class="tq-progress-bar"><div class="tq-progress-track"><div class="tq-progress-fill" style="width:' + pct + '%"></div></div>';
    h += '<div class="tq-progress-meta"><span class="tq-progress-label">' + q.progressLabel + '</span>';
    h += '<span class="tq-progress-count">Question ' + (this.currentIndex + 1) + ' of ' + total + '</span></div></div>';

    /* Header */
    h += '<div class="tq-step active"><div class="tq-step-header">';
    h += '<h2 class="tq-step-title">' + q.title + '</h2>';
    h += '<p class="tq-step-subtitle">' + q.subtitle + '</p></div>';

    /* Options */
    if (q.type === 'single-card') {
      h += '<div class="tq-options' + (opts.length >= 5 ? ' tq-options-5col' : '') + '">';
      for (var i = 0; i < opts.length; i++) {
        var o = opts[i];
        var sel = this.state[q.id] === o.value ? ' selected' : '';
        h += '<div class="tq-option' + sel + '" data-action="select" data-qid="' + q.id + '" data-value="' + o.value + '">';
        if (o.icon) h += '<span class="tq-option-icon">' + o.icon + '</span>';
        h += '<span class="tq-option-label">' + o.label + '</span>';
        if (o.desc) h += '<span class="tq-option-desc">' + o.desc + '</span>';
        h += '</div>';
      }
      h += '</div>';
    } else if (q.type === 'multi-chip') {
      var selected = this.state[q.id] || [];
      h += '<div class="tq-chips">';
      for (var j = 0; j < opts.length; j++) {
        var c = opts[j];
        var isSel = selected.indexOf(c.value) !== -1;
        h += '<div class="tq-chip' + (isSel ? ' selected' : '') + '" data-action="toggle" data-qid="' + q.id + '" data-value="' + c.value + '">';
        h += '<span class="tq-chip-check">' + IC.check + '</span>';
        if (c.icon) h += '<span class="tq-chip-icon">' + c.icon + '</span>';
        h += '<span>' + c.label + '</span></div>';
      }
      h += '</div>';
    }

    /* Nav */
    h += '<div class="tq-nav">';
    if (this.currentIndex > 0) h += '<button class="tq-btn tq-btn-back" data-action="back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5m0 0l7 7m-7-7l7-7"/></svg> Back</button>';
    else h += '<div class="tq-nav-spacer"></div>';
    if (q.skippable) h += '<button class="tq-btn tq-btn-skip" data-action="skip">' + (q.skipLabel || 'Skip') + '</button>';
    var isLast = this.currentIndex === total - 1;
    var nLabel = isLast ? 'See My Results' : 'Continue';
    var canGo = this.canAdvance() || q.skippable;
    h += '<button class="tq-btn tq-btn-primary" data-action="next"' + (canGo ? '' : ' disabled') + '>' + nLabel + ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14m0 0l-7-7m7 7l-7 7"/></svg></button>';
    h += '</div></div></div>';
    this.container.innerHTML = h;
  };

  /* ================ RESULTS ================ */
  TreatmentQuiz.prototype.renderResults = function () {
    var results = scoreTreatments(this.treatments, this.state);
    var top5 = results.slice(0, 5);
    var self = this;
    var areaCount = this.treatments.filter(function (t) { return t.areas.includes(self.state.area); }).length;

    var h = '<div class="tq-wrapper">';
    h += '<div class="tq-progress-bar"><div class="tq-progress-track"><div class="tq-progress-fill" style="width:100%"></div></div>';
    h += '<div class="tq-progress-meta"><span class="tq-progress-label">Your Results</span><span class="tq-progress-count">Analysis Complete</span></div></div>';
    h += '<div class="tq-step active">';

    if (top5.length === 0) {
      h += '<div class="tq-results-header"><h2 class="tq-results-title">We\'d Love to Help You Further</h2>';
      h += '<p class="tq-results-subtitle">We didn\'t find an exact match, but our team would love to create a personalized plan for you.</p></div>';
      h += '<div class="tq-no-results"><p>Try adjusting your downtime preference, or <a href="/schedule-online">schedule a consultation</a>.</p>';
      h += '<button class="tq-btn tq-btn-primary" data-action="restart">Start Over</button></div>';
    } else {
      h += '<div class="tq-results-header"><h2 class="tq-results-title">Your Personalized Recommendations</h2>';
      h += '<p class="tq-results-subtitle">Based on your ' + this.getVisible().length + ' responses, we analyzed ' + areaCount + ' treatments to find your ideal matches.</p></div>';

      /* Top pick */
      var top = top5[0];
      var topR = generateReasoning(top, this.state);
      h += '<div class="tq-top-pick"><div class="tq-top-pick-label">Top Recommendation for You</div>';
      h += '<a class="tq-top-pick-card" href="/aesthetic-treatments/' + top.treatment.slug + '">';
      if (top.treatment.image) h += '<div class="tq-top-pick-image-wrap"><img class="tq-top-pick-image" src="' + top.treatment.image + '" alt="' + top.treatment.name + '" loading="lazy"></div>';
      h += '<div class="tq-top-pick-body"><div class="tq-result-badges">';
      h += '<span class="tq-badge tq-badge-match"><span class="tq-match-pct">' + top.score + '%</span> Match</span>';
      if (top.treatment.downtime) h += '<span class="tq-badge tq-badge-downtime">' + top.treatment.downtime + ' Downtime</span>';
      h += '</div><h3 class="tq-top-pick-name">' + top.treatment.name + '</h3>';
      h += '<p class="tq-top-pick-desc">' + top.treatment.description + '</p>';
      if (topR.length > 0) {
        h += '<div class="tq-reasoning"><p class="tq-reasoning-label">Why this is right for you:</p><ul class="tq-reasoning-list">';
        topR.forEach(function (r) { h += '<li class="tq-reasoning-item">' + r + '</li>'; });
        h += '</ul></div>';
      }
      h += '<span class="tq-btn tq-btn-primary tq-top-pick-cta">Learn More</span></div></a></div>';

      /* Other results */
      var rest = top5.slice(1);
      if (rest.length > 0) {
        h += '<div class="tq-other-results"><h3 class="tq-other-results-title">Other Treatments Worth Exploring</h3><div class="tq-results-grid">';
        rest.forEach(function (r) {
          var reasons = generateReasoning(r, self.state);
          h += '<a class="tq-result-card" href="/aesthetic-treatments/' + r.treatment.slug + '">';
          if (r.treatment.image) h += '<img class="tq-result-image" src="' + r.treatment.image + '" alt="' + r.treatment.name + '" loading="lazy">';
          else h += '<div class="tq-result-image tq-result-image-placeholder"></div>';
          h += '<div class="tq-result-body"><div class="tq-result-badges">';
          h += '<span class="tq-badge tq-badge-match"><span class="tq-match-pct">' + r.score + '%</span> Match</span>';
          if (r.treatment.downtime) h += '<span class="tq-badge tq-badge-downtime">' + r.treatment.downtime + ' Downtime</span>';
          h += '</div><h3 class="tq-result-name">' + r.treatment.name + '</h3>';
          h += '<p class="tq-result-desc">' + r.treatment.description + '</p>';
          if (reasons.length > 0) h += '<p class="tq-result-matches">' + reasons[0] + '</p>';
          h += '<span class="tq-result-link">Learn More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14m0 0l-7-7m7 7l-7 7"/></svg></span>';
          h += '</div></a>';
        });
        h += '</div></div>';
      }
    }

    /* Footer */
    h += '<div class="tq-results-footer">';
    h += '<p class="tq-disclaimer">These recommendations are based on our matching algorithm and your preferences. For a personalized treatment plan, <a href="/schedule-online">schedule a consultation</a> with our expert providers.</p>';
    h += '<button class="tq-btn tq-btn-back" data-action="restart">Start Over</button></div>';
    h += '</div></div>';
    this.container.innerHTML = h;
  };

  /* ================ EVENTS ================ */
  TreatmentQuiz.prototype.bindEvents = function () {
    var self = this;
    function handler(e) {
      var el = e.target.closest('[data-action]');
      if (!el) return;
      var action = el.getAttribute('data-action');
      var qid = el.getAttribute('data-qid');
      var value = el.getAttribute('data-value');

      self.container.removeEventListener('click', handler);

      switch (action) {
        case 'select':
          if (qid === 'area' && self.state.area !== value) {
            self.state.primaryConcern = null;
            self.state.secondaryConcerns = [];
            self.state.curiosity = [];
          }
          if (qid === 'primaryConcern' && self.state.primaryConcern !== value) {
            self.state.secondaryConcerns = [];
          }
          self.state[qid] = value;
          self.render();
          break;
        case 'toggle':
          var arr = self.state[qid] || [];
          var idx = arr.indexOf(value);
          if (idx === -1) arr.push(value); else arr.splice(idx, 1);
          self.state[qid] = arr;
          self.render();
          break;
        case 'next':
          var vis = self.getVisible();
          if (self.currentIndex < vis.length - 1) { self.currentIndex++; self.showResults = false; }
          else self.showResults = true;
          self.render(); self.scrollToTop();
          break;
        case 'skip':
          var vis2 = self.getVisible();
          if (self.currentIndex < vis2.length - 1) { self.currentIndex++; self.showResults = false; }
          else self.showResults = true;
          self.render(); self.scrollToTop();
          break;
        case 'back':
          if (self.showResults) self.showResults = false;
          else if (self.currentIndex > 0) self.currentIndex--;
          self.render(); self.scrollToTop();
          break;
        case 'restart':
          self.state = self.freshState();
          self.currentIndex = 0;
          self.showResults = false;
          self.render(); self.scrollToTop();
          break;
      }
    }
    this.container.addEventListener('click', handler);
  };

  TreatmentQuiz.prototype.scrollToTop = function () {
    var rect = this.container.getBoundingClientRect();
    if (rect.top < 0) this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ==========================================================
     INIT
     ========================================================== */
  function attemptInit() {
    var container = document.getElementById('treatment-quiz');
    if (!container) return false;
    var source = document.querySelector('.tq-data-source');
    var items = source ? source.querySelectorAll('.tq-data-item') : [];
    if (items.length > 0 || (window.__QUIZ_TREATMENTS && window.__QUIZ_TREATMENTS.length > 0)) {
      new TreatmentQuiz();
      return true;
    }
    return false;
  }

  function init() {
    if (attemptInit()) return;
    var observer = new MutationObserver(function (m, obs) {
      var s = document.querySelector('.tq-data-source');
      if (s && s.querySelectorAll('.tq-data-item').length > 0) { obs.disconnect(); attemptInit(); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { observer.disconnect(); attemptInit(); }, 3000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
