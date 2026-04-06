const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Fix NativeWind Windows path bug: force forward slashes in __dirname
// so the generated CSS import path doesn't have broken backslashes
const originalDirname = __dirname;
const fixedDirname = originalDirname.replace(/\\/g, "/");

// Monkey-patch path.resolve for the NativeWind metro plugin
const originalResolve = path.resolve;
path.resolve = function (...args) {
  const result = originalResolve.apply(this, args);
  // Only fix paths that go through the nativewind cache
  if (result.includes("nativewind")) {
    return result.replace(/\\/g, "/");
  }
  return result;
};

const config = getDefaultConfig(originalDirname);

module.exports = withNativeWind(config, { input: "./src/global.css" });
