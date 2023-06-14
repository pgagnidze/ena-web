/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "65vh": "65vh",
      },
      colors: {
        nord0: "#2E3440",
        nord1: "#3B4252",
        nord2: "#434C5E",
        nord3: "#4C566A",
        nord4: "#D8DEE9",
        nord5: "#E5E9F0",
        'nord6-100': "#ECEFF4",
        'nord6-200': "#cdd0d4",
        nord7: "#8FBCBB",
        nord8: "#88C0D0",
        'nord9-100': "#81A1C1",
        'nord9-200': "#6f8ba7",
        nord10: "#5E81AC",
        nord11: "#BF616A",
        nord12: "#D08770",
        nord13: "#EBCB8B",
        "nord14-100": "#A3BE8C",
        "nord14-200": "#92ab7e",
        nord15: "#B48EAD",
      },
    },
  },
  plugins: [],
};
