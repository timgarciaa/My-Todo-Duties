import dotenv from "dotenv";
import { Pool } from "pg";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5005;
app.listen(port, function () {
  console.log("node server started at " + port);
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

const connectToDB = async () => {
  try {
    await pool.connect();
    await pool.query(`
    CREATE TABLE IF NOT EXISTS DUTIES (
      id SERIAL PRIMARY KEY,
      Title VARCHAR(255) NOT NULL,
      Description TEXT,
      Created_Date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      Updated_Date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      Due_Date TIMESTAMP WITH TIME ZONE
    );
  `);
    console.log("DB Initializaion Completed");
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

module.exports = app;
