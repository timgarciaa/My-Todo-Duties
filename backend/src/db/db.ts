import { Pool, QueryResult } from "pg";
import { Duty } from "../types";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5433"),
});

async function createDuty(duty: Duty): Promise<Duty> {
  const queryText =
    "INSERT INTO duties(title, description, due_date) VALUES($1, $2, $3) RETURNING *";
  const values = [duty.title, duty.description, duty.due_date];

  try {
    const { rows }: QueryResult<Duty> = await pool.query(queryText, values);
    return rows[0];
  } catch (error) {
    console.error("Error creating duty:", error);
    throw error;
  }
}

async function getDuty(id: number): Promise<Duty | null> {
  const queryText = "SELECT * FROM duties WHERE id = $1";
  const values = [id];

  try {
    const { rows }: QueryResult<Duty> = await pool.query(queryText, values);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error("Error getting duty:", error);
    throw error;
  }
}

async function getDuties(): Promise<Duty[]> {
  const queryText = "SELECT * FROM duties";

  try {
    const { rows }: QueryResult<Duty> = await pool.query(queryText);
    return rows;
  } catch (error) {
    console.error("Error getting duties:", error);
    throw error;
  }
}

async function updateDuty(id: number, updatedDuty: Duty): Promise<Duty> {
  const queryText =
    "UPDATE duties SET title = $1, description = $2, due_date = $3, updated_date = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *";
  const values = [
    updatedDuty.title,
    updatedDuty.description,
    updatedDuty.due_date,
    id,
  ];

  try {
    const { rows }: QueryResult<Duty> = await pool.query(queryText, values);
    return rows[0];
  } catch (error) {
    console.error("Error updating duty:", error);
    throw error;
  }
}

async function deleteDuty(id: number): Promise<boolean> {
  const queryText = "DELETE FROM duties WHERE id = $1";

  try {
    await pool.query(queryText, [id]);
    return true;
  } catch (error) {
    console.error("Error deleting duty:", error);
    throw error;
  }
}

export { createDuty, getDuty, getDuties, updateDuty, deleteDuty };
