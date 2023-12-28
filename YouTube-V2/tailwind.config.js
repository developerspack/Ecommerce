/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // screens: {
    //   mobile: "750px",
    //   tablet: "640px",
    //   // => @media (min-width: 640px) { ... }

    //   laptop: "1200px",
    //   // => @media (min-width: 1024px) { ... }

    //   desktop: "2000px",
    //   // => @media (min-width: 1280px) { ... }
    // },

    extend: {
      colors: {
        secondaryDark: "#212121",
        light: "#fafafa",
        dark: "#0f0f0f",
        darkBorder: "#646464",
        lightBorder: "#e5e5e5",
        lightHover: "#F2F2F2",
        hover: "#363535",
        darkActive: "#272727",
        darkHover: "#4F4F4F",
        cardHover: "#3f3f3f",
        lightActive: "#F2F2F2",
        darkUpload: "#282828",
        UploadCircle: "#1f1f1f",
        UploadText: "#909090",
        VideoText: "#aaa",
        UploadBlue: "#3EA6FF",
        line: "#D9D9D9",
        loadingDark: "#797979",
        loadingLight: "#cccc",
        text: "#7f7f7f",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
