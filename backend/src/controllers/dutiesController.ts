import { NextFunction, Request, Response } from "express";
import dutiesService from "../services/dutiesService";
import { Duty } from "../types";

async function createRecord(req: Request, res: Response, next: NextFunction) {
  const jsonResponse: any = {};
  try {
    const record: Duty = req.body;
    const result = await dutiesService.createRecord(record);
    jsonResponse.data = result;
    res.status(200).json(jsonResponse);
    next();
  } catch (e: any) {
    jsonResponse.error = true;
    jsonResponse.errorMessage = e.message;
    res.status(400).json(jsonResponse);
    next();
  }
}

async function getRecord(req: Request, res: Response, next: NextFunction) {
  const jsonResponse: any = {};
  try {
    const id = req.query.id;
    const result = await dutiesService.getRecord(Number(id));
    jsonResponse.data = result;
    res.status(200).json(jsonResponse);
    next();
  } catch (e: any) {
    jsonResponse.error = true;
    jsonResponse.errorMessage = e.message;
    res.status(400).json(jsonResponse);
    next();
  }
}

async function updateRecord(req: Request, res: Response, next: NextFunction) {
  const jsonResponse: any = {};
  try {
    const fileRecord: Duty = req.body;
    const result = await dutiesService.updateRecord(fileRecord);
    jsonResponse.data = result;
    res.status(200).json(jsonResponse);
    next();
  } catch (e) {
    jsonResponse.error = true;
    jsonResponse.errorMessage = e;
    res.status(500).json(jsonResponse);
    next();
  }
}

async function deleteRecord(req: Request, res: Response, next: NextFunction) {
  const jsonResponse: any = {};
  try {
    const id = req.query.id;
    const result = await dutiesService.deleteRecord(Number(id));
    jsonResponse.data = result;
    res.status(200).json(jsonResponse);
    next();
  } catch (e) {
    jsonResponse.error = true;
    jsonResponse.errorMessage = e;
    res.status(500).json(jsonResponse);
    next();
  }
}

async function getRecords(req: Request, res: Response, next: NextFunction) {
  const jsonResponse: any = {};
  try {
    const result = await dutiesService.getRecords();
    jsonResponse.data = result;
    res.status(200).json(jsonResponse);
    next();
  } catch (e) {
    jsonResponse.error = true;
    jsonResponse.errorMessage = e;
    res.status(500).json(jsonResponse);
    next();
  }
}

export { createRecord, getRecord, updateRecord, deleteRecord, getRecords };
