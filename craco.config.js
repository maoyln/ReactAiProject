const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  style: {
    sass: {
      additionalData: `@import "src/styles/variables.scss";`, // 假设你需要全局scss变量
    },
  },
};
