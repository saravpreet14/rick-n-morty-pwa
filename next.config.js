const withPWA = require("next-pwa");

module.exports = withPWA({
  // reactStrictMode: true,
  // presets: [require.resolve("next/babel")],
  // presets: ["@babel/preset-env", "@babel/preset-react"],
  images: {
    domains: ["rickandmortyapi.com"],
  },
  pwa: {
    dest: "public",
    swSrc: "service-worker.js",
  },
  // fallbacks: {
  //   image: "/static/images/fallback.png",
  //   // document: '/other-offline',  // if you want to fallback to a custom page other than /_offline
  //   // font: '/static/font/fallback.woff2',
  //   // audio: ...,
  //   // video: ...,
  // },
  // runTimeCaching,
});
