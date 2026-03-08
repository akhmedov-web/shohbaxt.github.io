import Link from "next/link";

const homeLinks = [
  { href: "/projects", icon: "\u25BA", label: "Projects", desc: "Tripz, Coffee.Co, and more" },
  { href: "/articles", icon: "\u25BA", label: "Articles", desc: "Weekly digests and hiking stories" },
  { href: "/now-playing", icon: "\u266B", label: "Liked Songs", desc: "My recent favorite tracks on Spotify" },
  { href: "/running", icon: "\u25BA", label: "Runs", desc: "Stats via Strava" },
  { href: "/movies", icon: "\u25BA", label: "Movie Log", desc: "What I've been watching" },
  { href: "/places", icon: "\u25B2", label: "Hikes", desc: "My hiking activity from weekends" },
];

export default function HomePage() {
  return (
    <div>
      <h2 className="section-title">About me</h2>
      <p style={{ fontSize: "14px", color: "var(--muted)", margin: "0 0 20px 0", lineHeight: "1.7" }}>
        Hey — I&apos;m a software engineering student at Turin Polytechnic University in Tashkent.<br />
        Mostly building web stuff with JavaScript.
      </p>

      <div className="mini-card" style={{ maxWidth: "420px" }}>
        <div className="text-xs text-faint" style={{ marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          What&apos;s on this site
        </div>
        {homeLinks.map((item, i) => (
          <div key={i} className="home-nav-item">
            <span className="icon">{item.icon}</span>
            <Link href={item.href}>{item.label}</Link>
            <span className="desc">— {item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
