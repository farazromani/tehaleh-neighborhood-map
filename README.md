# Tehaleh Neighborhood Map 🗺️

An interactive web map of the [Tehaleh](https://www.tehaleh.com/) master-planned community in Bonney Lake, WA. Click any neighborhood polygon to see its name and details.

**Live site:** [https://farazromani.github.io/tehaleh-neighborhood-map](https://farazromani.github.io/tehaleh-neighborhood-map)

---

## Features

- **Interactive neighborhood polygons** — hover to highlight, click to explore
- **Sidebar detail panel** — shows each neighborhood's name, type, nickname, tags, and amenities
- **Clickable legend** — navigate to any neighborhood directly from the sidebar
- **Responsive layout** — works on desktop and mobile

---

## Project Structure

```
tehaleh-neighborhood-map/
├── index.html              # Main page and layout
├── css/
│   └── style.css           # All styles (Pacific NW / topographic aesthetic)
├── js/
│   └── map.js              # Leaflet map logic, neighborhood data, interactions
├── data/
│   └── neighborhoods.geojson   # Neighborhood boundary polygons
└── README.md
```

---

## Tech Stack

Everything used in this project is **free and open source**.

| Layer | Technology | Notes |
|---|---|---|
| **Map rendering** | [Leaflet.js](https://leafletjs.com/) v1.9.4 | Lightweight, open-source interactive maps |
| **Base map tiles** | [OpenStreetMap](https://www.openstreetmap.org/) | Free tile layer, no API key required |
| **Neighborhood boundaries** | [GeoJSON](https://geojson.org/) | Hand-drawn polygons stored as a static file |
| **Frontend** | Vanilla HTML, CSS, JavaScript | No build tools or frameworks needed |
| **Fonts** | [Google Fonts](https://fonts.google.com/) | Zilla Slab + Source Sans 3, loaded via CDN |
| **Hosting** | [GitHub Pages](https://pages.github.com/) | Auto-deploys from the `main` branch |
| **Version control** | [Git](https://git-scm.com/) + [GitHub](https://github.com/) | Free for public repositories |
| **Boundary editing** | [geojson.io](https://geojson.io/) | Browser-based polygon drawing tool |

### Why these choices?

**Leaflet.js** was chosen over Google Maps or Mapbox because it is fully open source, requires no API key, has no usage limits, and has excellent built-in support for GeoJSON polygon rendering and interactivity.

**OpenStreetMap tiles** provide a clean, detailed base map at no cost. For low-to-moderate traffic sites, OSM tiles are free to use under their [tile usage policy](https://operations.osmfoundation.org/policies/tiles/).

**Vanilla JS** (no React, no Vue, no bundler) keeps the project accessible to anyone who knows basic HTML — no `npm install`, no build step, no dependency hell.

**GitHub Pages** deploys the site automatically on every `git push` to `main`. No server configuration needed.

---

## Getting Started

### Prerequisites

- A modern web browser
- [Git](https://git-scm.com/) installed on your machine
- A code editor (e.g. [VS Code](https://code.visualstudio.com/))
- [Node.js](https://nodejs.org/) — only needed to run a local development server

### 1. Clone the repository

```bash
git clone https://github.com/farazromani/tehaleh-neighborhood-map.git
cd tehaleh-neighborhood-map
```

### 2. Run a local development server

You **must** use a local server — browsers block `fetch()` requests when opening HTML files directly via `file://`. Use any of the following:

```bash
# Option A — Node.js (recommended)
npx serve .

# Option B — Python 3
python3 -m http.server 8000
```

Then open `http://localhost:3000` (or whichever port is shown) in your browser.

### 3. View the map

The map will load, fit to all neighborhood boundaries, and be ready to interact with. Click any colored polygon or legend item to see its details in the sidebar.

---

## Neighborhood Data

Neighborhood boundaries are stored in `data/neighborhoods.geojson` as hand-drawn polygons. The file currently includes **18 neighborhoods**:

| Neighborhood | Nickname | Type |
|---|---|---|
| Big Sky | Inspiration Ridge | Active Neighborhood |
| Trilogy | — | 55+ Age-Qualified Community |
| Tyee Ridge | — | Active Neighborhood |
| Wesley | — | Senior Living |
| Berkeley Park | Berkeley Partyway | Active Neighborhood |
| Town Homes | — | Attached Homes |
| Cathedral Ridge | — | Active Neighborhood |
| Upper | — | Established Neighborhood |
| OG Mainvue | — | Established Neighborhood |
| New Upper | NUT | Active Neighborhood |
| Pinnacle Ridge | — | Active Neighborhood |
| Observation Ridge | Super Upper | Active Neighborhood |
| Pyramid Ridge | — | Active Neighborhood |
| Lower | OG Tehaleh / Historic District | Original Neighborhood |
| Edmunds Park | — | Park & Residential |
| Eagle Ridge | — | Active Neighborhood |
| Glacier Pointe | — | Active Neighborhood — Phase 2 |
| Glacier Pointe Verterra | — | 55+ Boutique Community (Shea Homes / Trilogy) |

Each feature in the GeoJSON includes the following properties:

```json
{
  "name": "Big Sky",
  "nickname": "Inspiration Ridge",
  "slug": "big-sky",
  "status": "active"
}
```

To edit boundaries, open `data/neighborhoods.geojson` at [geojson.io](https://geojson.io/), make your changes, and save the file back.

---

## How to Contribute

Contributions are welcome — whether you live in Tehaleh, know the community well, or just want to help improve the map. Here's how:

### Reporting issues

If you notice an incorrect boundary, a misspelled name, missing neighborhood, or a bug, please [open an issue](https://github.com/farazromani/tehaleh-neighborhood-map/issues) on GitHub with:
- A clear description of the problem
- A screenshot if applicable
- The neighborhood name involved

### Improving neighborhood boundaries

Boundary polygons were hand-drawn and are approximate. If you know the exact boundaries of a neighborhood:

1. Fork the repository and clone it locally.
2. Open `data/neighborhoods.geojson` at [geojson.io](https://geojson.io/).
3. Adjust the polygon vertices to better reflect reality.
4. Save the file, commit, and open a pull request with a brief description of what you changed and why.

### Adding or correcting neighborhood information

Descriptions, tags, amenities, and nicknames are stored in the `NEIGHBORHOOD_DATA` object at the top of `js/map.js`. To improve them:

1. Fork and clone the repo.
2. Edit the relevant entry in `NEIGHBORHOOD_DATA` in `js/map.js`.
3. Test locally with `npx serve .` to make sure it looks right.
4. Open a pull request.

### Adding new features

For larger feature contributions, please [open an issue](https://github.com/farazromani/tehaleh-neighborhood-map/issues) first to discuss the idea before spending time building it. This helps avoid duplicate work and ensures the feature fits the project's direction.

### Pull request checklist

Before submitting a PR, please confirm:
- [ ] The site loads correctly when served locally
- [ ] All polygons still render and are clickable
- [ ] No new external dependencies have been added without prior discussion
- [ ] Your changes are described clearly in the PR description

### Code style

This project uses plain HTML, CSS, and JavaScript — no linter or formatter is enforced. Just keep the style consistent with the existing code: clear comments, consistent indentation (2 spaces), and descriptive variable names.

---

## License

This project is open source under the [MIT License](LICENSE).

Neighborhood boundary data is hand-drawn and approximate. This is a community fan project, not affiliated with Newland or the Tehaleh community organization.

Map tiles © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), available under the [Open Database License](https://opendatacommons.org/licenses/odbl/).

---

## Acknowledgments

- The [Tehaleh community](https://www.tehaleh.com/) for being an inspiring place to map
- [Leaflet.js](https://leafletjs.com/) for making interactive web maps accessible
- [OpenStreetMap](https://www.openstreetmap.org/) contributors for free, open map data
- [geojson.io](https://geojson.io/) for making polygon drawing easy