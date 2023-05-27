import express from "express";
import { NextFunction } from 'express';
import { Request } from 'express';
import { Response } from 'express';
import vacationLogic from "../Logic/vacationLogicMYSQL";

const router = express.Router();

router.post("/addVacation",
async (request:Request,response:Response,next:NextFunction)=> {
    const newVacation = request.body;
    const result = await vacationLogic.addVacation(newVacation);
    response.status(201).json(result);
});

router.delete("/delete/:vacationId",
async (request:Request,response:Response,next:NextFunction)=> {
const vacationId = +request.params.vacationId;
vacationLogic.deleteVacation(vacationId);
response.status(204).json(); 
}
);

router.get("/getVacationById/:vacationId",
async (request:Request,response:Response,next:NextFunction)=> {
response.status(200).json(await vacationLogic.getVacationById(+request.params.vacationId));
}
);

router.get("/allVacations",
async (request:Request,response:Response,next:NextFunction)=> {
response.status(202).json(await vacationLogic.getAllVacations());

}
);

router.put("/edit",
async (request:Request,response:Response,next:NextFunction)=> {
response.status(202).json(await vacationLogic.updateVacation(request.body));

}
);

export default router;