/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0df259",
        "primary-dark": "#0ab843",
        "background-light": "#f5f8f6",
        "background-dark": "#102216",
        "neutral-dark": "#111813",
        "neutral-mid": "#4b5563",
        "secondary-blue": "#1cb0f6",
        "secondary-blue-dark": "#1480b3",
        "secondary-orange": "#ff9600",
        "secondary-orange-dark": "#cc7800",
        "secondary-purple": "#ce82ff",
        "secondary-purple-dark": "#a568cc",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2e22",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        full: "9999px",
      },
      boxShadow: {
        "3d": "0px 4px 0px 0px #0ab843",
        "3d-hover": "0px 2px 0px 0px #0ab843",
        "3d-secondary": "0px 4px 0px 0px #e5e7eb",
        "3d-secondary-hover": "0px 2px 0px 0px #e5e7eb",
        btn: "0 4px 0 0 #0ab843",
        "btn-hover": "0 2px 0 0 #0ab843",
        card: "0 4px 0 0 #e5e7eb",
        skill: "0 6px 0 0 #e5e7eb",
        floating: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
};