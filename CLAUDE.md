# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

No build step or package manager — this is a static site. You **must** serve it through a local server (browsers block `fetch()` on `file://`):

```bash
npx serve .       # opens on http://localhost:3000
python3 -m http.server 8000
```

Deploys automatically to GitHub Pages on every push to `main`.

## Architecture

Three files contain all application logic:

- **`index.html`** — Full page layout: header, sidebar (default overview + detail panel), map container, footer. The sidebar switches between `#sidebar-default` (legend) and `#sidebar-detail` (neighborhood info) on map click.
- **`js/map.js`** — All JavaScript. Two top-level data objects drive the UI:
  - `NEIGHBORHOOD_COLORS` — maps neighborhood name → hex color
  - `NEIGHBORHOOD_DATA` — maps neighborhood name → `{ type, description }`
  - Keys in both objects **must exactly match** `properties.name` in the GeoJSON.
- **`css/style.css`** — All styles. Dark mode is toggled via `data-theme="dark"` on `<html>` and persisted in `localStorage` under the key `tehaleh-theme`.
- **`data/neighborhoods.geojson`** — Boundary polygons. Each feature has properties: `name`, `nickname`, `slug`, `status`. Nicknames are read directly from GeoJSON; descriptions come from `NEIGHBORHOOD_DATA`.

Leaflet.js and OpenStreetMap tiles are loaded via CDN — no local dependencies. Two tile layers (`TILES.light`, `TILES.dark`) are swapped when the theme changes.

## Adding or Editing Neighborhoods

1. Edit boundary polygons at [geojson.io](https://geojson.io/) using `data/neighborhoods.geojson`.
2. Add an entry to `NEIGHBORHOOD_COLORS` and `NEIGHBORHOOD_DATA` in `js/map.js` with the exact same name string.
3. Test locally that the polygon renders, is clickable, and the sidebar detail panel populates correctly.

## Code Style

2-space indentation, no linter or formatter enforced. Match the existing style.
