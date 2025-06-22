
module.exports = {
  darkMode: 'class',
  content: [
    './node_modules/flowbite/**/*.js',
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

