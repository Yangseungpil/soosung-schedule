// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // 👈 이렇게 함수 형태!
    require('autoprefixer'),
  ],
};
