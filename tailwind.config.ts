import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom Playful Professional Palette
        play: {
          blue: {
            light: "#E0F2FE", // sky-100
            DEFAULT: "#0EA5E9", // sky-500
            dark: "#0284C7", // sky-600
          },
          mint: {
            light: "#ECFDF5", // emerald-50
            DEFAULT: "#10B981", // emerald-500
            dark: "#059669", // emerald-600
          },
          orange: {
            light: "#FFF7ED", // orange-50
            DEFAULT: "#FB923C", // orange-400
            dark: "#F97316", // orange-500
          },
          pink: {
            DEFAULT: "#F472B6", // pink-400
          },
          purple: {
            DEFAULT: "#A855F7", // purple-500
          }
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
