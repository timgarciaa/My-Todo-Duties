import request from "supertest";
import app from "../src/app";
import { Duty } from "../src/types/index";
import dutiesService from "../src/services/dutiesService";

describe("Create Route Test", () => {
  test("Should create a record", async () => {
    const duty: Duty = {
      id: 1,
      title: "Test Duty",
      description: "test description",
    };

    const mockCreateDuty = jest.fn((): any => duty);

    jest
      .spyOn(dutiesService, "createRecord")
      .mockImplementation(() => mockCreateDuty());

    const res = await request(app).post("/api/duties").send(duty);

    expect(mockCreateDuty).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("data.id");
  });

  test("Missing title should fail", async () => {
    const duty: Duty = {
      id: 1,
      title: "",
      description: "empty",
    };

    const mockCreateDuty = jest.fn((): any => {
      return {
        error: true,
        errorMessage: "Title is required",
      };
    });

    jest
      .spyOn(dutiesService, "createRecord")
      .mockImplementation(() => mockCreateDuty());

    const res = await request(app).post("/api/duties").send(duty);

    expect(mockCreateDuty).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("data.errorMessage");
  });
});

describe("Get Route Test", () => {
  test("Should get a record by ID", async () => {
    const dutyId = 1;
    const mockGetDuty = jest.fn((): any => ({
      id: dutyId,
      title: "Test Duty",
      description: "test description",
    }));

    jest
      .spyOn(dutiesService, "getRecord")
      .mockImplementation(() => mockGetDuty());

    const res = await request(app).get(`/api/duties?id=${dutyId}`);

    expect(mockGetDuty).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("data.id", dutyId);
  });
});

describe("Update Route Test", () => {
  test("Should update a record by ID", async () => {
    const dutyId = 1;
    const updatedDuty = {
      id: dutyId,
      title: "Updated Duty",
      description: "updated description",
    };
    const mockUpdateDuty = jest.fn((): any => updatedDuty);

    jest
      .spyOn(dutiesService, "updateRecord")
      .mockImplementation(() => mockUpdateDuty());

    const res = await request(app).put(`/api/duties`).send(updatedDuty);

    expect(mockUpdateDuty).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty("data", updatedDuty);
  });
});

describe("Delete Route Test", () => {
  test("Should delete a record by ID", async () => {
    const dutyId = 1;
    const mockDeleteDuty = jest.fn((): any => ({
      id: dutyId,
      title: "Test Duty",
      description: "test description",
    }));

    jest
      .spyOn(dutiesService, "deleteRecord")
      .mockImplementation(() => mockDeleteDuty());

    const res = await request(app).delete(`/api/duties?id=${dutyId}`);

    expect(mockDeleteDuty).toHaveBeenCalledTimes(1);
  });
});
