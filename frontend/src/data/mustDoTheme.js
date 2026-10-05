// Visual theme for each Must Do item, matched by slug from the API.
// Colours are dark enough to pass WCAG AA contrast on white.
export const mustDoTheme = {
  dvv: { icon: "🏛️", color: "#1f5f99", tint: "#e3eef8" },
  "police-residence-permit": { icon: "🛂", color: "#5b3f99", tint: "#ece6f7" },
  "bank-account": { icon: "🏦", color: "#1d7a4d", tint: "#e2f3ea" },
  hsl: { icon: "🚋", color: "#0a6e8a", tint: "#dff1f5" },
  tuudo: { icon: "📱", color: "#b0451a", tint: "#fbe9df" },
  housing: { icon: "🏠", color: "#8a5a00", tint: "#f8eed8" },
};

const fallback = { icon: "✅", color: "#172b42", tint: "#ece7df" };

export function themeFor(slug) {
  return mustDoTheme[slug] ?? fallback;
}
