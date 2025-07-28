
// const { getDefaultConfig } = require('@expo/metro-config');

// /** @type {import('metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// // Add support for NativeWind (optional, if needed)
// config.resolver.sourceExts.push('cjs');

// module.exports = config;

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })