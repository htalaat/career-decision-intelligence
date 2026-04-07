const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Fix NativeWind Windows path bug: backslashes in cache paths get
// interpreted as escape characters. Only apply on Windows.
if (process.platform === "win32") {
  const originalResolve = path.resolve;
  path.resolve = function (...args) {
    const result = originalResolve.apply(this, args);
    if (result.includes("nativewind")) {
      return result.replace(/\\/g, "/");
    }
    return result;
  };
}

module.exports = withNativeWind(config, { input: "./src/global.css" });
