const withPWA = require("next-pwa");

module.exports = withPWA({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  images: {
    domains: ["rickandmortyapi.com"],
  },
  pwa: {
    dest: "public",
    swSrc: "service-worker.ts",
  },
});
