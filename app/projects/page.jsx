import { SITE_DATA, SITE_URL } from "@/lib/data";
import ProjectLink from "./ProjectLink";

export const metadata = {
  title: "Projects",
  description:
    "Projects by Shohbaxt Axmedov — Tripz hiking platform, Coffee.Co loyalty system, fotografinya.uz, Gilamchi inventory management, and more.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Projects | Shohbaxt Axmedov",
    description: "Web development projects by Shohbaxt — React, Next.js, Node.js apps.",
    url: `${SITE_URL}/projects`,
  },
};

function StatusBadge({ status }) {
  const map = {
    active: { label: "\u25CF active", className: "status-active" },
    building: { label: "\u25D4 building", className: "status-building" },
    "in reconstruction": { label: "\u25CF revamping", className: "status-reconstruction" },
  };
  const s = map[status] || map.active;
  return <span className={s.className}>{s.label}</span>;
}

export default function ProjectsPage() {
  return (
    <div>
      <h2 className="section-title">Projects</h2>

      {/* Mobile cards */}
      <div className="hide-desktop">
        {SITE_DATA.projects.map((p, i) => (
          <div key={i} className="mini-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <ProjectLink url={p.url} style={{ fontSize: "13px", fontWeight: "bold" }}>{p.name}</ProjectLink>
              <StatusBadge status={p.status} />
            </div>
            <p style={{ fontSize: "12px", margin: "4px 0 6px 0" }}>{p.desc}</p>
            <div>
              {p.tech.split(", ").map((t, j) => <span key={j} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="data-table hide-mobile">
        <thead>
          <tr>
            <th>Project</th>
            <th>Description</th>
            <th>Tech</th>
            <th style={{ width: "60px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {SITE_DATA.projects.map((p, i) => (
            <tr key={i}>
              <td><ProjectLink url={p.url}>{p.name}</ProjectLink></td>
              <td>{p.desc}</td>
              <td className="text-small text-muted">{p.tech}</td>
              <td style={{ whiteSpace: "nowrap" }}><StatusBadge status={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-small text-faint">
        More projects on <a href={`https://${SITE_DATA.github}`} target="_blank" rel="noopener noreferrer">my GitHub</a>. Some repos are private.
      </p>
    </div>
  );
}
