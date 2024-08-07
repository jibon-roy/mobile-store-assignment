/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-red": "#ff00d3",
        border: "#D2D4D7",
      },
      container: {
        center: "true",
        screens: {
          "3xl": "1600px",
        },
        padding: {
          DEFAULT: "8px",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
