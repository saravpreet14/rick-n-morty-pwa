const fetch = require("node-fetch");

async function readings() {
  const response = await fetch(
    "https://ricky-and-morty-project-default-rtdb.asia-southeast1.firebasedatabase.app/NextApp.json"
  );
  var data = await response.json();

  var obj = data.CLS;
  var result = Object.keys(obj).map((key) => {
    return obj[key];
  });
  console.log(
    "Avg CLS of",
    result.length,
    "readings is",
    result.reduce((a, b) => a + b, 0) / result.length
  );
  var obj = data.FCP;
  var result = Object.keys(obj).map((key) => {
    return obj[key];
  });
  console.log(
    "Avg FCP of",
    result.length,
    "readings is",
    result.reduce((a, b) => a + b, 0) / result.length
  );
  var obj = data.FID;
  var result = Object.keys(obj).map((key) => {
    return obj[key];
  });
  console.log(
    "Avg FID of",
    result.length,
    "readings is",
    result.reduce((a, b) => a + b, 0) / result.length
  );
  var obj = data.LCP;
  var result = Object.keys(obj).map((key) => {
    return obj[key];
  });
  console.log(
    "Avg LCP of",
    result.length,
    "readings is",
    result.reduce((a, b) => a + b, 0) / result.length
  );
  var obj = data.TTFB;
  var result = Object.keys(obj).map((key) => {
    return obj[key];
  });
  console.log(
    "Avg TTFB of",
    result.length,
    "readings is",
    result.reduce((a, b) => a + b, 0) / result.length
  );
}
readings();
