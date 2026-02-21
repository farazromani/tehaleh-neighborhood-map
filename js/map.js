/* ═══════════════════════════════════════════════════════════
   TEHALEH NEIGHBORHOOD MAP — MAP LOGIC
   Depends on: Leaflet.js, data/neighborhoods.geojson
═══════════════════════════════════════════════════════════ */

// ── Neighborhood Color Palette ─────────────────────────────
// 16 neighborhoods, each with a distinct earthy PNW color.
const NEIGHBORHOOD_COLORS = {
  "Big Sky":                   "#4e8b6e",   // forest green
  "Trilogy":                   "#8a7fb5",   // lavender sage
  "Tyee Ridge":                "#6b9fb5",   // sky blue
  "Wesley":                    "#b5a04e",   // golden wheat
  "Berkeley Park":             "#7aab5a",   // meadow green
  "Town Homes":                "#c47b5a",   // terracotta
  "Cathedral Ridge":           "#5a8a7a",   // deep teal
  "Upper":                     "#9aab6a",   // olive
  "OG Mainvue":                "#7a9e8a",   // muted sage
  "New Upper":                 "#b5a07a",   // warm sand
  "Pinnacle Ridge":            "#6a8ab5",   // slate blue
  "Observation Ridge":         "#b57a4e",   // warm clay
  "Pyramid Ridge":             "#8ab55a",   // bright moss
  "Lower":                     "#7a6ea0",   // dusty purple
  "Edmunds Park":              "#5aab8a",   // jade
  "Eagle Ridge":               "#b56a4e",   // rust
  "Glacier Pointe":            "#3d7a5e",   // deep evergreen
  "Glacier Pointe Verterra":   "#9b6bb5",   // warm violet (55+ boutique)
};

// ── Neighborhood Metadata ──────────────────────────────────
// Keys must exactly match `properties.name` in the GeoJSON.
// Nicknames are pulled live from GeoJSON properties.nickname.
const NEIGHBORHOOD_DATA = {
  "Big Sky": {
    type: "Active Neighborhood",
    description: "A scenic neighborhood in the southern reaches of Tehaleh, Big Sky earns its name with wide-open views toward the Cascade foothills. Newer construction and a mix of builder styles make it a popular choice for families.",
    tags: ["Views", "New Construction", "Family-Friendly"],
  },
  "Trilogy": {
    type: "55+ Age-Qualified Community",
    description: "An award-winning active adult neighborhood by Shea Homes. Trilogy residents enjoy exclusive access to The Trilogy Club — a full-service clubhouse featuring a resort-style pool, fitness center, and The Post & Pour restaurant.",
    tags: ["55+ Active Adult", "Shea Homes", "Clubhouse", "Pool"],
    amenities: "The Trilogy Club, pool, fitness center, The Post & Pour restaurant",
  },
  "Tyee Ridge": {
    type: "Active Neighborhood",
    description: "Perched along one of Tehaleh's natural ridgelines, Tyee Ridge offers elevated homesites with pleasant territorial views and easy access to the community's extensive trail network.",
    tags: ["Ridge Views", "Trail Access"],
  },
  "Wesley": {
    type: "Senior Living",
    description: "A Life Plan Community (continuing care retirement community) offering independent living, assisted living, memory care, and skilled nursing — all within the Tehaleh master plan and surrounded by nature.",
    tags: ["Senior Living", "Continuing Care", "All Care Levels"],
    amenities: "Full-service senior campus",
  },
  "Berkeley Park": {
    type: "Active Neighborhood",
    description: "A lively neighborhood centered around park space, Berkeley Park is known for its community feel, green commons, and central location within the Tehaleh master plan.",
    tags: ["Parks", "Community Feel", "Central Location"],
  },
  "Town Homes": {
    type: "Attached Homes Community",
    description: "Tehaleh's townhome enclave offers lower-maintenance living without sacrificing access to the community's miles of trails, parks, and amenities. A great option for first-time buyers or those looking to downsize.",
    tags: ["Townhomes", "Low Maintenance", "Attached Homes"],
  },
  "Cathedral Ridge": {
    type: "Active Neighborhood",
    description: "Named for the cathedral-like Douglas firs that define its character, Cathedral Ridge is one of Tehaleh's most naturally beautiful neighborhoods, with heavily wooded lots and a sense of seclusion.",
    tags: ["Wooded Lots", "Nature", "Seclusion"],
  },
  "Upper": {
    type: "Established Neighborhood",
    description: "One of Tehaleh's higher-elevation established neighborhoods, Upper enjoys broad views and a quieter, more tucked-away feel while remaining connected to the broader trail and park network.",
    tags: ["Elevated", "Established", "Views"],
  },
  "OG Mainvue": {
    type: "Established Neighborhood",
    description: "The original MainVue section of Tehaleh, featuring single-family homes from the community's earlier development phases. A well-established area with mature landscaping and settled character.",
    tags: ["Established", "Mature Landscaping", "Original Phase"],
  },
  "New Upper": {
    type: "Active Neighborhood",
    description: "An expansion of the Upper neighborhood area, New Upper (NUT) features newer construction on sites that capture some of the best elevated views in the community.",
    tags: ["New Construction", "Elevated Views", "Expansion"],
  },
  "Pinnacle Ridge": {
    type: "Active Neighborhood",
    description: "True to its name, Pinnacle Ridge sits at one of Tehaleh's highest points, offering sweeping panoramic views. Homesites here are among the most coveted in the community.",
    tags: ["Panoramic Views", "Premium Lots", "High Elevation"],
  },
  "Observation Ridge": {
    type: "Active Neighborhood",
    description: "Positioned to take full advantage of Tehaleh's natural topography, Observation Ridge lives up to its nickname 'Super Upper' with some of the most dramatic elevated outlooks in the community.",
    tags: ["Elevated", "Views", "Premium"],
  },
  "Pyramid Ridge": {
    type: "Active Neighborhood",
    description: "A compact and cohesive neighborhood tucked into the ridgeline terrain, Pyramid Ridge features homes that blend into the natural landscape with thoughtful siting and mature tree preservation.",
    tags: ["Ridgeline", "Nature", "Tree Preservation"],
  },
  "Lower": {
    type: "Original Neighborhood",
    description: "The historic heart of Tehaleh — also known as OG Tehaleh or the Historic District. This is where the community story began, centered around Discovery Park Community Center, Hounds Hollow Dog Park, and the original trail network.",
    tags: ["Original Phase", "Historic", "Community Center", "Dog Park"],
    amenities: "Discovery Park Community Center, Hounds Hollow Dog Park, The Edge Skatepark, The Trek Mountain Bike Park",
  },
  "Edmunds Park": {
    type: "Park & Residential Neighborhood",
    description: "A neighborhood organized around park and open-space amenities, Edmunds Park offers a green, active lifestyle with direct access to recreational facilities and trail connections throughout Tehaleh.",
    tags: ["Parks", "Open Space", "Recreational", "Trail Access"],
  },
  "Eagle Ridge": {
    type: "Active Neighborhood",
    description: "One of Tehaleh's newer and most expansive neighborhoods, Eagle Ridge stretches across broad terrain with a variety of floor plans and builders. Named for the eagles occasionally spotted soaring over the community.",
    tags: ["New Construction", "Multiple Builders", "Expansive", "Wildlife"],
  },
  "Glacier Pointe": {
    type: "Active Neighborhood — Phase 2",
    description: "Glacier Pointe officially launches Tehaleh's second phase — a sweeping new addition nestled in the Cascade foothills with stunning views of Mt. Rainier. Multiple national builders including D.R. Horton, Tri Pointe Homes, Holt Homes, Richmond American, and Garrette Homes offer a wide variety of floor plans from paired homes to spacious five-bedroom single-family designs. Future parks and trail extensions will weave Glacier Pointe into Tehaleh's beloved 40+ mile network.",
    tags: ["Phase 2", "Multiple Builders", "Mt. Rainier Views", "New Construction", "Cascade Foothills"],
    amenities: "40+ miles of trails, future parks, connection to Post & Pour, Hounds Hollow Dog Park, The Trek mountain bike park",
  },
  "Glacier Pointe Verterra": {
    type: "55+ Boutique Community",
    description: "Verterra — a Trilogy® Boutique Community — is Shea Homes' newest age-qualified neighborhood, tucked within Glacier Pointe with panoramic Mt. Rainier views from every vantage point. Built by America's Most Trusted® Active Adult Resort Builder for 12 consecutive years, Verterra offers 485 single-family and attached homes across five collections, ranging from 1,342 to 2,584 sq ft with one to three bedrooms. Resort-style amenities include a clubhouse (The Club), seasonal pool, pickleball courts, fitness center, and a fitness lawn — all designed around an active, social lifestyle.",
    tags: ["55+ Active Adult", "Shea Homes", "Trilogy Boutique", "Resort-Style", "Clubhouse", "Mt. Rainier Views"],
    amenities: "The Club clubhouse, seasonal pool, pickleball courts, fitness center, fitness lawn, access to all Tehaleh trails and parks",
  },
};

// ── Map Initialization ─────────────────────────────────────
const map = L.map('map', {
  center: [47.130, -122.180],
  zoom: 14,
  zoomControl: true,
  attributionControl: false,  // using custom attribution overlay in HTML
});

// Position zoom control top-right (sidebar occupies left side)
map.zoomControl.setPosition('topright');

// ── Tile Layer — OpenStreetMap (free, no API key required) ─
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// ── State ──────────────────────────────────────────────────
let activeLayer  = null;
let geojsonLayer = null;

// ── DOM References ─────────────────────────────────────────
const sidebarDefault = document.getElementById('sidebar-default');
const sidebarDetail  = document.getElementById('sidebar-detail');
const backBtn        = document.getElementById('back-btn');
const detailColorBar = document.getElementById('detail-color-bar');
const detailName     = document.getElementById('detail-name');
const detailType     = document.getElementById('detail-type');
const detailDesc     = document.getElementById('detail-description');
const detailTags     = document.getElementById('detail-tags');
const detailMeta     = document.getElementById('detail-meta');
const legendList     = document.getElementById('legend-list');

// ── Color Helpers ──────────────────────────────────────────
function getColor(name) {
  return NEIGHBORHOOD_COLORS[name] || '#7a9e8a';
}

// ── Polygon Style Functions ────────────────────────────────
function featureStyle(feature, isActive) {
  const color = getColor(feature.properties.name);
  return {
    fillColor:   color,
    weight:      isActive ? 2.5 : 1.5,
    opacity:     1,
    color:       isActive ? '#ffffff' : 'rgba(255,255,255,0.75)',
    fillOpacity: isActive ? 0.68 : 0.40,
  };
}

function defaultStyle(feature) {
  return featureStyle(feature, false);
}

// ── Interaction Handlers ───────────────────────────────────
function highlightFeature(e) {
  const layer = e.target;
  if (layer === activeLayer) return;
  layer.setStyle({ fillOpacity: 0.58, weight: 2.5, color: '#ffffff' });
  layer.bringToFront();
}

function resetHighlight(e) {
  const layer = e.target;
  if (layer === activeLayer) return;
  geojsonLayer.resetStyle(layer);
}

function onFeatureClick(e) {
  const layer = e.target;
  const props = layer.feature.properties;
  const name  = props.name;
  const data  = NEIGHBORHOOD_DATA[name] || {};

  // Reset previous active layer
  if (activeLayer && activeLayer !== layer) {
    geojsonLayer.resetStyle(activeLayer);
  }

  // Apply active style
  layer.setStyle(featureStyle(layer.feature, true));
  layer.bringToFront();
  activeLayer = layer;

  // Smoothly fly the map to this neighborhood's bounds
  map.flyToBounds(layer.getBounds(), {
    paddingTopLeft:     [0, 20],
    paddingBottomRight: [0, 20],
    maxZoom:            16,
    duration:           0.65,
  });

  // ── Populate sidebar detail panel ──────────────────────
  const color    = getColor(name);
  const nickname = props.nickname && props.nickname.trim() ? props.nickname : null;

  detailColorBar.style.background = `linear-gradient(90deg, ${color}, ${color}55)`;
  detailName.textContent = name;

  // Show nickname inline with type if it exists
  detailType.textContent = nickname
    ? `${data.type || 'Neighborhood'} · Also known as "${nickname}"`
    : (data.type || 'Neighborhood');

  detailDesc.textContent = data.description || 'More information coming soon for this neighborhood.';

  // Tags
  detailTags.innerHTML = '';
  (data.tags || []).forEach(tag => {
    const span = document.createElement('span');
    span.className   = 'tag';
    span.textContent = tag;
    detailTags.appendChild(span);
  });

  // Meta rows (only rendered when data exists)
  detailMeta.innerHTML = '';
  const metaItems = [];
  if (data.amenities) metaItems.push({ label: 'Amenities', value: data.amenities });
  if (props.status)   metaItems.push({ label: 'Status',    value: capitalize(props.status) });

  metaItems.forEach(({ label, value }) => {
    const row = document.createElement('div');
    row.className = 'meta-row';
    row.innerHTML = `
      <span class="meta-label">${label}</span>
      <span class="meta-value">${value}</span>
    `;
    detailMeta.appendChild(row);
  });

  // Switch sidebar panels
  sidebarDefault.hidden = true;
  sidebarDetail.hidden  = false;

  // Scroll sidebar back to top (especially helpful on mobile)
  document.querySelector('.sidebar').scrollTop = 0;
}

// ── Back Button ────────────────────────────────────────────
backBtn.addEventListener('click', () => {
  if (activeLayer) {
    geojsonLayer.resetStyle(activeLayer);
    activeLayer = null;
  }
  sidebarDetail.hidden  = true;
  sidebarDefault.hidden = false;
});

// ── Build Legend ───────────────────────────────────────────
function buildLegend(data) {
  legendList.innerHTML = '';
  const sorted = [...data.features].sort((a, b) =>
    a.properties.name.localeCompare(b.properties.name)
  );
  sorted.forEach(feature => {
    const name  = feature.properties.name;
    const color = getColor(name);

    const li = document.createElement('li');
    li.className = 'legend-item';
    li.setAttribute('title', name);
    li.innerHTML = `
      <span class="legend-swatch" style="background:${color};"></span>
      <span class="legend-label">${name}</span>
    `;
    li.addEventListener('click', () => {
      geojsonLayer.eachLayer(layer => {
        if (layer.feature.properties.name === name) {
          onFeatureClick({ target: layer });
        }
      });
    });
    legendList.appendChild(li);
  });
}

// ── Utility ────────────────────────────────────────────────
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Load GeoJSON & Render ──────────────────────────────────
fetch('./data/neighborhoods.geojson')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}: GeoJSON not found`);
    return response.json();
  })
  .then(data => {
    geojsonLayer = L.geoJSON(data, {
      style: defaultStyle,
      onEachFeature: (feature, layer) => {
        const name     = feature.properties.name;
        const nickname = feature.properties.nickname;

        // Tooltip shows name + nickname (if present)
        const tooltipContent = nickname && nickname.trim()
          ? `<strong>${name}</strong><br><span style="opacity:0.75;font-size:11px;">${nickname}</span>`
          : `<strong>${name}</strong>`;

        // Permanent label centered on the polygon
        layer.bindTooltip(tooltipContent, {
          permanent:  true,
          direction:  'center',
          className:  'nbhd-tooltip',
          interactive: false,
        });

        layer.on({
          mouseover: highlightFeature,
          mouseout:  resetHighlight,
          click:     onFeatureClick,
        });
      },
    }).addTo(map);

    // Fit map to the full extent of all neighborhoods on load
    map.fitBounds(geojsonLayer.getBounds(), {
      padding: [32, 32],
    });

    // Populate the sidebar legend from the live GeoJSON data
    buildLegend(data);
  })
  .catch(err => {
    console.warn('Could not load neighborhoods.geojson:', err.message);
    legendList.innerHTML = `
      <li style="padding:8px 4px; font-size:13px; color:#5c6e65; line-height:1.6;">
        Could not load <code>data/neighborhoods.geojson</code>.<br>
        Make sure the file is in the <code>data/</code> folder and you are running
        through a local server (e.g. <code>npx serve .</code>), not by opening
        the HTML file directly in your browser.
      </li>
    `;
  });

// ── Tooltip Styles (injected — no separate CSS rule needed) ─
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
  .nbhd-tooltip {
    background: rgba(20, 35, 28, 0.72) !important;
    border: none !important;
    border-radius: 4px !important;
    color: #f5f0e8 !important;
    font-family: 'Zilla Slab', Georgia, serif !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    line-height: 1.3 !important;
    padding: 3px 8px !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.30) !important;
    white-space: normal !important;
    max-width: 110px !important;
    text-align: center !important;
    pointer-events: none !important;
    letter-spacing: 0.01em !important;
  }
  .nbhd-tooltip::before { display: none !important; }
`;
document.head.appendChild(tooltipStyle);