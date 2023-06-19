import express from "express";
import { NextFunction } from "express";
import { Request } from "express";
import { Response } from "express";
import vacationLogic from "../Logic/vacationLogicMYSQL";
import multer from "multer";
import storage from "../Utils/storage";

const router = express.Router();
const upload = multer({ storage: storage });

router.post(
  "/addVacation",
  upload.single("image"),
  async (request: Request, response: Response, next: NextFunction) => {
    const newVacation = { ...request.body, image: request.file?.filename };
    const vacationId = await vacationLogic.addVacation(newVacation);
    response.status(201).json({ id: vacationId, ...newVacation });
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
  upload.single("image"),
  async (request: Request, response: Response, next: NextFunction) => {
    const updatedVacation = { ...request.body, image: request.file?.filename };
    const lastVersionVacation = {
      ...updatedVacation,
      price: parseInt(updatedVacation.price),
      id: parseInt(updatedVacation.id),
    };
    console.log(lastVersionVacation);
    if (lastVersionVacation.image === undefined) {
      const vacationId = await vacationLogic.updateVacation(
        lastVersionVacation
      );
      response.status(202).json({ id: vacationId, ...lastVersionVacation });
    } else {
      const vacationId = await vacationLogic.updateVacationWithImage(
        lastVersionVacation
      );
      response.status(202).json({ id: vacationId, ...lastVersionVacation });
    }
  }
);

export default router;
