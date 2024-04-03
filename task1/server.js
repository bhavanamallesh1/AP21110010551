// server.js

const express = require("express");
const ejs = require("ejs");

const app = express();
const PORT = process.env.PORT || 9876;

const TEST_SERVER_URL = "http://20.244.56.144/test/";
const WINDOW_SIZE = 10;

let storedNumbers = [];

async function fetchNumbersFromServer(type) {
  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch(TEST_SERVER_URL + type);
    if (!response.ok) {
      throw new Error("Failed to fetch numbers");
    }
    const data = await response.json();
    return data.numbers;
  } catch (error) {
    console.error("Error fetching numbers:", error.message);
    return [];
  }
}

function calculateAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

app.use(express.json());

app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;
  const types = {
    p: "primes",
    f: "fibo",
    e: "even",
    r: "rand",
  };

  const type = types[numberid];

  if (!type) {
    return res.status(400).json({ error: "Invalid number ID" });
  }

  const numbers = await fetchNumbersFromServer(type);

  if (numbers.length === 0) {
    return res.status(500).json({ error: "Failed to fetch numbers" });
  }

  const prevNumbers = storedNumbers.slice(0, WINDOW_SIZE);
  storedNumbers = [
    ...numbers.slice(0, WINDOW_SIZE),
    ...storedNumbers.slice(0, WINDOW_SIZE - numbers.length),
  ];

  const avg = calculateAverage(storedNumbers.slice(0, WINDOW_SIZE));

  const responseObj = {
    windowPrevState: prevNumbers,
    windowCurrState: storedNumbers,
    numbers: numbers.slice(0, WINDOW_SIZE),
    avg: avg.toFixed(2),
  };

  res.json(responseObj);
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { PORT });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
