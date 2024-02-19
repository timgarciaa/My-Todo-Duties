import { Router, Request, Response, NextFunction } from "express";
import {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
} from "../controllers/dutiesController";

const router: Router = Router();

router.post("/", function (req: Request, res: Response, next: NextFunction) {
  createRecord(req, res, next);
});

router.get(
  "/",
  function (req: Request, res: Response, next: NextFunction) {
    getRecord(req, res, next);
  }
);

router.put("/", function (req: Request, res: Response, next: NextFunction) {
  updateRecord(req, res, next);
});

router.delete("/", function (req: Request, res: Response, next: NextFunction) {
  deleteRecord(req, res, next);
})

router.get(
  "/all",
  function (req: Request, res: Response, next: NextFunction) {
    getRecords(req, res, next);
  }
);

export default router;
