const fs = require("fs");
const path = require("path");
const https = require("https");

const url = "https://bitcoinops.org/topics.json";
const outputPath = path.join(__dirname, "..", "public", "categories.json");

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      fs.writeFileSync(outputPath, data);
      console.log("Categories data has been fetched and saved to public folder.");
    });
  })
  .on("error", (err) => {
    console.error("Error fetching categories:", err.message);
  });
