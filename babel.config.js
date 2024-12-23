// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   // plugins: ['react-native-reanimated/plugin'],
//   plugins: ['react-native-reanimated/plugin'],
// };

module.exports = {
  presets: [
    'module:metro-react-native-babel-preset', // Default preset for React Native
    '@babel/preset-typescript', // If you're using TypeScript
  ],
  plugins: [
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-transform-private-property-in-object',
  ],
};
