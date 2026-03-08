/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0068FF",
        secondary: "#FF0400",
        navy: "#003370",
        gray: "#9999A1",
        lightBlue: "#DBECFC",
        lightGray: "#E6E6E9",
        "bw-primary": "#0068FF",
        "bw-secondary": "#FF0400",
        "bw-navy": "#003370",
        "bw-gray": "#9999A1",
        "bw-lightblue": "#DBECFC",
        "bw-lightgray": "#E6E6E9"
      },
      borderRadius: {
        xl: "1rem"
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}; 
