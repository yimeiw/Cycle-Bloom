const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration for handling image assets.
 * This ensures various image types are supported in your project.
 *
 * @type {import('metro-config').MetroConfig}
 */

// Uncomment this if you're using react-native-reanimated
// const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = {
  resolver: {
    assetExts: [
      ...getDefaultConfig(__dirname).resolver.assetExts, 
      'jpg',   // JPEG images
      'jpeg',  // JPEG images
      'png',   // PNG images
      'gif',   // GIF images
      'bmp',   // BMP images
      'webp',  // WebP images
      'svg',   // SVG images (if you're using SVGs)
    ],
  },
  transformer: {
    experimentalImportSupport: true, // Enables experimental import support for JS
    inlineRequires: false,           // Disable inline requires (set to true for optimization)
  },
  resolver: {
    useFabric: false,  // Set to false if you're not using Fabric renderer
  },
};

// If you're using react-native-reanimated, uncomment the next line:
// module.exports = wrapWithReanimatedMetroConfig(config);
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
