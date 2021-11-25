const withOptimizedImages = require('next-optimized-images');
module.exports = withOptimizedImages({
  optimizeImages: false,
  images: {
    domains: ['www.everyayah.com'],
  },
});

// module.exports = {
//   images: {
//     domains: ['www.everyayah.com'],
//   },
// }

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Note: we provide webpack above so you should not `require` it
//     // Perform customizations to webpack config
//     config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

//     // Important: return the modified config
//     return config
//   },
// }