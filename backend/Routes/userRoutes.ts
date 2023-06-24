import express, { NextFunction, Request, Response } from "express";
import userLogic from "../Logic/userLogicMYSQL";

const userRouter = express.Router();

userRouter.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    const existingUser = request.body;
    const userInfo = await userLogic.getUserByEmailNPassword(existingUser);
    response.status(200).json(userInfo);
  }
);

userRouter.post(
  "/checkIfEmailExist",
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email;
    const result = await userLogic.checkIfEmailExist(email);
    response.status(200).json(result);
  }
);
userRouter.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const result = await userLogic.addUser(newUser);
    response.status(201).json(result);
  }
);

userRouter.delete(
  "/deleteUser/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    const userId = +request.params.userId;
    userLogic.deleteUser(userId);
    response.status(204).json(`{"msg": "User account is deleted"}`);
  }
);

userRouter.put(
  "/updateUser",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(202).json(await userLogic.updateUser(request.body));
  }
);
userRouter.post(
  "/allUsers",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(202).json(await userLogic.getAllUsers());
  }
);

export default userRouter;
