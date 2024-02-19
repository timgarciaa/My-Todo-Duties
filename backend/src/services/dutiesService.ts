import {
  createDuty,
  getDuty,
  getDuties,
  updateDuty,
  deleteDuty,
} from "../db/db";
import { Duty } from "../types";

async function createRecord({
  title,
  description,
  due_date,
}: Duty): Promise<Duty> {
  if (title === "" || title === null || title === undefined) {
    throw new Error("Title is required");
  }

  const dateNow = new Date();
  const record = await createDuty({
    title,
    description,
    due_date,
    created_date: dateNow,
  });

  return record;
}

async function getRecord(id: number) {
  return await getDuty(id);
}

async function updateRecord({ id, title, description, due_date }: Duty) {
  const record = await updateDuty(id as number, {
    title,
    description,
    due_date,
  });

  return record;
}

async function deleteRecord(id: number) {
  await deleteDuty(id);
}

async function getRecords() {
  return await getDuties();
}

export default {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
  getRecords,
};
