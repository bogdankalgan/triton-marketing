/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },

      backgroundImage: {
        'button-gradient': 'linear-gradient(to right, #E295F0, #8402D9)',
      },
    },
  },
  plugins: [],
}