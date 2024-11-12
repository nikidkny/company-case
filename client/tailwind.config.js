/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "text--h1-desktop",
    "text--h2-desktop",
    "text--h3-desktop",
    "text--h1-mobile",
    "text--h2-mobile",
    "text--h3-mobile",
    "text--body-desktop",
    "text--body-mobile",
    "text--body-sm",
    "post-badge--large",
    "post-badge--small",
    "post-badge--offer",
    "post-badge--wanted",
    "profile-badge--large",
    "profile-badge--small",
    "profile-badge--seeking",
    "profile-badge--not-seeking",
    "checkbox",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        gray: {
          500: "#777777",
          400: "#DDDDDD",
          300: "#F0F0F0",
          200: "#F9F9F9",
        },
        white: "#FFFFFF",
        blue: {
          500: "#353A5D",
          400: "#4A4E6E",
          300: "#4D1FE5",
          200: "#353a5d1a",
          100: "#4d1fe51a",
        },
        red: { 500: "#BF1E2E", 400: "#BF1E2E0d" },
        orange: "#FF9B19",
        green: {
          500: "#007737",
          100: "#0077371a",
        },
      },
      spacing: {},
      borderRadius: {
        button: "10px",
        ProfileBadge: "4px",
        PostBadge: "15px",
      },
      fontSize: {
        h1: {
          lg: "50px",
          sm: "30px",
        },
        h2: { lg: "38px", sm: "30px" },
        h3: { lg: "26px", sm: "20px" },
        button: "16px",
        body: { lg: "16px", md: "14px", sm: "12px" },
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      lineHeight: {
        1.08: "1.08",
        1.11: "1.11",
        1.13: "1.13",
        1.19: "1.19",
        1.25: "1.25",
        1.29: "1.29",
        1.5: "1.5",
        1.625: "1.625",
      },
      boxShadow: {
        button: "0px 4px 4px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      addUtilities({
        // Heading styles for large and small
        ".text--h1-desktop": {
          color: theme("colors.red"),
          fontFamily: theme("fontFamily.oswald"),
          fontSize: theme("fontSize.h1.desktop"),
          lineHeight: theme("lineHeight.1.08"),
        },
        ".text--h2-desktop": {
          color: theme("colors.blue.500"),
          fontFamily: theme("fontFamily.oswald"),
          fontSize: theme("fontSize.h2.desktop"),
          lineHeight: theme("lineHeight.1.11"),
        },
        ".text--h3-desktop": {
          color: theme("colors.blue.500"),
          fontFamily: theme("fontFamily.oswald"),
          fontSize: theme("fontSize.h3.desktop"),
          lineHeight: theme("lineHeight.1.5"),
        },
        ".text--h1-mobile": {
          color: theme("colors.red.500"),
          fontFamily: theme("fontFamily.oswald"),
          fontSize: theme("fontSize.h1.mobile"),
          lineHeight: theme("lineHeight.1.13"),
        },
        ".text--h2-mobile": {
          color: theme("colors.blue.500"),
          fontFamily: theme("fontFamily.oswald"),
          fontSize: theme("fontSize.h2.mobile"),
          lineHeight: theme("lineHeight.1.13"),
        },
        ".text--h3-mobile": {
          color: theme("colors.blue.500"),
          fontFamily: theme("fontFamily.oswald"),
          fontSize: theme("fontSize.h3.mobile"),
          lineHeight: theme("lineHeight.1.5"),
        },

        // Body text styles for large, small, and extra small
        ".text--body-desktop": {
          color: theme("colors.gray.500"),
          fontFamily: theme("fontFamily.montserrat"),
          fontSize: theme("fontSize.body.lg"),
          lineHeight: theme("lineHeight.1.625"),
        },
        ".text--body-mobile": {
          color: theme("colors.gray.500"),
          fontFamily: theme("fontFamily.montserrat"),
          fontSize: theme("fontSize.body.md"),
          lineHeight: theme("lineHeight.1.29"),
        },
        ".text--body-sm": {
          color: theme("colors.gray.500"),
          fontFamily: theme("fontFamily.montserrat"),
          fontSize: theme("fontSize.body.sm"),
          fontWeight: "700",
          lineHeight: theme("lineHeight.1.25"),
        },
        // Post Badge styles
        ".post-badge--large": {
          fontFamily: theme("fontFamily.montserrat"),
          fontWeight: "700",
          fontSize: "14px",
          lineHeight: theme("lineHeight.1.5"),
          padding: "6px 14px",
          borderRadius: "15px",
          width: "fit-content",
        },
        ".post-badge--small": {
          fontFamily: theme("fontFamily.montserrat"),
          fontWeight: "700",
          fontSize: "12px",
          lineHeight: theme("lineHeight.1.5"),
          padding: "6px 14px",
          borderRadius: "15px",
          width: "fit-content",
        },
        ".post-badge--offer": {
          backgroundColor: theme("colors.green.100"),
          color: theme("colors.green.500"),
        },
        ".post-badge--wanted": {
          backgroundColor: theme("colors.blue.100"),
          color: theme("colors.blue.300"),
        },
        // Profile Badge styles
        ".profile-badge--large": {
          padding: "8px 20px",
          borderRadius: "4px",
          fontSize: theme("fontSize.body.lg"),
          lineHeight: theme("lineHeight.1.625"),
          color: theme("colors.blue.500"),
          width: "fit-content",
        },
        ".profile-badge--small": {
          padding: "6px 16px",
          borderRadius: "4px",
          fontSize: theme("fontSize.body.md"),
          lineHeight: theme("lineHeight.1.29"),
          color: theme("colors.blue.500"),
          width: "fit-content",
        },
        ".profile-badge--seeking": {
          backgroundColor: theme("colors.blue.200"),
        },
        ".profile-badge--not-seeking": {
          backgroundColor: theme("colors.blue.200"),
        },
        // checkbox styles
        ".checkbox": {
          width: "20px",
          height: "20px",
          borderRadius: "10px",
          border: `1px solid ${theme("colors.gray.400")}`,
          backgroundColor: theme("colors.gray.400"),
          //shadow missing
        },
        // checkbox checked state missing
        ".checkbox-label": {
          color: theme("colors.black"),
          fontFamily: theme("fontFamily.montserrat"),
          fontSize: theme("fontSize.body.md"),
          lineHeight: theme("lineHeight.1.29"),
        },
      });
    },
  ],
};
