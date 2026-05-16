# Tehaleh Map — Old Growth Redesign

**Date:** 2026-05-16
**Status:** Approved

## Overview

Redesign the Tehaleh neighborhood map site with a "Old Growth + Cedar Glow" PNW aesthetic and a mobile-first layout overhaul. The existing sidebar + map structure is preserved on desktop; on mobile it becomes a full-screen map with a bottom drawer.

## Color Palette

### Dark mode (default)
| Token | Value | Use |
|---|---|---|
| `--bg-deepest` | `#111c14` | Page background, header, footer |
| `--bg-sidebar` | `#162019` | Sidebar / drawer background |
| `--bg-card` | `rgba(61,100,72,0.30)` | Active neighborhood card |
| `--green-mid` | `#2d4a32` | Subtle fills |
| `--green-accent` | `#4d7859` | Hover states, zoom controls |
| `--cedar` | `#a07848` | Primary accent: active borders, labels, drawer handle, toggle |
| `--text-primary` | `#e8efe0` | Headings, neighborhood names |
| `--text-secondary` | `#6da07e` | Subheadings, type labels |
| `--text-muted` | `rgba(232,239,224,0.45)` | Body descriptions |
| `--border` | `rgba(77,120,89,0.20)` | Dividers, borders |

### Light mode (toggled)
The sidebar stays dark forest green (`#3b5e3a`) in light mode — it acts like a trail sign post. The map area switches to standard OSM light tiles. Cedar accent shifts slightly warmer (`#8b5e3a`).

## Typography

- **Headings / neighborhood names:** Zilla Slab 700 (already loaded via Google Fonts)
- **Labels / type tags:** Source Sans 3 600, uppercase, letter-spacing 0.06–0.12em
- **Body / descriptions:** Source Sans 3 400
- **Muted text:** Source Sans 3 400 at 45% opacity

No new font dependencies.

## Layout — Desktop (≥ 768px)

Unchanged structure: fixed 260px sidebar on the left, map fills the rest.

Changes:
- Header: new color scheme, cedar accent on eyebrow and toggle button
- Sidebar: `--bg-sidebar` background, active card has left cedar border + green card fill
- Legend items: active state uses subtle cedar-tinted highlight
- Map: dark tile layer by default (already exists), zoom controls rethemed

## Layout — Mobile (< 768px)

The sidebar disappears. The map fills the full viewport.

New elements:
1. **Top bar** (pinned, semi-transparent blur): brand name + hamburger button
2. **Bottom drawer** (slides up from bottom):
   - Default state: collapsed, shows "Tap a neighborhood to explore" hint and cedar drag handle
   - Detail state: slides up to ~50% screen height, shows neighborhood name/type/description + "← All Neighborhoods" back link
   - List state: hamburger opens the drawer showing the full legend list
3. **Drawer handle:** cedar-colored pill, 28px wide, signals draggability

Transition: `transform: translateY()` CSS transition (0.3s ease) — no JS animation library needed.

## Dark Mode Toggle

Keep the existing toggle. Dark is default (persisted in `localStorage` as `tehaleh-theme`). Light mode: sidebar stays dark forest, map switches to OSM light tiles (same mechanism as today).

## Files Changed

| File | Changes |
|---|---|
| `css/style.css` | CSS custom properties for palette; rethemed header/sidebar/footer; new mobile bottom-drawer styles; media query restructure |
| `index.html` | Add mobile top bar, bottom drawer markup (drawer handle, collapsed hint, detail panel, list panel) |
| `js/map.js` | Mobile drawer open/close/collapse logic; hamburger list toggle; tap-on-polygon triggers drawer slide-up |

## Out of Scope

- No changes to GeoJSON data
- No changes to `NEIGHBORHOOD_COLORS` or `NEIGHBORHOOD_DATA`
- No new dependencies (no JS animation library, no CSS framework)
- No changes to the Leaflet map configuration beyond tile theming
