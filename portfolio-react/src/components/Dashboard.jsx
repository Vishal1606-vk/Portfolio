import { useRef, useState } from "react";

// Mini Power BI style dashboard with sample data. Move the cursor across it:
// the SQL WHERE clause, the KPIs and the trend line all filter to the region you point at.
const DATA = {
  North: { t: [42, 48, 51, 47, 58, 63], m: 18 },
  South: { t: [35, 38, 44, 49, 46, 55], m: 22 },
  East: { t: [58, 61, 57, 66, 72, 78], m: 16 },
  West: { t: [30, 34, 39, 41, 45, 52], m: 25 },
  Central: { t: [26, 29, 28, 33, 37, 40], m: 20 },
};
const REGIONS = Object.keys(DATA);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const sum = (a) => a.reduce((x, y) => x + y, 0);

function stats(sel) {
  const rs = sel ? [sel] : REGIONS;
  const t = MONTHS.map((_, i) => sum(rs.map((r) => DATA[r].t[i])));
  const rev = sum(t);
  return { t, rev, margin: sum(rs.map((r) => sum(DATA[r].t) * DATA[r].m)) / rev, growth: ((t[5] - t[0]) / t[0]) * 100 };
}

const css = `
.dash{padding:16px;display:grid;gap:14px}
.dash .top{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:.82rem;color:var(--muted)}
.dash .dots{display:flex;gap:6px}.dash .dots i{width:9px;height:9px;border-radius:50%;background:var(--line)}
.dash .dots i:first-child{background:var(--pink)}.dash .dots i:nth-child(2){background:var(--violet)}.dash .dots i:nth-child(3){background:var(--cyan)}
.sql{margin:0;padding:12px 14px;border-radius:10px;background:var(--field);border:1px solid var(--line);font-size:.8rem;line-height:1.55;color:var(--soft);overflow-x:auto}
.sql .k{color:var(--violet);font-weight:500}
.sql mark{background:color-mix(in srgb,var(--cyan) 22%,transparent);color:var(--ink);padding:0 4px;border-radius:4px}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.kpi{padding:10px 12px;border-radius:10px;background:var(--field);border:1px solid var(--line)}
.kpi small{display:block;color:var(--muted);font-size:.72rem}
.kpi b{font-size:1.25rem;color:var(--ink)}
.charts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.charts svg{display:block;width:100%;height:auto;touch-action:none}
.charts .cap{font-size:.72rem;color:var(--muted);margin:0 0 4px}
.bar{fill:var(--cyan);opacity:.4;transition:opacity .2s}
.bar.on{opacity:1;filter:drop-shadow(0 0 6px var(--cyan))}
.lab{fill:var(--muted);font-size:9px;font-family:"IBM Plex Mono",monospace}
.tip{fill:var(--ink);font-size:10px;font-weight:700;font-family:"IBM Plex Mono",monospace}
.tl-line{fill:none;stroke:var(--violet);stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 5px var(--violet))}
.tl-dot{fill:var(--bg);stroke:var(--violet);stroke-width:2}
.hint{margin:0;font-size:.75rem;color:var(--muted)}
@media (max-width:520px){.charts{grid-template-columns:1fr}}
`;

export default function Dashboard() {
  const [sel, setSel] = useState(null);
  const barsRef = useRef(null);
  const s = stats(sel);
  const totals = REGIONS.map((r) => sum(DATA[r].t));
  const maxT = Math.max(...totals);
  const lo = Math.min(...s.t), hi = Math.max(...s.t);
  const pts = s.t.map((v, i) => [10 + i * 36, 85 - ((v - lo) / (hi - lo || 1)) * 62]);

  const onMove = (e) => {
    const r = barsRef.current.getBoundingClientRect();
    const f = (e.clientX - r.left) / r.width;
    setSel(REGIONS[Math.min(4, Math.max(0, Math.floor(f * 5)))]);
  };

  return (
    <>
      <style>{css}</style>
      <div className="dash glass" onPointerMove={onMove} onPointerLeave={() => setSel(null)}>
        <div className="top">
          <div className="dots"><i /><i /><i /></div>
          <span className="mono">Sales dashboard · sample data</span>
        </div>
        <pre className="sql mono">
          <span className="k">SELECT</span> month, <span className="k">SUM</span>(revenue){"\n"}
          <span className="k">FROM</span> sales{"\n"}
          <span className="k">WHERE</span> {sel ? <mark>region = '{sel}'</mark> : "region IS NOT NULL"}{"\n"}
          <span className="k">GROUP BY</span> month;
        </pre>
        <div className="kpis">
          <div className="kpi"><small>Revenue</small><b>{s.rev}K</b></div>
          <div className="kpi"><small>Profit margin</small><b>{s.margin.toFixed(1)}%</b></div>
          <div className="kpi"><small>Growth Jan-Jun</small><b>+{s.growth.toFixed(0)}%</b></div>
        </div>
        <div className="charts">
          <div ref={barsRef}>
            <p className="cap">Revenue by region</p>
            <svg viewBox="0 0 200 110" role="img" aria-label="Revenue by region bar chart">
              {REGIONS.map((r, i) => {
                const h = (totals[i] / maxT) * 66, x = 10 + i * 38;
                return (
                  <g key={r}>
                    <rect className={"bar" + (sel === r || !sel ? " on" : "")} style={!sel ? { opacity: 0.85, filter: "none" } : undefined} x={x} y={88 - h} width="28" height={h} rx="4" />
                    <text className="lab" x={x + 14} y="102" textAnchor="middle">{r.slice(0, 3)}</text>
                    {sel === r && <text className="tip" x={x + 14} y={82 - h} textAnchor="middle">{totals[i]}K</text>}
                  </g>
                );
              })}
            </svg>
          </div>
          <div>
            <p className="cap">Monthly trend{sel ? " · " + sel : " · all regions"}</p>
            <svg viewBox="0 0 200 110" role="img" aria-label="Monthly revenue trend">
              <polyline className="tl-line" points={pts.map((p) => p.join(",")).join(" ")} />
              {pts.map(([x, y], i) => <circle key={i} className="tl-dot" cx={x} cy={y} r="3.5" />)}
              {MONTHS.map((m, i) => <text key={m} className="lab" x={10 + i * 36} y="102" textAnchor="middle">{m}</text>)}
            </svg>
          </div>
        </div>
        <p className="hint">Move your cursor over the dashboard to filter it.</p>
      </div>
    </>
  );
}
