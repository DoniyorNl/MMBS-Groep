import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MMBS Groep — Experts in Geveloplossingen Utrecht";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "64px 72px",
          fontFamily: '"SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Top: logo + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.03em", color: "#0a0a0a" }}>
            MMBS Groep<span style={{ color: "#0a0a0a" }}>.</span>
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "999px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#f7f7f7",
              padding: "6px 14px",
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0a0a0a" }} />
            <span style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", color: "#555", textTransform: "uppercase" }}>
              Utrecht, Nederland
            </span>
          </div>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px" }}>
          <div style={{ fontSize: "72px", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#0a0a0a" }}>
            Experts in gevels.
          </div>
          <p style={{ fontSize: "24px", color: "#555555", lineHeight: 1.5, margin: 0 }}>
            Metselwerk · Gevelrenovatie · Monumentale restauratie · Isolatie · Steigerbouw
          </p>
        </div>

        {/* Bottom: stats bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
            borderTop: "1px solid #e0e0e0",
            paddingTop: "32px",
            width: "100%",
          }}
        >
          {[
            { value: "20+", label: "Jaar ervaring" },
            { value: "1500+", label: "Projecten" },
            { value: "100+", label: "Specialisten" },
            { value: "500+", label: "Tevreden klanten" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                flex: 1,
                borderRight: i < 3 ? "1px solid #e0e0e0" : "none",
                paddingRight: "32px",
                paddingLeft: i > 0 ? "32px" : "0",
              }}
            >
              <span style={{ fontSize: "32px", fontWeight: 900, color: "#0a0a0a" }}>{stat.value}</span>
              <span style={{ fontSize: "13px", color: "#999", fontWeight: 500 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
