import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1f4d2b 0%, #3f7a46 100%)",
          color: "#f7f2e8",
          fontSize: 256,
          fontWeight: 800,
          letterSpacing: "-0.08em",
        }}
      >
        J
      </div>
    ),
    size,
  );
}