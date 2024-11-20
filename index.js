const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());

const client = new Client({
  connectionString:
    "postgresql://Aeonaxy-users_owner:x0LhjErNW8sn@ep-plain-wildflower-a1dor35e.ap-southeast-1.aws.neon.tech/Aeonaxy-users?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

app.post("/api/users", async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, username, email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Failed to insert data", err);
    if (err.constraint === "users_username_key") {
      res.status(409).json({ error: "Username has already been taken." });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while inserting the data." });
    }
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
