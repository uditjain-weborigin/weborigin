import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Web Origin — Digital Studio for Ambitious Brands";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#050508",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(57,255,20,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "48px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#39ff14",
          }}
        />
        <span
          style={{
            color: "#f0ede8",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Web Origin
        </span>
      </div>

      {/* Main headline */}
      <div
        style={{
          fontSize: "72px",
          fontWeight: 800,
          color: "#f0ede8",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          marginBottom: "28px",
          maxWidth: "900px",
        }}
      >
        We Build Websites <span style={{ color: "#39ff14" }}>That Win.</span>
      </div>

      {/* Subtext */}
      <div
        style={{
          fontSize: "22px",
          color: "#8a8795",
          lineHeight: 1.5,
          maxWidth: "700px",
          marginBottom: "56px",
        }}
      >
        Full-service digital studio — strategy, design &amp; development for
        ambitious brands.
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "48px" }}>
        {[
          { value: "120+", label: "Projects Shipped" },
          { value: "96/100", label: "Lighthouse Score" },
          { value: "91%", label: "Client Retention" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#39ff14",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </span>
            <span style={{ fontSize: "14px", color: "#8a8795" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom domain */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          right: "80px",
          fontSize: "16px",
          color: "#8a8795",
        }}
      >
        theweborigin.com
      </div>
    </div>,
    { ...size },
  );
}
