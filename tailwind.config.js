/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Fashion Marketplace Theme
        primary: "#228B22", // Forest Green - Action buttons (Add to Cart, Payment)
        secondary: "#F5F5DC", // Light Beige - Secondary buttons, backgrounds
        accent: "#FFD700", // Golden Yellow - Highlights, active states
        background: "#F8F8FF", // Soft White - App background, cards
        text: "#556B2F", // Dark Olive - Primary text, headings
        
        // Supporting colors
        white: "#FFFFFF",
        gray: {
          100: "#F7FAFC",
          200: "#EDF2F7",
          300: "#E2E8F0",
          400: "#CBD5E0",
          500: "#A0AEC0",
          600: "#718096",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C",
        },
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        rBold: ["Rubik-Bold", "sans-serif"],
        rExtrabold: ["Rubik-ExtraBold", "sans-serif"],
        rMedium: ["Rubik-Medium", "sans-serif"],
        rSemibold: ["Rubik-SemiBold", "sans-serif"],
        rLight: ["Rubik-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};