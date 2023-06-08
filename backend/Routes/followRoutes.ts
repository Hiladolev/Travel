import express, { NextFunction, Request, Response } from "express";
import followerLogic from "../Logic/followerMYSQL";

const followersRouter = express.Router();

// followersRouter.post(
//     "/addLike",
//     async (request: Request, response: Response, next: NextFunction) => {
//         const like =
//     }
// )
