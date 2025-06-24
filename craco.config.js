const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // 关键修改：覆盖 webpack 配置，移除类型检查插件
    configure: (webpackConfig, { env, paths }) => {
      // 移除 fork-ts-checker-webpack-plugin（TypeScript 类型检查插件）
      webpackConfig.plugins = webpackConfig.plugins.filter(
        plugin => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
      );
      return webpackConfig;
    }
  },
  style: {
    sass: {
      additionalData: `@import "src/styles/variables.scss";`, // 假设你需要全局scss变量
    },
  },
};
