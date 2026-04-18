import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zavia-AI — Enterprise AI Systems, Engineered";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #020203 0%, #0a0a0c 50%, #020203 100%)",
          fontFamily: "system-ui",
          color: "#EDEDEF",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#6872D6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 700,
              color: "white",
            }}
          >
            Z
          </div>
          <span style={{ fontSize: "24px", fontWeight: 600 }}>Zavia-AI</span>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Enterprise AI systems, engineered.
        </div>
        <div style={{ fontSize: "22px", color: "#8A8F98", textAlign: "center", maxWidth: "700px" }}>
          Production-grade Claude-powered systems for enterprises across the GCC
        </div>
      </div>
    ),
    { ...size }
  );
}
