const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const url = `https://api.github.com/repos/bitcointranscripts/bitcointranscripts`;
const token = process.env.GITHUB_ACCESS_TOKEN;

if (!token && process.env.NODE_ENV === "production") {
  throw new Error("Environment variable GITHUB_ACCESS_TOKEN is not set");
}

async function fetchAllReviewers() {
  const filePathToSave = path.join(__dirname, "..", "public", "reviewers-data.json");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const commits = [];
  let page = 1;
  const reviewers = {};

  while (true) {
    const response = await fetch(`${url}/commits?per_page=100&page=${page}&since=2023-08-01T00:00:00Z`, { headers });
    if (!response.ok) {
      throw new Error(`Error fetching commits: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.length === 0) {
      console.log("COMPLETED: fetching commits");

      break;
    }

    commits.push(...data);
    page++;
  }

  for (const {
    author: { avatar_url, login },
  } of commits) {
    reviewers[login] = { image: avatar_url, title: login };
  }

  fs.writeFileSync(filePathToSave, JSON.stringify(reviewers));
  console.log("COMPLETED: saved reviewers to file");
  return reviewers;
}

fetchAllReviewers();
