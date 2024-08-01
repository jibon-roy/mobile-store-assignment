/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-red": "#ff00d3"
      },
      container: {
        center: "true",
        screens: {
          "3xl": "1600px" 
        }
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
}