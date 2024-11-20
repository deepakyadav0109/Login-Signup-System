const { Client } = require('pg');

const client = new Client({
  connectionString:
    process.env.NEONTECH_DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    const { name, username, email, password } = JSON.parse(event.body);

    try {
      const result = await client.query(
        "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, username, email, password]
      );

      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[0]),
      };
    } catch (err) {
      console.error("Failed to insert data", err);

      if (err.constraint === "users_username_key") {
        return {
          statusCode: 409,
          body: JSON.stringify({ error: "Username has already been taken." }),
        };
      }

      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to insert data" }),
      };
    }
  } else if (event.httpMethod === 'PUT') {
    const { id, location } = JSON.parse(event.body);
    try {
      const result = await client.query(
        "UPDATE users SET location = $1 WHERE id = $2 RETURNING *",
        [location, id]
      );

      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[0]),
      };
    } catch (err) {
      console.error("Failed to update data", err);

      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to update data" }),
      };
    }
  } else if (event.httpMethod === 'GET') {
    const { email, password } = event.queryStringParameters;
    try {
      const result = await client.query(
        "SELECT * FROM users WHERE email = $1 AND password = $2",
        [email, password]
      );
  
      if (result.rows.length > 0) {
        // User found
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, user: result.rows[0] }),
        };
      } else {
        // User not found
        return {
          statusCode: 401,
          body: JSON.stringify({ success: false, error: "Incorrect email or password" }),
        };
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch data" }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Invalid request method" }),
  };
};
 