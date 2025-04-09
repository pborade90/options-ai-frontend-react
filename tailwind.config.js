/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}"
    ],
    theme: {
      extend: {
        colors: {
          slate: "#283d3b",
          teal: "#197278",
          cream: "#eef4ed",
          red: "#c44536",
          maroon: "#772e25",
          dark: "#132a13",
          svg: '#3A5A40',
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif']
        }
      },
    },
    plugins: [],
  }
