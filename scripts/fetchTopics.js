const fs = require("fs");
const path = require("path");
const https = require("https");

const url = "https://raw.githubusercontent.com/bitcoinsearch/topics-index/refs/heads/main/topics.json";
const outputPath = path.join(__dirname, "..", "public", "topics.json");

https
  .get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      fs.writeFileSync(outputPath, data);
      console.log("Topics data has been fetched and saved to public folder.");
    });
  })
  .on("error", (err) => {
    console.error("Error fetching topics:", err.message);
  });
