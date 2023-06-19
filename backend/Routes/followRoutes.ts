import express, { NextFunction, Request, Response } from "express";
import followerLogic from "../Logic/followerMYSQL";

const followersRouter = express.Router();

followersRouter.post(
  "/addFollow/:vacationId/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.vacationId;
    const userId = +request.params.userId;
    const followId = await followerLogic.addFollow(userId, vacationId);
    response.status(200).json(followId);
  }
);
followersRouter.delete(
  "/unFollow/:vacationId/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.vacationId;
    const userId = +request.params.userId;
    followerLogic.unFollow(userId, vacationId);
    response.status(204);
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
