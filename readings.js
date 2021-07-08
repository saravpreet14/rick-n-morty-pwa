const fetch = require("node-fetch");

function print(data, name) {
  if (!data[name]) return;
  var obj = data[name];
  var result = Object.keys(obj).map((key) => {
    return obj[key];
  });
  console.log(
    `Avg ${name} of`,
    result.length,
    "readings is",
    (result.reduce((a, b) => a + b, 0) / result.length).toFixed(2)
  );
}

export default async function readings(url) {
  const response = await fetch(url);
  var data = await response.json();

  if (!data) return;

  print(data, "CLS");
  print(data, "FID");
  print(data, "LCP");
  print(data, "TTFB");
  print(data, "FCP");
}
