// module.exports = function (api) {
//   api.cache(true); // Valid here for Babel
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'nativewind/babel', // For NativeWind
//       'react-native-reanimated/plugin', // For Reanimated
//     ],
//   };
// };

// module.exports = function (api) {
//     api.cache(true);
//     return {presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//       "nativewind/babel",
//     ],
//       plugins: [
//   'react-native-reanimated/plugin',
//   ['module-resolver']
// ]
//     };
//   };
  
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};