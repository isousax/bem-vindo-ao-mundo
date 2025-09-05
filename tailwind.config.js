/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          600: "#DB2777",
          700: "#BE185D",
        },
        purple: {
          700: "#6B21A8",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        anton: ["Anton", "sans-serif"],
        borel: ["Borel", "sans-serif"],
        comicRelief: ['"Comic Relief"', "cursive"],
        eduNSWACTHandPre: ['"Edu NSW ACT Hand Pre"', "cursive"],
        lilitaOne: ['"Lilita One"', "cursive"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        floatingBg: "floatingBg 120s linear infinite",
        float: "float 2s ease-in-out infinite",
      },
      keyframes: {
        floatingBg: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(0, -100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
