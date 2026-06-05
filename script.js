const REGIONS = [
  { name: 'Astana (500kV)', lat: 51.18, lon: 71.45, load: 2.1, cap: 3.0, type: 'HUB', status: 'online', voltage: 512 },
  { name: 'Karaganda', lat: 49.80, lon: 73.10, load: 1.8, cap: 2.5, type: 'IND', status: 'online', voltage: 498 },
  { name: 'Ekibastuz', lat: 51.72, lon: 75.35, load: 3.9, cap: 4.8, type: 'GEN', status: 'online', voltage: 505 },
  { name: 'Almaty (500kV)', lat: 43.25, lon: 76.95, load: 2.8, cap: 3.2, type: 'HUB', status: 'warning', voltage: 489 },
  { name: 'Shymkent', lat: 42.32, lon: 69.59, load: 1.4, cap: 1.8, type: 'DIST', status: 'online', voltage: 501 },
  { name: 'Zhambyl (500kV)', lat: 42.90, lon: 71.39, load: 0.9, cap: 1.0, type: 'XFER', status: 'warning', voltage: 494 },
  { name: 'Pavlodar', lat: 52.29, lon: 76.97, load: 1.2, cap: 1.6, type: 'IND', status: 'online', voltage: 508 },
  { name: 'Kokshetau', lat: 53.28, lon: 69.39, load: 0.6, cap: 0.9, type: 'DIST', status: 'online', voltage: 503 },
  { name: 'Aktobe', lat: 50.28, lon: 57.21, load: 0.7, cap: 1.1, type: 'WEST', status: 'online', voltage: 497 },
  { name: 'Atyrau', lat: 47.11, lon: 51.92, load: 0.5, cap: 0.8, type: 'WEST', status: 'online', voltage: 499 },
  { name: 'Oskemen', lat: 49.97, lon: 82.61, load: 0.8, cap: 1.2, type: 'IND', status: 'online', voltage: 504 },
  { name: 'Semey', lat: 50.41, lon: 80.23, load: 0.4, cap: 0.7, type: 'DIST', status: 'online', voltage: 502 },
  { name: 'Taraz', lat: 42.90, lon: 71.36, load: 0.5, cap: 0.8, type: 'DIST', status: 'online', voltage: 500 },
  { name: 'Kyzylorda', lat: 44.85, lon: 65.51, load: 0.4, cap: 0.6, type: 'DIST', status: 'online', voltage: 496 },
  { name: 'Turkestan', lat: 43.30, lon: 68.25, load: 0.35, cap: 0.5, type: 'DIST', status: 'online', voltage: 498 },
];

const CIRCUIT_PARTS = [
  { name: 'Ekibastuz 1150kV Bus', type: 'Busbar', rating: '1150→500kV', status: 'active' },
  { name: 'Astana 500kV Substation', type: 'GIS Substation', rating: '500kV, 2000MVA', status: 'active' },
  { name: 'Zhambyl 500kV Sub', type: 'AIS Substation', rating: '500kV, 1600MVA', status: 'active' },
  { name: 'Shu 500kV Sub', type: 'AIS Substation', rating: '500kV, 1200MVA', status: 'active' },
  { name: 'Shymkent 500kV Sub', type: 'AIS Substation', rating: '500kV, 1800MVA', status: 'active' },
  { name: 'AT-1 Kokshetau (860MVA)', type: 'Autotransformer', rating: '500/220kV, 860MVA', status: 'active' },
  { name: 'AT-2 Nura (860MVA)', type: 'Autotransformer', rating: '500/220kV, 860MVA', status: 'active' },
  { name: 'CB-Ekibastuz-N', type: 'Circuit Breaker', rating: 'SF6, 550kV, 4000A', status: 'active' },
  { name: 'CB-Zhambyl-S', type: 'Circuit Breaker', rating: 'SF6, 550kV, 3150A', status: 'standby' },
  { name: 'Line Ekibastuz–Kokshetau', type: 'OHL (AC)', rating: '500kV, 432km, 2700MW', status: 'active' },
  { name: 'Line Karaganda–Astana', type: 'OHL (AC)', rating: '500kV, ~200km', status: 'active' },
  { name: 'Line N-S (2×475km)', type: 'OHL (AC)', rating: '500kV, North-South', status: 'active' },
  { name: 'Kapchagay HPP Gen', type: 'Hydro Generator', rating: '364 MW, 10.5kV', status: 'active' },
  { name: 'Ekibastuz GRES-1', type: 'Steam Turbine', rating: '4000MW, 24kV', status: 'active' },
  { name: 'Relay Protection RDZ-2', type: 'Distance Relay', rating: '500kV', status: 'active' },
  { name: 'FACTS/SVC Almaty', type: 'Static VAR Comp.', rating: '±300 Mvar', status: 'standby' },
  { name: 'SCADA EMS Node', type: 'Control System', rating: 'IEC 61968/70', status: 'active' },
  { name: 'PMU Astana Hub', type: 'Phasor Meas. Unit', rating: '1000 samples/s', status: 'active' },
];

const AI_INSIGHTS = [
  { type: 'critical', title: '⚠ Evening Peak Risk — Deficit Alert', body: 'ML forecast predicts demand of 17.1 GW at 19:00–21:00 AST. Maximum domestic generation capacity is ~16.7 GW. Recommend activating import contracts from OES Russia by 18:30 at minimum 400 MW.', time: 'Just now' },
  { type: 'warning', title: '🔥 Zhambyl 500kV Substation Near Capacity', body: 'Current load at 94% of rated capacity (1505/1600 MVA). Thermal imaging suggests transformer temperature at 82°C (threshold: 95°C). Reduce by re-routing 120 MVA through Shu substation.', time: '5 min ago' },
  { type: 'info', title: '🌬️ Wind Generation Outperforming Forecast', body: 'Zhongar Gate wind corridor generating 187 MW vs forecast 167 MW (+12%). Shelek corridor contributing 94 MW. ERA5 NWP model suggests this continues for 3 more hours.', time: '8 min ago' },
  { type: 'success', title: '✅ Ekibastuz GRES-1 Unit 8 — Back Online', body: 'Unit 8 (500MW) has completed scheduled maintenance and reconnected at 14:05 AST. Total GRES-1 output now 3,800 MW (95% of nameplate). Frequency deviation corrected to +0.02 Hz.', time: '23 min ago' },
  { type: 'info', title: '📡 North–South Corridor Load +340 MW', body: 'Industrial demand surge detected in Karaganda-Temirtau power hub. Steel and mining loads increased. Current N-S flow: 2,140 MW (max: 2,700 MW). Margin: 560 MW.', time: '30 min ago' },
  { type: 'warning', title: '💧 Kapchagay Reservoir — Low Level Advisory', body: 'Kapchagay HPP water level at 65% seasonal norm. Forecast generation limited to 280 MW (of 364 MW rated) for next 14 days. Re-dispatch thermal units to compensate.', time: '1h ago' },
  { type: 'info', title: '🔌 Western Kazakhstan Integration Progress', body: 'HVDC North-South direct current line construction on schedule. Atyrau and Mangystau regions currently operating as isolated island. Integration expected Q3 2027 per KEGOC investment plan.', time: '2h ago' },
  { type: 'success', title: '📈 Renewable Capacity Record — 2.11 GW', body: 'Today\'s renewable generation (wind + solar + biogas) reached 2.11 GW — 14.2% of total mix. This is a 2.1% increase vs yesterday and aligns with Kazakhstan\'s 15% RES target for 2025.', time: '3h ago' },
  { type: 'info', title: '🏭 Balkhash CHP Grid Sync Status', body: 'All 6 units of Balkhash CHP operating nominally at combined 2,090 MW. Power factor maintained at 0.97. Next scheduled maintenance: Unit 3 — February 2026.', time: '4h ago' },
  { type: 'warning', title: '📉 Almaty 500kV Voltage Deviation', body: 'Bus voltage at Almaty 500kV substation measured at 489 kV (−2.2% from nominal). Automat. voltage regulation activated. Under investigation — possible reactive power shortage in southeast zone.', time: '45 min ago' },
  { type: 'info', title: '🌡️ Temperature-Demand Correlation Active', body: 'Current ambient temperature in Astana: −2°C. Heating load elevated by estimated 340 MW vs seasonal average. LSTM model auto-adjusted upward by 2.3% for next 6h forecast window.', time: '1h ago' },
  { type: 'success', title: '🔒 SCADA Cyber Security — Normal', body: 'All IEC 61850 SCADA nodes reporting nominal. No anomalies in network traffic. PMU phasor data synchronization across 18 substations operating within ±1μs time alignment.', time: '2h ago' },
];

// ===================== CLOCK =====================
function updateClock() {
  const now = new Date();
  // Kazakhstan UTC+5
  const astana = new Date(now.getTime() + 5 * 3600000);
  const s = astana.toISOString().slice(11, 19);
  document.getElementById('clockDisplay').textContent = s + ' AST';
}
setInterval(updateClock, 1000); updateClock();

// ===================== TABS =====================
function switchTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  event.target.classList.add('active');
  if (name === 'map') setTimeout(drawMap, 50);
  if (name === 'circuit') setTimeout(drawCircuit, 50);
  if (name === 'insights') setTimeout(drawHeatmap, 50);
}

// ===================== NODE LIST =====================
function buildNodeList() {
  const list = document.getElementById('nodeList');
  REGIONS.forEach(r => {
    const pct = Math.round((r.load / r.cap) * 100);
    const st = r.status === 'warning' ? 'warning' : 'online';
    list.innerHTML += `<div class="node-item">
      <div class="node-dot ${st}"></div>
      <div style="flex:1">
        <div class="node-name">${r.name}</div>
        <div class="node-type">${r.type} · ${r.voltage} kV</div>
      </div>
      <div class="node-load">${r.load} GW <span style="color:var(--text-dim)">(${pct}%)</span></div>
    </div>`;
  });
}
buildNodeList();

// ===================== PARTS TABLE =====================
function buildPartsTable() {
  const tb = document.getElementById('partsTableBody');
  CIRCUIT_PARTS.forEach(p => {
    tb.innerHTML += `<tr>
      <td>${p.name}</td>
      <td style="color:var(--text-mid)">${p.type}</td>
      <td>${p.rating}</td>
      <td><span class="status-pill ${p.status}">${p.status.toUpperCase()}</span></td>
    </tr>`;
  });
}
buildPartsTable();

// ===================== AI INSIGHTS =====================
function buildInsights() {
  const list = document.getElementById('insightList');
  AI_INSIGHTS.forEach(ins => {
    list.innerHTML += `<div class="insight-item ${ins.type}">
      <div class="insight-title">${ins.title}</div>
      <div class="insight-body">${ins.body}</div>
      <div class="insight-time">${ins.time}</div>
    </div>`;
  });
}
buildInsights();

// ===================== CHART DEFAULTS =====================
Chart.defaults.color = '#607d8b';
Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
Chart.defaults.font.family = "'JetBrains Mono', monospace";
Chart.defaults.font.size = 10;

function makeGrad(ctx, c1, c2) {
  const g = ctx.createLinearGradient(0, 0, 0, 220);
  g.addColorStop(0, c1); g.addColorStop(1, c2); return g;
}

// ===== GENERATION CHART =====
(function() {
  const ctx = document.getElementById('genChart').getContext('2d');
  const hrs = Array.from({length:24}, (_,i) => i+':00');
  const gen = [11.2,10.8,10.5,10.2,10.4,11.0,12.1,13.5,14.8,15.2,15.0,14.6,14.2,14.5,14.8,14.9,15.1,15.3,16.2,16.8,16.1,15.0,13.8,12.5];
  const load = [11.8,11.2,10.9,10.7,10.9,11.5,12.7,14.0,15.4,15.8,15.6,15.1,14.7,15.0,15.3,15.5,15.7,16.0,16.8,17.1,16.5,15.4,14.2,13.0];
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: hrs,
      datasets: [
        { label: 'Generation (GW)', data: gen, borderColor: '#00e5ff', borderWidth: 2, pointRadius: 0, fill: true, backgroundColor: makeGrad(ctx, 'rgba(0,229,255,0.15)', 'rgba(0,229,255,0.01)'), tension: 0.4 },
        { label: 'Load (GW)', data: load, borderColor: '#ff1744', borderWidth: 2, pointRadius: 0, fill: false, tension: 0.4, borderDash: [5,3] },
      ]
    },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: '#90a4ae', boxWidth: 16 } } }, scales: { x: { ticks: { maxTicksLimit: 8 } }, y: { min: 9, max: 18, ticks: { callback: v => v + 'GW' } } } }
  });
})();

// ===== VOLTAGE CHART =====
(function() {
  const ctx = document.getElementById('voltChart').getContext('2d');
  const subs = ['Ekibastuz', 'Kokshetau', 'Astana', 'Karaganda', 'Zhambyl', 'Almaty'];
  const volts = [505, 503, 512, 498, 494, 489];
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: subs,
      datasets: [{ label: 'Bus Voltage (kV)', data: volts, backgroundColor: volts.map(v => v < 495 ? 'rgba(255,23,68,0.5)' : v < 500 ? 'rgba(255,171,0,0.5)' : 'rgba(0,229,255,0.5)'), borderColor: volts.map(v => v < 495 ? '#ff1744' : v < 500 ? '#ffab00' : '#00e5ff'), borderWidth: 1, borderRadius: 4 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 480, max: 520, ticks: { callback: v => v + 'kV' } } } }
  });
})();

// ===== FREQUENCY CHART =====
(function() {
  const ctx = document.getElementById('freqChart').getContext('2d');
  const pts = 60;
  const labels = Array.from({length:pts}, (_,i) => i);
  const freq = Array.from({length:pts}, () => 49.95 + Math.random() * 0.1);
  const fcChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{ label: 'Hz', data: freq, borderColor: '#00e676', borderWidth: 1.5, pointRadius: 0, fill: true, backgroundColor: makeGrad(ctx, 'rgba(0,230,118,0.12)', 'rgba(0,230,118,0)'), tension: 0.3 }]
    },
    options: { responsive: true, animation: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { min: 49.90, max: 50.10, ticks: { callback: v => v.toFixed(2) + ' Hz' } } } }
  });
  setInterval(() => {
    fcChart.data.datasets[0].data.shift();
    fcChart.data.datasets[0].data.push(49.95 + Math.random() * 0.1);
    fcChart.update('none');
    // Update KPIs with small drift
    const newF = (49.95 + Math.random() * 0.1).toFixed(2);
    document.getElementById('kpi-freq').innerHTML = newF + '<span class="kpi-unit">Hz</span>';
  }, 1500);
})();

// ===== FLOW CHART =====
(function() {
  const ctx = document.getElementById('flowChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['N→S\nMain', 'E→W', 'S→N\n(import)', 'Kaz→RUS', 'RUS→Kaz', 'UZB→Kaz'],
      datasets: [{ label: 'Power Flow (MW)', data: [2140, 680, 310, 45, 480, 10], backgroundColor: ['rgba(0,229,255,0.5)','rgba(0,229,255,0.5)','rgba(255,171,0,0.5)','rgba(124,77,255,0.5)','rgba(255,23,68,0.5)','rgba(255,23,68,0.4)'], borderRadius: 4 }]
    },
    options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { callback: v => v + 'MW' } } } }
  });
})();

// ===== ZONE CHART =====
(function() {
  const ctx = document.getElementById('zoneChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Zone North', 'Zone South', 'Zone East', 'Zone West'],
      datasets: [{ data: [6.8, 4.2, 2.9, 1.2], backgroundColor: ['rgba(0,229,255,0.7)', 'rgba(0,230,118,0.7)', 'rgba(255,171,0,0.7)', 'rgba(124,77,255,0.7)'], borderColor: 'var(--surface)', borderWidth: 2 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#90a4ae', boxWidth: 12, font: { size: 10 } } } } }
  });
})();

// ===== FORECAST CHART =====
(function() {
  const ctx = document.getElementById('forecastChart').getContext('2d');
  const hrs = Array.from({length:24}, (_,i) => `${String(i).padStart(2,'0')}:00`);
  const actual = [13.1,12.4,11.9,11.3,11.0,11.4,12.3,13.8,15.1,15.6,15.3,14.9,14.5,14.7,15.0,15.2,15.4,15.6,null,null,null,null,null,null];
  const forecast = [13.2,12.5,12.0,11.4,11.1,11.5,12.4,13.9,15.2,15.7,15.4,15.0,14.6,14.8,15.1,15.3,15.5,15.7,16.2,17.1,16.5,15.4,14.2,13.5];
  const upper = forecast.map(v => v ? v * 1.04 : null);
  const lower = forecast.map(v => v ? v * 0.96 : null);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: hrs,
      datasets: [
        { label: 'Actual (GW)', data: actual, borderColor: '#00e5ff', borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#00e5ff', tension: 0.4 },
        { label: 'Forecast (GW)', data: forecast, borderColor: '#ffab00', borderWidth: 2, borderDash: [6,3], pointRadius: 0, tension: 0.4 },
        { label: 'Upper CI', data: upper, borderColor: 'rgba(255,171,0,0.2)', borderWidth: 1, pointRadius: 0, fill: false, tension: 0.4 },
        { label: 'Lower CI', data: lower, borderColor: 'rgba(255,171,0,0.2)', borderWidth: 1, pointRadius: 0, fill: '-1', backgroundColor: 'rgba(255,171,0,0.07)', tension: 0.4 },
      ]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#90a4ae', boxWidth: 16, filter: i => i.text !== 'Upper CI' && i.text !== 'Lower CI' } }, tooltip: { mode: 'index' } }, scales: { x: {}, y: { min: 10, max: 18, ticks: { callback: v => v + ' GW' } } } }
  });
})();

// ===== RENEWABLE FORECAST =====
(function() {
  const ctx = document.getElementById('renewForecastChart').getContext('2d');
  const hrs = Array.from({length:24}, (_,i) => i);
  const wind = [1.6,1.5,1.4,1.5,1.7,1.8,1.9,1.7,1.5,1.4,1.6,1.8,2.0,2.1,2.0,1.9,1.8,1.7,1.6,1.5,1.5,1.6,1.7,1.6];
  const solar = [0,0,0,0,0,0.2,0.5,0.8,1.0,1.1,1.2,1.2,1.1,1.0,0.9,0.7,0.4,0.1,0,0,0,0,0,0];
  new Chart(ctx, {
    type: 'line', data: {
      labels: hrs.map(h => h + 'h'),
      datasets: [
        { label: 'Wind (GW)', data: wind, borderColor: '#00e5ff', borderWidth: 2, fill: true, backgroundColor: 'rgba(0,229,255,0.08)', tension: 0.4, pointRadius: 0 },
        { label: 'Solar (GW)', data: solar, borderColor: '#ffab00', borderWidth: 2, fill: true, backgroundColor: 'rgba(255,171,0,0.08)', tension: 0.4, pointRadius: 0 },
      ]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#90a4ae', boxWidth: 12 } } }, scales: { x: { ticks: { maxTicksLimit: 8 } }, y: { min: 0, max: 2.5, ticks: { callback: v => v + 'GW' } } } }
  });
})();

// ===== REGIONAL DEMAND =====
(function() {
  const ctx = document.getElementById('regionalDemandChart').getContext('2d');
  new Chart(ctx, {
    type: 'polarArea', data: {
      labels: ['North', 'South', 'East', 'West', 'Almaty', 'Astana'],
      datasets: [{ data: [5.8, 3.9, 2.6, 1.1, 2.1, 1.8], backgroundColor: ['rgba(0,229,255,0.6)', 'rgba(0,230,118,0.6)', 'rgba(255,171,0,0.6)', 'rgba(124,77,255,0.6)', 'rgba(255,23,68,0.6)', 'rgba(0,188,212,0.6)'], borderColor: 'var(--surface)', borderWidth: 1 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#90a4ae', boxWidth: 12, font: { size: 9 } } } } }
  });
})();

// ===== COST CHART =====
(function() {
  const ctx = document.getElementById('costChart').getContext('2d');
  const hrs = Array.from({length:24}, (_,i) => i + 'h');
  const cost = [12,11,10.5,10,10.2,10.8,12,14,16,17,16.5,15.8,15.2,15.6,16.0,16.2,16.8,17.5,19.2,21.0,20.0,18.5,16.0,14.0];
  new Chart(ctx, {
    type: 'line', data: {
      labels: hrs,
      datasets: [{ label: 'KZT/kWh', data: cost, borderColor: '#7c4dff', borderWidth: 2, fill: true, backgroundColor: 'rgba(124,77,255,0.1)', tension: 0.4, pointRadius: 0 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { maxTicksLimit: 8 } }, y: { ticks: { callback: v => '₸' + v } } } }
  });
})();

// ===== ANOMALY CHART =====
(function() {
  const ctx = document.getElementById('anomalyChart').getContext('2d');
  const pts = Array.from({length:48}, (_,i) => ({ x: i, y: 0.2 + Math.random() * 0.6 }));
  const anomalies = [12, 28, 35, 41].map(i => ({ x: i, y: 0.85 + Math.random() * 0.1 }));
  new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'Normal', data: pts, backgroundColor: 'rgba(0,229,255,0.4)', pointRadius: 3 },
        { label: 'Anomaly', data: anomalies, backgroundColor: 'rgba(255,23,68,0.8)', pointRadius: 7, pointStyle: 'triangle' }
      ]
    },
    options: { responsive: true, plugins: { legend: { labels: { color: '#90a4ae', boxWidth: 12 } } }, scales: { x: { title: { display: true, text: 'Time (30min)', color: '#607d8b' } }, y: { min: 0, max: 1.1, title: { display: true, text: 'Anomaly Score', color: '#607d8b' } } } }
  });
})();

// ===================== MAP DRAWING =====================
function drawMap() {
  const canvas = document.getElementById('kzMap');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  const W = canvas.offsetWidth, H = canvas.offsetHeight;

  // Kazakhstan bounding box: lon 50-87, lat 40-56
  const LON_MIN = 49, LON_MAX = 88, LAT_MIN = 39.5, LAT_MAX = 56.5;
  function proj(lat, lon) {
    const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
    const y = H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * H;
    return { x, y };
  }

  // Background
  ctx.fillStyle = '#040d1a';
  ctx.fillRect(0, 0, W, H);

  // Draw Kazakhstan border (simplified polygon)
  const border = [
    [55.4, 50.3],[54.7, 51.2],[54.0, 52.8],[53.5, 54.1],[52.6, 53.5],
    [51.8, 51.4],[51.2, 52.5],[50.8, 52.0],[50.3, 51.4],[49.0, 51.8],
    [47.4, 52.2],[46.5, 53.1],[45.8, 53.4],[46.0, 55.7],[46.7, 57.0],
    [47.1, 58.4],[47.9, 59.3],[48.6, 61.2],[49.2, 62.3],[50.8, 60.2],
    [51.1, 61.4],[52.6, 62.0],[53.1, 63.3],[52.6, 64.8],[52.1, 65.7],
    [51.6, 67.5],[51.8, 68.2],[53.3, 68.9],[54.0, 69.1],[55.4, 70.5],
    [55.2, 71.3],[54.7, 72.3],[54.1, 73.2],[53.4, 74.8],[52.0, 75.4],
    [51.9, 75.5],[52.5, 76.0],[52.3, 76.8],[50.2, 77.1],[50.0, 79.5],
    [49.2, 80.5],[48.0, 83.0],[47.3, 85.6],[47.1, 87.0],[46.8, 87.0],
    [45.2, 83.0],[44.3, 80.2],[44.0, 77.8],[43.2, 76.9],[42.8, 76.5],
    [42.3, 75.1],[42.0, 73.1],[41.5, 71.0],[41.0, 69.5],[41.3, 68.0],
    [41.8, 66.5],[42.5, 65.4],[43.5, 64.0],[44.0, 62.2],[44.5, 60.0],
    [45.0, 58.2],[44.8, 56.5],[43.5, 55.0],[42.5, 54.2],[42.3, 52.0],
    [43.0, 51.5],[44.0, 50.3],[45.0, 50.5],[46.5, 49.5],[47.5, 50.2],
    [48.5, 49.8],[50.0, 50.0],[51.5, 49.5],[52.0, 49.8],[53.0, 50.2],
    [54.0, 50.0],[55.0, 50.0],[55.4, 50.3]
  ];
  ctx.beginPath();
  border.forEach(([lat, lon], i) => {
    const p = proj(lat, lon);
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(7,20,40,0.8)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,229,255,0.3)';
  ctx.lineWidth = 1.5; ctx.stroke();

  // Draw transmission lines
  const lines = [
    ['Ekibastuz', 'Kokshetau', '#00e5ff', 2.5, '500kV'],
    ['Ekibastuz', 'Pavlodar', '#00e5ff', 2, '500kV'],
    ['Kokshetau', 'Astana (500kV)', '#00e5ff', 2.5, '500kV'],
    ['Astana (500kV)', 'Karaganda', '#00e5ff', 2.5, '500kV'],
    ['Karaganda', 'Zhambyl (500kV)', '#00e5ff', 2, '500kV'],
    ['Zhambyl (500kV)', 'Almaty (500kV)', '#00e676', 2, '220kV'],
    ['Zhambyl (500kV)', 'Shymkent', '#00e5ff', 2, '500kV'],
    ['Astana (500kV)', 'Aktobe', '#00e676', 1.5, '220kV'],
    ['Pavlodar', 'Semey', '#00e676', 1.5, '220kV'],
    ['Semey', 'Oskemen', '#00e676', 1.5, '220kV'],
    ['Almaty (500kV)', 'Taraz', '#00e676', 1.5, '220kV'],
    ['Taraz', 'Zhambyl (500kV)', '#ffab00', 1.2, '110kV'],
    ['Shymkent', 'Kyzylorda', '#00e676', 1.5, '220kV'],
    ['Kyzylorda', 'Turkestan', '#ffab00', 1.2, '110kV'],
    ['Karaganda', 'Ekibastuz', '#00e5ff', 1.5, '500kV'],
  ];

  const nodeMap = {};
  REGIONS.forEach(r => { nodeMap[r.name] = proj(r.lat, r.lon); });

  lines.forEach(([a, b, color, w, type]) => {
    const p1 = nodeMap[a], p2 = nodeMap[b];
    if (!p1 || !p2) return;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color + '99';
    ctx.lineWidth = w;
    ctx.setLineDash([]);
    ctx.stroke();
  });

  // Animated flow particles
  const particles = [];
  lines.forEach(([a, b, color]) => {
    const p1 = nodeMap[a], p2 = nodeMap[b];
    if (!p1 || !p2) return;
    for (let i = 0; i < 3; i++) {
      particles.push({ p1, p2, color, t: Math.random(), speed: 0.002 + Math.random() * 0.002 });
    }
  });

  function animateParticles() {
    // Clear only particle layer – redraw over
    particles.forEach(p => {
      const x = p.p1.x + (p.p2.x - p.p1.x) * p.t;
      const y = p.p1.y + (p.p2.y - p.p1.y) * p.t;
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
      p.t += p.speed;
      if (p.t > 1) p.t = 0;
    });
  }

  // Draw nodes
  REGIONS.forEach(r => {
    const p = proj(r.lat, r.lon);
    const color = r.status === 'warning' ? '#ffab00' : '#00e5ff';
    const size = r.type === 'HUB' || r.type === 'GEN' ? 10 : 7;

    // Glow
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
    grd.addColorStop(0, color + '44'); grd.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
    ctx.fillStyle = grd; ctx.fill();

    // Outer ring
    ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();

    // Inner fill
    ctx.beginPath(); ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();

    // Label
    ctx.fillStyle = '#e0f2fe';
    ctx.font = 'bold 10px "Space Grotesk"';
    ctx.textAlign = 'left';
    const lx = p.x + size + 4, ly = p.y + 4;
    ctx.shadowColor = '#000'; ctx.shadowBlur = 3;
    ctx.fillText(r.name.split('(')[0].trim(), lx, ly);
    ctx.shadowBlur = 0;
  });

  // Anim loop
  let frameId;
  function loop() {
    // Re-draw static elements aren't cleared, only add particles
    // Clear the whole canvas for clean animation
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#040d1a';
    ctx.fillRect(0, 0, W, H);

    // Kazakhstan border
    ctx.beginPath();
    border.forEach(([lat, lon], i) => {
      const p = proj(lat, lon);
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(7,20,40,0.8)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,229,255,0.3)';
    ctx.lineWidth = 1.5; ctx.stroke();

    // Lines
    lines.forEach(([a, b, color, w]) => {
      const p1 = nodeMap[a], p2 = nodeMap[b];
      if (!p1 || !p2) return;
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = color + '66'; ctx.lineWidth = w; ctx.stroke();
    });

    animateParticles();

    // Re-draw nodes on top
    REGIONS.forEach(r => {
      const p = proj(r.lat, r.lon);
      const color = r.status === 'warning' ? '#ffab00' : '#00e5ff';
      const size = r.type === 'HUB' || r.type === 'GEN' ? 10 : 7;
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
      grd.addColorStop(0, color + '33'); grd.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.fillStyle = '#e0f2fe';
      ctx.font = 'bold 10px "Space Grotesk"';
      ctx.textAlign = 'left';
      ctx.shadowColor = '#000'; ctx.shadowBlur = 3;
      ctx.fillText(r.name.split('(')[0].trim(), p.x + size + 4, p.y + 4);
      ctx.shadowBlur = 0;
    });

    frameId = requestAnimationFrame(loop);
  }
  loop();

  // Click handler for map popup
  canvas.onclick = function(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left);
    const my = (e.clientY - rect.top);
    let found = null;
    REGIONS.forEach(r => {
      const p = proj(r.lat, r.lon);
      const dist = Math.hypot(p.x - mx, p.y - my);
      if (dist < 18) found = r;
    });
    const popup = document.getElementById('mapPopup');
    if (found) {
      popup.style.display = 'block';
      popup.style.left = (e.clientX - rect.left + 15) + 'px';
      popup.style.top = (e.clientY - rect.top - 10) + 'px';
      popup.innerHTML = `<h4>${found.name}</h4>
        <div class="map-popup-row"><span>Type</span><span>${found.type}</span></div>
        <div class="map-popup-row"><span>Load</span><span>${found.load} GW</span></div>
        <div class="map-popup-row"><span>Capacity</span><span>${found.cap} GW</span></div>
        <div class="map-popup-row"><span>Utilization</span><span>${Math.round(found.load/found.cap*100)}%</span></div>
        <div class="map-popup-row"><span>Voltage</span><span>${found.voltage} kV</span></div>
        <div class="map-popup-row"><span>Status</span><span style="color:${found.status==='online'?'#00e676':'#ffab00'}">${found.status.toUpperCase()}</span></div>
        <div class="map-popup-row"><span>Lat/Lon</span><span>${found.lat}°N, ${found.lon}°E</span></div>`;
    } else {
      popup.style.display = 'none';
    }
  };
}

// ===================== CIRCUIT DIAGRAM =====================
function drawCircuit() {
  const canvas = document.getElementById('circuitCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  const W = canvas.offsetWidth, H = canvas.offsetHeight;

  ctx.fillStyle = '#040d1a'; ctx.fillRect(0, 0, W, H);

  // Circuit nodes definition
  const nodes = [
    { id: 'GRES1', label: 'Ekibastuz\nGRES-1\n4000MW', x: 0.08, y: 0.2, type: 'gen', color: '#00e676' },
    { id: 'GRES2', label: 'Ekibastuz\nGRES-2\n1000MW', x: 0.08, y: 0.55, type: 'gen', color: '#00e676' },
    { id: 'EKIB', label: 'Ekibastuz\n1150→500kV', x: 0.22, y: 0.35, type: 'sub500', color: '#00e5ff' },
    { id: 'PAVL', label: 'Pavlodar\n220kV', x: 0.28, y: 0.15, type: 'sub220', color: '#ffab00' },
    { id: 'SEMI', label: 'Semey\n220kV', x: 0.42, y: 0.15, type: 'sub220', color: '#ffab00' },
    { id: 'OSKE', label: 'Oskemen\n220kV', x: 0.55, y: 0.15, type: 'sub220', color: '#ffab00' },
    { id: 'KOKS', label: 'Kokshetau\n500kV', x: 0.35, y: 0.35, type: 'sub500', color: '#00e5ff' },
    { id: 'ASTA', label: 'Astana\n500kV\nDigital', x: 0.50, y: 0.35, type: 'sub500', color: '#00e5ff' },
    { id: 'KARA', label: 'Karaganda\n500kV', x: 0.50, y: 0.55, type: 'sub500', color: '#00e5ff' },
    { id: 'KOST', label: 'Kostanay\n220kV', x: 0.35, y: 0.55, type: 'sub220', color: '#ffab00' },
    { id: 'AKTO', label: 'Aktobe\n220kV', x: 0.22, y: 0.72, type: 'sub220', color: '#ffab00' },
    { id: 'ATYR', label: 'Atyrau\n(Island)', x: 0.10, y: 0.85, type: 'sub220', color: '#7c4dff' },
    { id: 'ZHEZK', label: 'Zhezkazgan\n220kV', x: 0.38, y: 0.72, type: 'sub220', color: '#ffab00' },
    { id: 'ZHAMBYL', label: 'Zhambyl\n500kV\n⚠94%', x: 0.55, y: 0.72, type: 'sub500', color: '#ffab00' },
    { id: 'ALMAT', label: 'Almaty\n500kV', x: 0.70, y: 0.75, type: 'sub500', color: '#00e5ff' },
    { id: 'SHYM', label: 'Shymkent\n500kV', x: 0.45, y: 0.88, type: 'sub500', color: '#00e5ff' },
    { id: 'KYZL', label: 'Kyzylorda\n220kV', x: 0.30, y: 0.88, type: 'sub220', color: '#ffab00' },
    { id: 'KAPCH', label: 'Kapchagay\nHPP 364MW', x: 0.82, y: 0.62, type: 'gen', color: '#00e676' },
    { id: 'WIND', label: 'Zhongar\nWind 187MW', x: 0.85, y: 0.82, type: 'ren', color: '#00bcd4' },
    { id: 'RUSSIA', label: 'Russia\nImport\n480MW', x: 0.72, y: 0.08, type: 'ext', color: '#7c4dff' },
    { id: 'UZB', label: 'Uzbekistan\n10MW', x: 0.28, y: 0.97, type: 'ext', color: '#7c4dff' },
  ];

  const edges = [
    ['GRES1','EKIB','#00e676',2,'gen'], ['GRES2','EKIB','#00e676',2,'gen'],
    ['EKIB','KOKS','#00e5ff',3,'500kV'], ['EKIB','PAVL','#ffab00',1.5,'220kV'],
    ['PAVL','SEMI','#ffab00',1.5,'220kV'], ['SEMI','OSKE','#ffab00',1.5,'220kV'],
    ['KOKS','ASTA','#00e5ff',3,'500kV'], ['ASTA','KARA','#00e5ff',2.5,'500kV'],
    ['KOKS','KOST','#ffab00',1.5,'220kV'], ['KOST','AKTO','#ffab00',1.5,'220kV'],
    ['AKTO','ATYR','#7c4dff',1.5,'iso'],
    ['KARA','ZHEZK','#ffab00',1.5,'220kV'], ['KARA','ZHAMBYL','#00e5ff',2.5,'500kV'],
    ['ZHAMBYL','ALMAT','#00e676',2,'220kV'], ['ZHAMBYL','SHYM','#00e5ff',2.5,'500kV'],
    ['ALMAT','KAPCH','#00e676',2,'gen'], ['ALMAT','WIND','#00bcd4',1.5,'wind'],
    ['SHYM','KYZL','#ffab00',1.5,'220kV'], ['KYZL','UZB','#7c4dff',1.2,'ext'],
    ['RUSSIA','ASTA','#7c4dff',2,'import'],
  ];

  function px(node) { return { x: node.x * W, y: node.y * H }; }

  const nodeMap2 = {};
  nodes.forEach(n => { nodeMap2[n.id] = n; });

  // Draw edges
  edges.forEach(([a, b, color, w]) => {
    const n1 = nodeMap2[a], n2 = nodeMap2[b];
    const p1 = px(n1), p2 = px(n2);
    ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = color + 'aa'; ctx.lineWidth = w; ctx.setLineDash([]);
    ctx.stroke();

    // Circuit breaker symbol (midpoint rectangle)
    const mx2 = (p1.x + p2.x) / 2, my2 = (p1.y + p2.y) / 2;
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);
    if (len > 50 && a !== 'RUSSIA' && a !== 'UZB') {
      ctx.save();
      ctx.translate(mx2, my2);
      ctx.rotate(Math.atan2(dy, dx));
      ctx.strokeStyle = '#ff1744aa'; ctx.lineWidth = 1;
      ctx.strokeRect(-6, -4, 12, 8);
      ctx.restore();
    }
  });

  // Draw nodes
  nodes.forEach(n => {
    const p = px(n);
    ctx.save();

    if (n.type === 'sub500') {
      // Circle for 500kV substation
      const r = 18;
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
      grd.addColorStop(0, n.color + '33'); grd.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#071428'; ctx.fill();
      ctx.strokeStyle = n.color; ctx.lineWidth = 2.5; ctx.stroke();
      // Inner dot
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = n.color; ctx.fill();

    } else if (n.type === 'sub220') {
      // Square for 220kV
      const s = 12;
      ctx.fillStyle = '#071428';
      ctx.strokeStyle = n.color; ctx.lineWidth = 1.5;
      ctx.strokeRect(p.x - s, p.y - s, s * 2, s * 2);
      ctx.fillRect(p.x - s, p.y - s, s * 2, s * 2);
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = n.color; ctx.fill();

    } else if (n.type === 'gen') {
      // Generator circle with G
      const r = 16;
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#071428'; ctx.fill();
      ctx.strokeStyle = n.color; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = n.color; ctx.font = 'bold 12px "JetBrains Mono"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('G', p.x, p.y);

    } else if (n.type === 'ren') {
      // Wind symbol
      const r = 14;
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#071428'; ctx.fill();
      ctx.strokeStyle = n.color; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = n.color; ctx.font = 'bold 12px "JetBrains Mono"';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('W', p.x, p.y);

    } else if (n.type === 'ext') {
      // Diamond
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - 14); ctx.lineTo(p.x + 12, p.y);
      ctx.lineTo(p.x, p.y + 14); ctx.lineTo(p.x - 12, p.y);
      ctx.closePath();
      ctx.fillStyle = '#071428'; ctx.fill();
      ctx.strokeStyle = n.color; ctx.lineWidth = 2; ctx.stroke();
    }

    // Label
    const lines2 = n.label.split('\n');
    ctx.fillStyle = '#cfd8dc'; ctx.font = '9px "Space Grotesk"';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.shadowColor = '#000'; ctx.shadowBlur = 4;
    const labelY = p.y + (n.type === 'sub500' ? 22 : n.type === 'gen' ? 20 : 16);
    lines2.forEach((line, li) => {
      ctx.fillStyle = li === 0 ? '#e0f2fe' : (line.includes('⚠') ? '#ffab00' : '#90a4ae');
      ctx.font = li === 0 ? 'bold 9px "Space Grotesk"' : '8px "Space Grotesk"';
      ctx.fillText(line, p.x, labelY + li * 10);
    });
    ctx.shadowBlur = 0;
    ctx.restore();
  });

  // Legend title
  ctx.fillStyle = '#00e5ff88'; ctx.font = '11px "JetBrains Mono"';
  ctx.textAlign = 'right';
  ctx.fillText('Kazakhstan 500/220kV Backbone — Single-Line Diagram', W - 12, H - 12);

  // Click handler
  canvas.onclick = function(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    let found = null;
    nodes.forEach(n => {
      const p = px(n);
      if (Math.hypot(p.x - mx, p.y - my) < 24) found = n;
    });
    const info = document.getElementById('selectedNodeInfo');
    if (found) {
      const reg = REGIONS.find(r => r.name.toLowerCase().includes(found.id.toLowerCase().slice(0,4))) || {};
      info.innerHTML = `<div style="color:var(--accent-cyan);font-weight:600;margin-bottom:8px">${found.label.replace(/\n/g,' — ')}</div>
        <div style="color:var(--text-mid)">Node ID: <span style="color:var(--text)">${found.id}</span></div>
        <div style="color:var(--text-mid)">Type: <span style="color:var(--text)">${found.type.toUpperCase()}</span></div>
        ${reg.voltage ? `<div style="color:var(--text-mid)">Voltage: <span style="color:var(--text)">${reg.voltage} kV</span></div>` : ''}
        ${reg.load ? `<div style="color:var(--text-mid)">Load: <span style="color:var(--text)">${reg.load} GW</span></div>` : ''}
        ${reg.lat ? `<div style="color:var(--text-mid)">Location: <span style="color:var(--text)">${reg.lat}°N, ${reg.lon}°E</span></div>` : ''}`;
    }
  };
}

// ===================== HEATMAP =====================
function drawHeatmap() {
  const canvas = document.getElementById('heatmapCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const regions2 = ['North', 'South', 'East', 'West', 'Astana', 'Almaty', 'Karaganda', 'Shymkent'];
  const hours2 = ['00','03','06','09','12','15','18','21'];
  const cellW = (W - 60) / hours2.length, cellH = (H - 20) / regions2.length;

  function stressColor(v) {
    if (v < 0.4) return `rgba(0,230,118,${0.4 + v * 0.8})`;
    if (v < 0.65) return `rgba(255,171,0,${0.4 + v * 0.6})`;
    return `rgba(255,23,68,${0.4 + v * 0.6})`;
  }

  ctx.fillStyle = '#040d1a'; ctx.fillRect(0, 0, W, H);
  ctx.font = '9px "JetBrains Mono"';

  regions2.forEach((reg, ri) => {
    ctx.fillStyle = '#90a4ae'; ctx.textAlign = 'right';
    ctx.fillText(reg, 56, ri * cellH + cellH / 2 + 4);
    hours2.forEach((hr, hi) => {
      const v = 0.2 + Math.sin((hi + ri) * 0.7) * 0.25 + Math.random() * 0.15 + (hi === 6 || hi === 7 ? 0.3 : 0);
      ctx.fillStyle = stressColor(Math.min(1, v));
      ctx.fillRect(60 + hi * cellW + 1, ri * cellH + 1, cellW - 2, cellH - 2);
    });
  });
  hours2.forEach((hr, hi) => {
    ctx.fillStyle = '#607d8b'; ctx.textAlign = 'center';
    ctx.fillText(hr + 'h', 60 + hi * cellW + cellW / 2, H - 2);
  });
}

// ===================== REAL-TIME KPI UPDATE =====================
setInterval(() => {
  const genVal = (14.5 + Math.random() * 0.6).toFixed(2);
  const loadVal = (15.1 + Math.random() * 0.4).toFixed(2);
  const renVal = (13.8 + Math.random() * 0.8).toFixed(1);
  const stress = Math.round(65 + Math.random() * 8);

  document.getElementById('kpi-gen').innerHTML = genVal + '<span class="kpi-unit">GW</span>';
  document.getElementById('kpi-load').innerHTML = loadVal + '<span class="kpi-unit">GW</span>';
  document.getElementById('kpi-ren').innerHTML = renVal + '<span class="kpi-unit">%</span>';
  document.getElementById('kpi-stress').innerHTML = stress + '<span class="kpi-unit">/100</span>';
  document.getElementById('kpi-gen-d').textContent = `↑ +${(Math.random() * 0.5).toFixed(1)}% vs 1hr ago`;
}, 5000);

// ===================== INIT =====================
// Pre-draw static stuff
drawMap();
setTimeout(drawCircuit, 100);
setTimeout(drawHeatmap, 200);