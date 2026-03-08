import { SITE_DATA, SITE_URL } from "@/lib/data";

export const metadata = {
  title: "Places",
  description: "Mountains, waterfalls, and trails Shohbaxt has visited around Tashkent — Chimgan, Beldersay, Charvak and more.",
  alternates: { canonical: `${SITE_URL}/places` },
};

const typeLabels = ["peak", "waterfall", "lake", "canyon"];

export default function PlacesPage() {
  return (
    <div>
      <h2 className="section-title">
        Recently hiked places
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          via Tripz
        </span>
      </h2>
      <div style={{ marginBottom: "10px", fontSize: "11px" }}>
        {typeLabels.map((type) => (
          <span key={type} style={{ marginRight: "12px" }}>
            <span className={`marker marker-${type}`} /> {type}
          </span>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="hide-desktop">
        {SITE_DATA.recentPlaces.map((p, i) => (
          <div key={i} className="mini-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                <span className={`marker marker-${p.type}`} />
                {p.name}
              </span>
              <span className="text-small" style={{ color: "var(--faint)" }}>{p.date}</span>
            </div>
            <div className="text-small" style={{ marginTop: "2px", color: "var(--muted)" }}>
              {p.type} &middot; <span className="font-mono">{p.elevation}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="data-table hide-mobile">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Elevation</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {SITE_DATA.recentPlaces.map((p, i) => (
            <tr key={i}>
              <td>
                <span className={`marker marker-${p.type}`} />
                {p.name}
              </td>
              <td className="text-small">{p.type}</td>
              <td className="font-mono">{p.elevation}</td>
              <td className="text-small" style={{ color: "var(--faint)" }}>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-small" style={{ color: "var(--faint)" }}>
        Last updated:{" "}
        {new Date(SITE_DATA.recentPlaces[0].date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
