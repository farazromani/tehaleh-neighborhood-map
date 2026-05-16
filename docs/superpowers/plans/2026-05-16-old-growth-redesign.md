# Old Growth Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the Tehaleh map with the Old Growth + Cedar Glow palette and replace the mobile stacking layout with a full-screen map + bottom drawer.

**Architecture:** CSS custom properties in `:root` become the dark palette (new default); a `[data-theme="light"]` block holds light overrides. On mobile, the existing `.sidebar` element transforms into a fixed bottom drawer via CSS classes toggled by JS. No new dependencies.

**Tech Stack:** Vanilla HTML/CSS/JS, Leaflet.js. Local dev: `npx serve .` → `http://localhost:3000`.

---

## Task 1: Create feature branch

**Files:** none (git only)

- [ ] **Create and switch to feature branch**

```bash
git checkout -b design/old-growth-redesign
```

- [ ] **Verify**

```bash
git branch --show-current
# Expected: design/old-growth-redesign
```

---

## Task 2: Rewrite CSS color tokens — dark as new default

**Files:**
- Modify: `css/style.css`

The existing `:root` defines light-mode colors. We replace them with the Old Growth dark palette so dark is the out-of-the-box look. We keep the same `--color-*` variable names so all downstream rules continue to work without changes.

- [ ] **Replace the entire `:root` block** (lines 8–59 in current file) with:

```css
:root {
  /* ── Old Growth + Cedar Glow — dark default ─────────────── */
  --color-forest:       #2d4a32;
  --color-forest-mid:   #4d7859;
  --color-forest-light: #6da07e;
  --color-canopy:       #6da07e;
  --color-canopy-pale:  #e8efe0;
  --color-stone:        #3d6048;
  --color-stone-light:  rgba(77, 120, 89, 0.22);
  --color-parchment:    #111c14;   /* page / body background */
  --color-cream:        #162019;   /* sidebar / card background */
  --color-bark:         #a07848;   /* cedar accent */
  --color-sky:          #6da07e;
  --color-sky-pale:     #c8ddd0;
  --color-ink:          #111c14;
  --color-ink-mid:      #e8efe0;   /* primary text */
  --color-ink-light:    #6da07e;   /* secondary / muted text */

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;

  /* Typography */
  --font-display: 'Zilla Slab', Georgia, serif;
  --font-body: 'Source Sans 3', 'Gill Sans', sans-serif;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-card:   0 4px 20px rgba(0,0,0,0.40), 0 1px 4px rgba(0,0,0,0.30);
  --shadow-lifted: 0 8px 32px rgba(0,0,0,0.50), 0 2px 8px rgba(0,0,0,0.40);

  /* Layout */
  --header-height: 80px;
  --footer-height: 60px;
  --sidebar-width: 300px;

  /* Mobile drawer */
  --drawer-peek:       60px;   /* height visible when collapsed */
  --drawer-open-height: 55vh;  /* height when fully open */
}
```

- [ ] **Delete the entire `[data-theme="dark"]` block** (lines 608–758 in current file — from `[data-theme="dark"] {` through the closing `}`). Dark is now the default; there is no dark override needed.

- [ ] **Verify in browser:** `npx serve .` → open `http://localhost:3000`. The page should now have a dark green background everywhere (it will look broken until Task 3, but the dark bg should be visible).

- [ ] **Commit**

```bash
git add css/style.css
git commit -m "style: replace color tokens with Old Growth dark palette as default"
```

---

## Task 3: Retheme header

**Files:**
- Modify: `css/style.css`

Remove the Unsplash background image (unnecessary network request, inconsistent with the forest aesthetic). Apply new header colors. Cedar accent on eyebrow.

- [ ] **Replace the `.site-header` rule:**

```css
.site-header {
  position: relative;
  height: var(--header-height);
  background: #111c14;
  border-bottom: 1px solid rgba(77, 120, 89, 0.20);
  display: flex;
  align-items: center;
  padding: 0 var(--space-xl);
  overflow: hidden;
  flex-shrink: 0;
  z-index: 100;
  box-shadow: 0 2px 16px rgba(0,0,0,0.40);
}
```

- [ ] **Replace the `.brand-eyebrow` rule:**

```css
.brand-eyebrow {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-bark);   /* cedar */
  line-height: 1;
}
```

- [ ] **Replace `.brand-title`:**

```css
.brand-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: #e8efe0;
  line-height: 1.1;
  letter-spacing: 0.01em;
}
```

- [ ] **Replace `.header-tagline`:**

```css
.header-tagline {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 300;
  color: rgba(232, 239, 224, 0.50);
  letter-spacing: 0.01em;
  max-width: 500px;
  line-height: 1.4;
}
```

- [ ] **Replace `.dark-toggle` and its sub-rules:**

```css
.dark-toggle {
  margin-left: auto;
  flex-shrink: 0;
  background: rgba(160, 120, 72, 0.12);
  border: 1px solid rgba(160, 120, 72, 0.35);
  border-radius: 20px;
  cursor: pointer;
  padding: 5px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-bark);
  transition: background 0.2s ease, border-color 0.2s ease;
  position: relative;
  z-index: 2;
}
.dark-toggle:hover {
  background: rgba(160, 120, 72, 0.22);
  border-color: rgba(160, 120, 72, 0.55);
}
.dark-toggle svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
.dark-toggle .icon-moon { display: block; }
.dark-toggle .icon-sun  { display: none;  }
[data-theme="light"] .dark-toggle .icon-moon { display: none;  }
[data-theme="light"] .dark-toggle .icon-sun  { display: block; }
```

- [ ] **Verify in browser:** Header should now be deep dark green (#111c14) with "Bonney Lake, WA" in cedar amber, "Tehaleh" in #e8efe0, and a cedar-tinted toggle button.

- [ ] **Commit**

```bash
git add css/style.css
git commit -m "style: retheme header with Old Growth palette and cedar toggle"
```

---

## Task 4: Retheme sidebar (desktop), legend, detail panel, footer

**Files:**
- Modify: `css/style.css`

- [ ] **Replace `.sidebar` rule:**

```css
.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  background: #162019;
  border-right: 1px solid rgba(77, 120, 89, 0.18);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  box-shadow: 2px 0 16px rgba(0,0,0,0.30);
}
.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb {
  background: rgba(77, 120, 89, 0.40);
  border-radius: 2px;
}
```

- [ ] **Replace `.sidebar-prompt`:**

```css
.sidebar-prompt {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 600;
  color: #e8efe0;
  line-height: 1.3;
  margin-bottom: var(--space-sm);
}
```

- [ ] **Replace `.sidebar-hint`:**

```css
.sidebar-hint {
  font-size: 13.5px;
  color: rgba(232, 239, 224, 0.45);
  line-height: 1.6;
  margin-bottom: var(--space-xl);
}
```

- [ ] **Replace `.legend-title`:**

```css
.legend-title {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(109, 160, 126, 0.60);
  margin-bottom: var(--space-sm);
}
```

- [ ] **Replace `.legend-item`, `.legend-item:hover`, and add `.legend-item.active`:**

```css
.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px var(--space-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s ease;
}
.legend-item:hover {
  background: rgba(77, 120, 89, 0.15);
}
.legend-item.active {
  background: rgba(160, 120, 72, 0.12);
}
```

- [ ] **Replace `.legend-label`:**

```css
.legend-label {
  font-size: 13px;
  font-weight: 400;
  color: rgba(232, 239, 224, 0.70);
  line-height: 1.2;
}
.legend-item.active .legend-label {
  color: #e8efe0;
  font-weight: 600;
}
```

- [ ] **Replace `.legend-swatch`:**

```css
.legend-swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1.5px solid rgba(255,255,255,0.12);
}
```

- [ ] **Replace `.back-btn` and hover:**

```css
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-forest-mid);
  padding: 0;
  margin-bottom: var(--space-lg);
  transition: color 0.15s ease, gap 0.15s ease;
}
.back-btn:hover {
  color: var(--color-bark);
  gap: 4px;
}
```

- [ ] **Replace `.detail-name`, `.detail-type`, `.detail-description`:**

```css
.detail-name {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: #e8efe0;
  line-height: 1.2;
  margin-bottom: var(--space-xs);
}

.detail-type {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-bark);
  margin-bottom: var(--space-md);
}

.detail-description {
  font-size: 14px;
  color: rgba(232, 239, 224, 0.55);
  line-height: 1.65;
  margin-bottom: var(--space-lg);
}
```

- [ ] **Replace `.site-footer`:**

```css
.site-footer {
  background: #0e1711;
  border-top: 1px solid rgba(77, 120, 89, 0.12);
  color: rgba(232, 239, 224, 0.30);
  font-size: 11.5px;
  text-align: center;
  padding: 10px var(--space-lg);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.4;
}
.footer-note {
  color: rgba(232, 239, 224, 0.20);
  font-size: 10.5px;
}
.footer-link {
  color: var(--color-bark);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}
.footer-link:hover {
  color: #c8a070;
}
```

- [ ] **Replace Leaflet zoom control rules:**

```css
.leaflet-control-zoom {
  border: none !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.40) !important;
}
.leaflet-control-zoom a {
  background: #162019 !important;
  color: var(--color-forest-mid) !important;
  border-color: rgba(77, 120, 89, 0.30) !important;
  font-size: 16px !important;
  font-weight: 300 !important;
  transition: background 0.15s ease !important;
}
.leaflet-control-zoom a:hover {
  background: rgba(77, 120, 89, 0.20) !important;
}
```

- [ ] **Replace `.map-attribution-overlay`:**

```css
.map-attribution-overlay {
  position: absolute;
  bottom: 8px;
  right: 12px;
  z-index: 500;
  font-size: 10px;
  color: rgba(109, 160, 126, 0.55);
  background: rgba(17, 28, 20, 0.80);
  padding: 2px 8px;
  border-radius: 3px;
  pointer-events: none;
  backdrop-filter: blur(4px);
}
.map-attribution-overlay a {
  pointer-events: all;
  color: var(--color-bark);
}
```

- [ ] **Replace the injected tooltip style in `js/map.js`** — find the `tooltipStyle.textContent` block near the bottom and replace it:

```js
tooltipStyle.textContent = `
  .nbhd-tooltip {
    background: rgba(17, 28, 20, 0.85) !important;
    border: none !important;
    border-radius: 4px !important;
    color: #e8efe0 !important;
    font-family: 'Zilla Slab', Georgia, serif !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    line-height: 1.3 !important;
    padding: 3px 8px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.50) !important;
    white-space: normal !important;
    max-width: 110px !important;
    text-align: center !important;
    pointer-events: none !important;
    letter-spacing: 0.01em !important;
  }
`;
```

- [ ] **Verify in browser:** Desktop layout should now look like the mockup — dark forest sidebar, cedar accent on type labels, deep footer. Check that the legend list renders and hovering items shows the green highlight.

- [ ] **Commit**

```bash
git add css/style.css js/map.js
git commit -m "style: retheme sidebar, legend, detail panel, footer, and map controls"
```

---

## Task 5: Set dark mode as default in JS

**Files:**
- Modify: `js/map.js`

Currently the site defaults to light mode (only goes dark if `localStorage` has `'dark'`). Flip this: default to dark, only go light if `localStorage` explicitly has `'light'`.

- [ ] **Find this line in `js/map.js`:**

```js
let   isDark      = localStorage.getItem('tehaleh-theme') === 'dark';
```

**Replace with:**

```js
let   isDark      = localStorage.getItem('tehaleh-theme') !== 'light';
```

- [ ] **Find this line:**

```js
TILES.light.addTo(map);
```

**Replace with:**

```js
TILES.dark.addTo(map);
```

*(The `applyTheme(isDark)` call below it will swap tiles correctly on load, but this sets the initial tile before `applyTheme` runs to avoid a flash.)*

- [ ] **Verify in browser:** Hard-refresh (`Cmd+Shift+R`) with no `localStorage` entry. The page should load in dark mode with dark CartoDB tiles. Clicking the toggle should switch to light OSM tiles and a lighter theme.

- [ ] **Commit**

```bash
git add js/map.js
git commit -m "feat: default to dark mode (Old Growth) on first load"
```

---

## Task 6: Add mobile HTML structure

**Files:**
- Modify: `index.html`

Add two new elements:
1. `.mobile-topbar` — pinned top bar visible only on mobile (brand + hamburger)
2. `.drawer-handle` — the drag handle at the top of the sidebar (visible on mobile only)

- [ ] **Inside `<section class="map-wrap">`, add `.mobile-topbar` as the first child:**

```html
<section class="map-wrap">
  <div class="mobile-topbar" id="mobile-topbar" aria-label="Mobile navigation">
    <div class="mobile-brand">
      <span class="mobile-brand-eyebrow">Bonney Lake, WA</span>
      <span class="mobile-brand-title">Tehaleh</span>
    </div>
    <button class="mobile-hamburger" id="mobile-hamburger" aria-label="View all neighborhoods">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div id="map"></div>
  <div class="map-attribution-overlay">
    ...existing content...
  </div>
</section>
```

- [ ] **Inside `<aside class="sidebar" id="sidebar">`, add `.drawer-handle` as the very first child:**

```html
<aside class="sidebar" id="sidebar">
  <div class="drawer-handle" aria-hidden="true">
    <div class="drawer-handle-pill"></div>
    <p class="drawer-hint" id="drawer-hint">Tap a neighborhood to explore</p>
  </div>
  ...existing sidebar-section divs...
</aside>
```

- [ ] **Verify in browser (desktop):** Page looks identical to before — `.mobile-topbar` and `.drawer-handle` should not yet be visible on desktop (we'll add CSS in the next task).

- [ ] **Commit**

```bash
git add index.html
git commit -m "feat: add mobile top bar and drawer handle to HTML"
```

---

## Task 7: Mobile CSS — full-screen map + bottom drawer

**Files:**
- Modify: `css/style.css`

Replace the entire `@media (max-width: 768px)` and `@media (max-width: 480px)` blocks. Also add styles for new elements.

- [ ] **Add styles for `.mobile-topbar`** (desktop: hidden; mobile: shown via media query below):

```css
/* ── Mobile Top Bar ──────────────────────────────────────── */
.mobile-topbar {
  display: none;  /* shown in mobile media query */
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 600;
  background: rgba(17, 28, 20, 0.90);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(77, 120, 89, 0.20);
  padding: 10px 16px;
  align-items: center;
  justify-content: space-between;
}
.mobile-brand {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.mobile-brand-eyebrow {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-bark);
  line-height: 1;
}
.mobile-brand-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: #e8efe0;
  line-height: 1.1;
}
.mobile-hamburger {
  background: none;
  border: 1px solid rgba(160, 120, 72, 0.30);
  border-radius: 6px;
  padding: 7px 9px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}
.mobile-hamburger span {
  display: block;
  width: 18px;
  height: 1.5px;
  background: var(--color-bark);
  border-radius: 1px;
}
.mobile-hamburger span:last-child {
  width: 12px;
}
```

- [ ] **Add styles for `.drawer-handle` and its children** (desktop: hidden):

```css
/* ── Drawer Handle ───────────────────────────────────────── */
.drawer-handle {
  display: none;  /* shown in mobile media query */
  flex-direction: column;
  align-items: center;
  padding: 10px 16px 6px;
  cursor: pointer;
  flex-shrink: 0;
}
.drawer-handle-pill {
  width: 32px;
  height: 3px;
  background: var(--color-bark);
  border-radius: 2px;
  opacity: 0.55;
  margin-bottom: 8px;
}
.drawer-hint {
  font-size: 12px;
  color: rgba(232, 239, 224, 0.45);
  text-align: center;
  transition: opacity 0.2s ease;
}
.drawer-hint.hidden {
  opacity: 0;
  pointer-events: none;
}
```

- [ ] **Replace the entire `@media (max-width: 768px)` block** with:

```css
@media (max-width: 768px) {
  :root {
    --header-height: 0px;   /* header hidden on mobile — topbar takes over */
  }

  html, body {
    overflow: hidden;
    height: 100%;
  }

  /* Hide the desktop header and footer on mobile */
  .site-header { display: none; }
  .site-footer  { display: none; }

  /* Layout fills the full screen */
  .layout {
    position: relative;
    flex-direction: row;   /* keep row so sidebar/map are positioned correctly */
    height: 100dvh;
    overflow: hidden;
  }

  /* Map fills the entire screen */
  .map-wrap {
    position: absolute;
    inset: 0;
    height: 100%;
    flex: none;
    width: 100%;
  }

  #map {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Show mobile top bar */
  .mobile-topbar {
    display: flex;
  }

  /* Sidebar becomes a bottom drawer */
  .sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: var(--drawer-open-height);
    max-height: var(--drawer-open-height);
    border-right: none;
    border-top: 1px solid rgba(77, 120, 89, 0.25);
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 24px rgba(0,0,0,0.45);
    z-index: 500;
    overflow: hidden;
    /* Collapsed: translate down so only the handle peeks out */
    transform: translateY(calc(100% - var(--drawer-peek)));
    transition: transform 0.30s cubic-bezier(0.32, 0.72, 0, 1);
  }

  /* Open states */
  .sidebar.drawer-open {
    transform: translateY(0);
    overflow-y: auto;
  }

  /* Show drawer handle elements on mobile */
  .drawer-handle {
    display: flex;
    position: sticky;
    top: 0;
    background: #162019;
    z-index: 1;
  }

  /* Leaflet zoom: shift up so it clears the drawer peek */
  .leaflet-control-zoom {
    margin-bottom: calc(var(--drawer-peek) + 12px) !important;
  }

  /* Attribution: also shift up */
  .map-attribution-overlay {
    bottom: calc(var(--drawer-peek) + 6px);
  }

  /* Compass rose: hide on mobile */
  .compass-rose { display: none; }
}
```

- [ ] **Delete the `@media (max-width: 480px)` block entirely** — it was part of the old stacking layout and is no longer needed.

- [ ] **Verify in browser:** Resize the window to < 768px. The header/footer should vanish, the map should fill the screen, and the sidebar should appear as a bottom drawer peeking 60px from the bottom. Scrolling the page should not work (overflow hidden).

- [ ] **Commit**

```bash
git add css/style.css
git commit -m "style: mobile full-screen map layout with bottom drawer"
```

---

## Task 8: Mobile JS — drawer open/close logic

**Files:**
- Modify: `js/map.js`

Add a `drawer` state machine and wire it to existing map interactions.

- [ ] **Add mobile drawer logic near the top of `js/map.js`, after the DOM references block:**

```js
// ── Mobile Drawer ──────────────────────────────────────────
const sidebar         = document.getElementById('sidebar');
const drawerHint      = document.getElementById('drawer-hint');
const mobileHamburger = document.getElementById('mobile-hamburger');

function isMobile() {
  return window.innerWidth < 768;
}

function openDrawer() {
  sidebar.classList.add('drawer-open');
  if (drawerHint) drawerHint.classList.add('hidden');
}

function closeDrawer() {
  sidebar.classList.remove('drawer-open');
  if (drawerHint) drawerHint.classList.remove('hidden');
}

// Hamburger: open drawer to the list/default view
mobileHamburger.addEventListener('click', () => {
  // If we were showing detail, go back to list first
  sidebarDetail.hidden  = true;
  sidebarDefault.hidden = false;
  openDrawer();
});

// Tapping the handle itself while collapsed → open to list view
document.querySelector('.drawer-handle').addEventListener('click', () => {
  if (!sidebar.classList.contains('drawer-open')) {
    sidebarDetail.hidden  = true;
    sidebarDefault.hidden = false;
    openDrawer();
  }
});
```

- [ ] **Update `onFeatureClick`** — sync the legend `.active` class and open the drawer on mobile. Find the line:

```js
  document.querySelector('.sidebar').scrollTop = 0;
```

Replace it with:
```js
  // Sync legend active highlight
  legendList.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
  const activeLegendItem = [...legendList.querySelectorAll('.legend-item')].find(
    el => el.querySelector('.legend-label')?.textContent === name
  );
  if (activeLegendItem) activeLegendItem.classList.add('active');

  sidebar.scrollTop = 0;
  if (isMobile()) openDrawer();
```

- [ ] **Update the `backBtn` click handler** — on mobile, collapse the drawer when going back:

Replace:
```js
backBtn.addEventListener('click', () => {
  if (activeLayer) {
    geojsonLayer.resetStyle(activeLayer);
    activeLayer = null;
  }
  sidebarDetail.hidden  = true;
  sidebarDefault.hidden = false;
});
```

With:
```js
backBtn.addEventListener('click', () => {
  if (activeLayer) {
    geojsonLayer.resetStyle(activeLayer);
    activeLayer = null;
  }
  sidebarDetail.hidden  = true;
  sidebarDefault.hidden = false;
  if (isMobile()) closeDrawer();
});
```

- [ ] **Update legend item active highlight** — add/remove `.active` class on legend items. Find the `li.addEventListener('click', ...)` inside `buildLegend` and replace:

```js
    li.addEventListener('click', () => {
      // Remove active from all items
      legendList.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
      li.classList.add('active');
      geojsonLayer.eachLayer(layer => {
        if (layer.feature.properties.name === name) {
          onFeatureClick({ target: layer });
        }
      });
    });
```

- [ ] **Also remove `.active` from all legend items when the back button is clicked.** Add this inside the existing `backBtn` handler, after removing `activeLayer`:

```js
  legendList.querySelectorAll('.legend-item').forEach(el => el.classList.remove('active'));
```

- [ ] **Verify on mobile:**
  1. Resize to < 768px
  2. Drawer should peek 60px from the bottom with the cedar handle and hint text
  3. Tapping the handle → drawer slides up, list view appears
  4. Tapping the hamburger → same result
  5. Tapping a map polygon → drawer slides up, detail view with neighborhood name (Zilla Slab) in #e8efe0 and cedar type label
  6. Tapping "All Neighborhoods" back button → drawer collapses, hint reappears

- [ ] **Commit**

```bash
git add js/map.js
git commit -m "feat: mobile bottom drawer with open/close and legend active state"
```

---

## Task 9: Add light mode CSS

**Files:**
- Modify: `css/style.css`

The light mode keeps the sidebar dark (like a trail post) while brightening the main body background. Map tiles switch via the existing `applyTheme` JS logic.

- [ ] **Add a `[data-theme="light"]` block at the end of the stylesheet:**

```css
/* ── Light Mode Override ─────────────────────────────────── */
[data-theme="light"] {
  --color-parchment:  #f0ede6;   /* body/page bg */
  --color-cream:      #3b5e3a;   /* sidebar stays dark forest */
  --color-ink-mid:    #e8efe0;   /* sidebar text stays light */
  --color-ink-light:  #c4a882;   /* muted sidebar text: warm cedar tan */
  --color-stone-light: rgba(107, 143, 78, 0.20);
}

[data-theme="light"] body {
  background: var(--color-parchment);
}

/* Sidebar stays dark green in light mode */
[data-theme="light"] .sidebar {
  background: #3b5e3a;
  border-right-color: rgba(107, 143, 78, 0.25);
}

/* Map attribution pill gets light bg in light mode */
[data-theme="light"] .map-attribution-overlay {
  background: rgba(240, 237, 230, 0.85);
  color: #5a7848;
}
[data-theme="light"] .map-attribution-overlay a {
  color: #8b5e3a;
}

/* Leaflet zoom in light mode: lighter background, keep green text */
[data-theme="light"] .leaflet-control-zoom a {
  background: #3b5e3a !important;
  color: #c4a882 !important;
  border-color: rgba(107, 143, 78, 0.30) !important;
}
[data-theme="light"] .leaflet-control-zoom a:hover {
  background: rgba(107, 143, 78, 0.25) !important;
}

/* Tooltip: lighter bg on light tiles */
[data-theme="light"] .nbhd-tooltip {
  background: rgba(240, 237, 230, 0.92) !important;
  color: #1e2e22 !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.20) !important;
}

/* Footer stays dark in light mode */
[data-theme="light"] .site-footer {
  background: #2a4530;
}
```

- [ ] **Verify:** Click the sun/moon toggle. Light mode: map area gets `#f0ede6` body bg with OSM light tiles; sidebar stays dark green. Toggle back: dark map tiles, dark bg. Leaflet tooltips flip between dark/light pill styles.

- [ ] **Commit**

```bash
git add css/style.css
git commit -m "style: light mode variant — dark sidebar stays, body brightens"
```

---

## Task 10: Final QA pass

**Files:** none (verification only)

- [ ] **Desktop dark mode:** Open `http://localhost:3000` on a wide window. Verify: dark bg, cedar eyebrow, sidebar forest dark with legend items, active neighborhood shows cedar left border + cedar type label, polygon overlays visible, zoom controls dark-themed, footer dark.

- [ ] **Desktop light mode:** Toggle to light. Verify: sidebar stays dark forest green, map tiles switch to OSM light, body bg changes to birch cream. Tooltip flips to light pill.

- [ ] **Mobile dark mode:** Resize to < 768px. Verify: header/footer hidden, map fills screen, mobile top bar with cedar hamburger, drawer peeks 60px, tap handle → drawer opens to list, tap polygon → drawer opens to detail with Zilla Slab name and cedar type label, back button → drawer collapses.

- [ ] **Mobile light mode:** Toggle while in mobile view. Verify: dark sidebar inside drawer, light tiles on map.

- [ ] **No JS errors:** Open DevTools console. No errors on load or during interactions.

---

## Task 11: Push branch and open PR

**Files:** none (git only)

- [ ] **Push the branch:**

```bash
git push -u origin design/old-growth-redesign
```

- [ ] **Open the PR:**

```bash
gh pr create \
  --title "design: Old Growth + Cedar Glow redesign with mobile bottom drawer" \
  --body "$(cat <<'EOF'
## Summary

- Replaces the existing light/topographic palette with the **Old Growth + Cedar Glow** PNW theme: deep canopy dark backgrounds, forest greens, and cedar amber accent
- Dark mode is now the **default** on first load (persisted via localStorage)
- Mobile layout replaced: full-screen map with a **bottom drawer** that slides up on neighborhood tap, replacing the old stacking sidebar-above-map layout
- Desktop layout unchanged structurally — 300px sidebar, full-height map

## Visual changes
- Header: removed Unsplash background image; pure dark green with cedar eyebrow + cedar toggle button
- Sidebar: dark forest (#162019) with cedar active-state border and amber type labels
- Footer: deep ink (#0e1711) with cedar report link
- Light mode: sidebar **stays dark green** (like a trail sign post); map area brightens to birch cream

## Test plan
- [ ] Desktop dark mode: sidebar, legend, detail panel, footer all correctly themed
- [ ] Desktop light mode: toggle switches tiles + body bg; sidebar stays dark
- [ ] Mobile dark mode: bottom drawer peeks, opens to list via hamburger, opens to detail on polygon tap, back collapses
- [ ] Mobile light mode: drawer sidebar stays dark, tiles switch
- [ ] No console errors on load or interaction

🤖 Generated with [Claude Code](https://claude.ai/code)
EOF
)"
```

- [ ] **Copy the PR URL from the output and share it.**
