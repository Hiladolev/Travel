import express, { NextFunction, Request, Response } from "express";
import followerLogic from "../Logic/followerMYSQL";

const followersRouter = express.Router();

followersRouter.post(
  "/addLike/:vacationId/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.vacationId;
    const userId = +request.params.userId;
    const result = await followerLogic.addLike(userId, vacationId);
    response.status(200).json(result);
  }
);
followersRouter.delete(
  "/unLike/:vacationId/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.vacationId;
    const userId = +request.params.userId;
    const result = followerLogic.unLike(userId, vacationId);
    response.status(204).json(result);
  }
);
followersRouter.get(
  "/getFollowersByVacationId/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    response
      .status(200)
      .json(
        await followerLogic.followersByVacationId(+request.params.vacationId)
      );
  }
);

followersRouter.get(
  "/followersByUserId/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    response
      .status(200)
      .json(await followerLogic.followersByUserId(+request.params.userId));
  }
);

followersRouter.get(
  "/followedOrNot/:userId/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    response
      .status(200)
      .json(
        await followerLogic.isVacationFollowedByUserId(
          +request.params.vacationId,
          +request.params.userId
        )
      );
  }
);

followersRouter.get(
  "/allFollowers",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await followerLogic.getAllFollowers());
  }
);

export default followersRouter;
