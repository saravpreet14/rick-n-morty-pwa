const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  // presets: [require.resolve("next/babel")],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  images: {
    domains: ["rickandmortyapi.com"],
  },
});
