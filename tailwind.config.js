/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html, js, ts}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        neutral: {
          50: "#F4F4F5",
          100: "#E0E1EA",
          200: "#C7CAD9",
          300: "#B1B5C9",
          400: "#8F95B2",
          500: "#72778E",
          600: "#56596B",
          700: "#393C47",
          800: "#1D1E24",
          900: "#151617",
        },
        primary: {
          50: "#E0F0FF",
          100: "#BCDAFE",
          200: "#78B6FD",
          300: "#3591FB",
          400: "#046EE7",
          500: "#034EA4",
          600: "#023E83",
          700: "#022F62",
          800: "#011F42",
          900: "#011731",
        },
        secondary: {
          50: "#FDE8E9",
          100: "#FBD2D3",
          200: "#F8A4A7",
          300: "#F4777C",
          400: "#F14950",
          500: "#ED1C24",
          600: "#CD1017",
          700: "#A40D13",
          800: "#7B0A0E",
          900: "#520609",
        },
        tertiary: {
          50: "#F7E7FF",
          100: "#eaccf9",
          400: "#9A3EC7",
          500: "#6A288A",
          600: "#501e68"
        },
        school: {
          sdm: "#E0663C",
          sas: "#29ACA6",
          sbm: "#005DA4",
          shs: "#629C51",
          seg: "#B10F1F",
          sit: "#6A288A",
        },
        semantic: {
          corn: "#F1D14B",
          magicMint: "#AFFCCE",
          brightGrey: "#EBEFF2",
        },
        error: {
          50: "#FDE8E9",
          300: "#F4777C",
          700: "#CD1017",
        },
        warning: {
          50: "#FFFAEB",
          300: "#FEC84B",
          700: "#F79009",
        },
        success: {
          50: "#E3FCEF",
          300: "#57D9A3",
          700: "#006644",
        },
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",
        link: "#0B68D4",
        "pcm-green": "#419F81",
        pcm: "#f3ede2",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        25: "6.25rem",
        26: "6.5rem",
        27: "6.75rem",
      },
      maxWidth: {
        "container-full": "90rem",
        "container-full-p": "93rem",
        "container-full-sm": "81rem",
        "container-full-sm-p": "84rem",
        "container-xl": "67rem",
        "container-xl-p": "70rem",
        "container-lg": "60rem",
        "container-lg-p": "63rem",
        container: "53.5rem",
        "container-p": "56.5rem",
        "container-md": "38rem",
        "container-md-p": "41rem",
        "container-sm": "35rem",
        "container-sm-p": "38rem",
        pcm: "70.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
        heading: ["Inter", "sans-serif"],
        cursive: ["Sedgwick Ave", "cursive"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        "4xl": "3rem",
        "5xl": "3.5rem",
        "6xl": "3.625rem",
        "7xl": "5.75rem",
        "8xl": "8rem",
        "h6-sm": "1.25rem",
        "h5-sm": "1.375rem",
        "h4-sm": "1.5rem",
        "h3-sm": "1.625rem",
        "h2-sm": "1.625rem",
        "h1-sm": "2rem",
        h6: "1.5rem",
        h5: "2rem",
        h4: "2.5rem",
        h3: "3rem",
        h2: "3.5rem",
        h1: "3.625rem",
        "display-2": "5.75rem",
        "display-1": "8rem",
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.025em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.025em",
        widest: "0.3571em",
      },
      lineHeight: {
        loose: "1.75",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        sm: ["0px 4px 4px 0px rgba(0, 0, 0, 0.07)"],
        md: ["0px 4px 12px 0px rgba(0, 0, 0, 0.16)"],
        lg: ["0px 8px 16px 0px rgba(0, 0, 0, 0.12)"],
        xl: ["0px 8px 32px 0px rgba(0, 0, 0, 0.16)"],
        "sm-2": ["0 1px 2px 0 rgb(0 0 0 / 0.05)"],
        "md-2": [
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        ],
        "lg-2": [
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1))",
        ],
        "xl-2": [
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        ],
        "event-card": ["0px -4px 12px 0px rgba(0, 0, 0, 0.16)"],
        dropdown: ["0px 3px 10px 0px rgba(0, 0, 0, 0.14)"],
        "we-go": ["0 24px 40px -12px rgb(0 0 0 / 0.5)"],
      },
      dropShadow: {
        1: ["1px 1px 0 rgba(0, 0, 0, 1)", "-1px -1px 0 rgba(0, 0, 0, 1)"],
        text: ["0 1px 2px rgb(0 0 0 / 0.7)"],
        "text-how-you-learn": [
          "-1px 1px 0 #f3ede2",
          "1px 1px 0 #f3ede2",
          "1px -1px 0 #f3ede2",
          "-1px -1px 0 #f3ede2",
        ],
      },
      backgroundImage: {
        "bottom-banner-gradient-top":
          "linear-gradient(180deg, rgba(0, 0, 0, 0.6) -10%, rgba(0, 0, 0, 0) 40%)",
        "bottom-banner-gradient-bottom":
          "linear-gradient(0deg, rgba(29, 30, 36, 1) 5%, rgba(255, 255, 255, 0) 70%)",
        "bottom-banner-gradient-bottom-md":
          "linear-gradient(79deg, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
        "bottom-banner-gradient-bottom-lg":
          "linear-gradient(79deg, rgba(0, 0, 0, 0.7) 33.18%, rgba(0, 0, 0, 0) 76.45%)",
        "bottom-banner-gradient-bottom-lg-carousel":
          "linear-gradient(92deg, rgba(0, 0, 0, 0.78) 13.09%, rgba(0, 0, 0, 0.39) 41.84%)",
        "bottom-banner-page-gradient":
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 50%)",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-up-in": {
          "0%": { transform: "translateY(2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-up-out": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(2rem)", opacity: "0" },
        },
        "fade-down-in": {
          "0%": { transform: "translateY(-2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-down-out": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-2rem)", opacity: "0" },
        },
        "dialog-fadein": {
          "0%": { opacity: "0", transform: "translateY(-5.5rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "navbar-fadein-m": {
          "0%": { transform: "translateX(100vw)" },
          "100%": { transform: "translateX(0)" },
        },
        "navbar-fadeout-m": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "dialog-fadeout": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-5.5rem)" },
        },
        "dialog-fadein-m": {
          "0%": { opacity: "0", transform: "translateX(100vw)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "dialog-fadeout-m": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100vw)" },
        },
        "dialog-bg-fadein": {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.75" },
        },
        "dialog-bg-fadeout": {
          "0%": { opacity: "0.75" },
          "100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-full": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "bounce-subtle": {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        "bounce-subtle-glow": {
          "0%": {
            transform: "translateY(0)",
            filter: "brightness(100%) contrast(100%)",
          },
          "50%": {
            transform: "translateY(-10px)",
            filter: "brightness(115%) contrast(115%)",
          },
          "100%": {
            transform: "translateY(0)",
            filter: "brightness(100%) contrast(100%)",
          },
        },
        glow: {
          "0%": { filter: "brightness(100%) contrast(100%)" },
          "50%": { filter: "brightness(115%) contrast(115%)" },
          "100%": { filter: "brightness(100%) contrast(100%)" },
        },
        "blur-glow": {
          "0%": {
            transform: "scale(1, 1)",
            filter: "blur(0) brightness(100%) contrast(100%)",
          },
          "50%": {
            transform: "scale(1.05, 1.1)",
            filter: "blur(0.5rem) brightness(110%) contrast(110%)",
          },
          "100%": {
            transform: "scale(1, 1)",
            filter: "blur(0) brightness(100%) contrast(100%)",
          },
        },
        "fade-in-instruction-overlay": {
          "0%": {
            transform: "translateY(2rem) rotate(-7.56deg))",
            opacity: "0",
          },
          "100%": { transform: "translateY(0) rotate(-7.56deg))", opacity: "1" },
        },
        twitch: {
          "0%": { transform: "rotate(0)" },
          "10%": { transform: "rotate(5deg)" },
          "20%": { transform: "rotate(-5deg)" },
          "30%": { transform: "rotate(5deg)" },
          "40%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(0)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0)" },
          "60%": { transform: "scale(1)" },
          "80%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        "scale-up-speech": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "60%": { transform: "scale(1)", opacity: "1" },
          "80%": { transform: "scale(0.95)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-up-plant": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "60%": { transform: "scale(1)", opacity: "1" },
          "80%": { transform: "scale(0.95)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-50%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(50%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadein: "fadein 300ms ease-in-out forwards",
        fadeout: "fadeout 300ms ease-in-out forwards",
        "fade-up-in": "fade-up-in 400ms ease-in-out forwards",
        "fade-up-out": "fade-up-out 400ms ease-in-out forwards",
        "fade-down-in": "fade-down-in 400ms ease-in-out forwards",
        "fade-down-out": "fade-down-out 400ms ease-in-out forwards",
        "navbar-fadein-m": "navbar-fadein-m  600ms ease-in-out forwards",
        "navbar-fadeout-m": "navbar-fadeout-m 500ms ease-in-out forwards",
        "dialog-fadein": "dialog-fadein 400ms ease-in-out forwards",
        "dialog-fadeout": "dialog-fadeout 300ms ease-in-out forwards",
        "dialog-bg-fadein": "dialog-bg-fadein 300ms ease-in-out forwards",
        "dialog-bg-fadeout": "dialog-bg-fadeout 300ms ease-in-out forwards",
        "dialog-fadein-m": "dialog-fadein-m 600ms ease-in-out forwards",
        "dialog-fadeout-m": "dialog-fadeout-m 500ms ease-in-out forwards",
        "dialog-bg-fadein-m": "dialog-bg-fadein 300ms ease-in-out forwards",
        "dialog-bg-fadeout-m": "dialog-bg-fadeout 500ms ease-in-out forwards",
        "bounce-subtle": "bounce-subtle 1500ms ease-in-out infinite",
        "bounce-subtle-glow": "bounce-subtle-glow 1500ms ease-in-out infinite",
        glow: "glow 1500ms ease-in-out infinite",
        "blur-glow": "blur-glow 1500ms ease-in-out infinite",
        "fade-in-instruction-overlay":
          "fade-in-instruction-overlay 400ms ease-in-out forwards",
        twitch: "twitch 1000ms ease-in-out infinite",
        "scale-up": "scale-up 600ms ease-in forwards",
        "scale-up-speech": "scale-up-speech 650ms ease-in forwards",
        "scale-up-plant": "scale-up-plant 650ms ease-in forwards",
        "slide-right": "slide-right 600ms ease-in-out forwards",
        "slide-left": "slide-left 600ms ease-in-out forwards",
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
      },
      transitionDelay: {
        600: "600ms",
      },
    },
  },
  plugins: [],
};
