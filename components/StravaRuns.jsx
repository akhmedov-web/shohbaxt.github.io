"use client";

import { useState, useEffect } from "react";

export default function StravaRuns() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/strava-data.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ color: "var(--muted)", padding: "20px 0" }}>Loading...</p>;
  }

  if (!data) {
    return <p style={{ color: "var(--muted)" }}>No running data available yet.</p>;
  }

  const { totalRuns, totalKm, recentKm, recentRuns, updated } = data;

  return (
    <>
      <div style={{ marginBottom: "12px" }}>
        <div className="stat-box">
          <span className="stat-number">{recentKm}</span>
          <span className="stat-label">km last 4 weeks</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{totalKm}</span>
          <span className="stat-label">km all time</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{totalRuns}</span>
          <span className="stat-label">total runs</span>
        </div>
      </div>

      <h3 style={{ fontSize: "13px", margin: "10px 0 6px 0" }}>Recent Activities</h3>

      {/* Mobile cards */}
      <div className="hide-desktop">
        {recentRuns.map((r, i) => (
          <div key={i} className="mini-card">
            <div style={{ fontWeight: "bold", fontSize: "13px" }}>{r.name}</div>
            <div className="text-small" style={{ marginTop: "2px", display: "flex", gap: "12px" }}>
              <span><strong>{r.distance}</strong></span>
              <span>{r.pace}</span>
              <span style={{ color: "var(--faint)" }}>{r.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="data-table hide-mobile">
        <thead>
          <tr>
            <th>Run</th>
            <th>Distance</th>
            <th>Pace</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {recentRuns.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td style={{ fontWeight: "bold" }}>{r.distance}</td>
              <td>{r.pace}</td>
              <td className="text-small">{r.elapsed}</td>
              <td className="text-small" style={{ color: "var(--faint)", whiteSpace: "nowrap" }}>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {updated && (
        <p className="text-small" style={{ color: "var(--faint)", marginTop: "4px" }}>
          Last updated: {new Date(updated).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      )}
    </>
  );
}
