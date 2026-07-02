module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^modules/(.*)$": "<rootDir>/src/modules/$1",
    "^navigation$": "<rootDir>/src/navigation",
    "^navigation/(.*)$": "<rootDir>/src/navigation/$1",
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind)",
  ],
};
