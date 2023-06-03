import express from "express";
import { NextFunction } from "express";
import { Request } from "express";
import { Response } from "express";
import vacationLogic from "../Logic/vacationLogicMYSQL";
import multer from "multer";
import storage from "../Utils/storage";

const router = express.Router();
const upload = multer({ storage: storage });
// router.post()
router.post(
  "/addVacation",
  upload.single("image"),
  async (request: Request, response: Response) => {
    console.log(request.file);
    const { image, ...newVacation } = request.body;
    // console.log("new vacation is:", newVacation);
    const result = await vacationLogic.addVacation(newVacation);
    response.send("image s");
    // response.status(201).json(result);
  }
);

router.delete(
  "/delete/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.vacationId;
    vacationLogic.deleteVacation(vacationId);
    response.status(204).json();
  }
);

router.get(
  "/getVacationById/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    response
      .status(200)
      .json(await vacationLogic.getVacationById(+request.params.vacationId));
  }
);

router.get(
  "/allVacations",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(202).json(await vacationLogic.getAllVacations());
  }
);

router.put(
  "/edit",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(202).json(await vacationLogic.updateVacation(request.body));
  }
);

router.post(
  "/:vacationId/upload",
  upload.single("image"),
  (request: Request, response: Response, next: NextFunction) => {
    response.send("image uploaded");
  }
);

export default router;
