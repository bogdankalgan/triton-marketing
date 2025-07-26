/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "src/components/**/*.{js,ts,jsx,tsx}",
      "src/pages/**/*.{js,ts,jsx,tsx}",

      "!./node_modules/**",
      "!./src/shaders/**",
      "!./src/styles/**",

    {
      files: "./src/**/*.{js,jsx, ts, tsx}",
      transform: (content) => content.match(/class[Name]*\s*[:=]\s*["`']([^"`']*)["`']/g) || []
    },
  ],
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