import { Duty } from "@/types";

export async function getDuties() {
  const data = await fetch("http://localhost:5000/api/duties/all");
  const duties = await data.json();
  return duties.data;
}

export async function createDuties(duty: Duty) {
  const data = await fetch("http://localhost:5000/api/duties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(duty),
  });
}

export async function getDuty(id: number) {
  const data = await fetch(`http://localhost:5000/api/duties?id=${id}`);
  const duty = await data.json();
  return duty.data;
}

export async function updateDuties(duty: Duty) {
  const data = await fetch("http://localhost:5000/api/duties", {
    method: "PUT",
    headers: {
      "Accept": "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(duty),
  });
}

export async function deleteDuty(id: number) {
  const data = await fetch(`http://localhost:5000/api/duties?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
