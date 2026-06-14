import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Turtle — 자세 교정",
    short_name: "Turtle",
    description: "이중 관심 자세교정 · 거북이에서 사람으로",
    start_url: "/home",
    display: "standalone",
    background_color: "#b0e0e6",
    theme_color: "#e97451",
    icons: [
      {
        src: "/app_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
