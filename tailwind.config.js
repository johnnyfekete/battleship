/* global module */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        frontLeft: '100% 0 0 100% / 50% 0 0 50%',
        frontTop: '50% 50% 0 0 / 100% 100% 0 0',
      }
    },
  },
  plugins: [],
}
