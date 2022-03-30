module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2B4162",
        secondary: "#4D7EA8",
        gold: "#D4AF37",
        "black-coffee": "#322A26",
        bone: "#E0DDCF",
      },
    },
    keyframes: {
      expand: {
        "0%": { transform: "scale(0.8)" },
        "25%": { transform: "scale(1.33)" },
      },
    },
    animation: {
      expand: "expand 1s ease-in-out infinite",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
  },
  plugins: [],
};
