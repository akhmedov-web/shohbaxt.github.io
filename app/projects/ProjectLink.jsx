"use client";
import { useState } from "react";

export default function ProjectLink({ url, children, style }) {
  const [show, setShow] = useState(false);

  if (url && url !== "#") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" style={style}>
        {children}
      </a>
    );
  }

  return (
    <span
      style={{ position: "relative", display: "inline-block", ...style }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow((s) => !s)}
    >
      <span style={{ color: "var(--link)", cursor: "help", textDecoration: "underline", textDecorationStyle: "dashed" }}>
        {children}
      </span>
      {show && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 4px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            padding: "3px 8px",
            fontSize: "10px",
            color: "var(--faint)",
            fontStyle: "italic",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          still under construction...
        </span>
      )}
    </span>
  );
}
