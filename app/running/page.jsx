import { SITE_URL } from "@/lib/data";
import StravaRuns from "@/components/StravaRuns";

export const metadata = {
  title: "Running",
  description: "Shohbaxt's running stats and recent activities tracked via Strava.",
  alternates: { canonical: `${SITE_URL}/running` },
};

export default function RunningPage() {
  return (
    <div>
      <h2 className="section-title">
        Running
        <span className="text-small" style={{ fontWeight: "normal", color: "var(--faint)", marginLeft: "8px" }}>
          via Strava
        </span>
      </h2>
      <StravaRuns />
    </div>
  );
}
