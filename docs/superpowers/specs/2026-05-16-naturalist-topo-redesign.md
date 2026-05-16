# Tehaleh Map — Naturalist Topo Redesign

**Date:** 2026-05-16
**Status:** Approved

## Overview

Complete visual redesign from scratch. The aesthetic is a Pacific Northwest naturalist's field journal — warm parchment, forest green ink, a floating "field notes" panel over a full-screen topographic map. No sidebar column; the map owns the entire canvas.

## Core Decisions

- **Direction:** Topographic / Printed Map
- **Layout:** Full-screen map + floating journal panel (top-right on desktop, bottom drawer on mobile)
- **Palette:** Naturalist Field Journal (warm cream, forest green ink, cedar amber accent)

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--color-forest` | `#2a3820` | Header, footer, dark surfaces |
| `--color-forest-mid` | `#4a6838` | Hover states, back button |
| `--color-forest-light` | `#7a9060` | Borders, muted labels |
| `--color-parchment` | `#f2ecd6` | Map background / body |
| `--color-panel` | `#f8f4e4` | Floating journal panel |
| `--color-bark` | `#8a6a40` | Cedar accent: type labels, spine |
| `--color-ink` | `#2a3820` | Primary text |
| `--color-ink-light` | `#5a6a48` | Secondary text, descriptions |
| `--color-border` | `#9ab080` | Panel border, dividers |
| `--color-spine` | `#5a7848` | Journal spine gradient |

## Typography

- **Brand title:** Zilla Slab 700, uppercase, letter-spacing 0.08em, `#e8ecd8` on dark header
- **Neighborhood names:** Zilla Slab 700
- **Labels / type tags:** Source Sans 3 600, uppercase, letter-spacing 0.12–0.18em
- **Body / descriptions:** Source Sans 3 400
- **Cedar accent text:** Source Sans 3 600, uppercase, `--color-bark`

## Layout — Desktop (≥ 768px)

Map fills the entire layout area (`position: absolute; inset: 0`). No sidebar column.

Floating journal panel: `position: absolute; top: 20px; right: 20px; width: 220px`. The panel has:
1. A 4px green spine stripe at the very top (gradient: `#5a7848 → #8a9a60 → #5a7848`)
2. Header area: neighborhood name (Zilla Slab) + type label (cedar) + color dot
3. Body: description text
4. Footer: "← All Neighborhoods" back link
5. Default state: "Field Notes" title + numbered legend list

## Layout — Mobile (< 768px)

Same bottom-drawer behavior as current. Header/footer hidden. The journal panel becomes the drawer — styled with the same parchment and green border. Drawer handle uses cedar pill. Journal spine hidden on mobile (border-top serves that purpose).

## Header

Dark forest green (`#2a3820`) with the PNW mountain photo (same Unsplash URL). "TEHALEH" in spaced serif caps. Topo-line decoration on right. Height: 46px.

## Footer / Caption Bar

Replace the full footer with a thin caption bar (`height: 28px`, `background: #1e2a18`). Single line of small uppercase text: community info + disclaimer. Footer-note links hidden.

## Map Tiles

Switch from OSM standard to **OpenTopoMap** (`https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png`). Renders contour lines, elevation shading, and cartographic labels — perfectly matches the naturalist topo aesthetic. Attribution updated accordingly.

## Files Changed

| File | Changes |
|---|---|
| `css/style.css` | New tokens; header dark green; sidebar → absolute floating panel; journal spine; caption bar; leaflet zoom parchment style; mobile drawer restyle |
| `index.html` | Add `.journal-spine` div; update sidebar-prompt copy; simplify footer to caption bar |
| `js/map.js` | OpenTopoMap tile URL; updated attribution text |
