import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import vacationLogic from "./Logic/vacationLogicMYSQL";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/Config";
import vacationRouter from "./Routes/vacationRoutes";
import userRouter from "./Routes/userRoutes";
import userLogic from "./Logic/userLogicMYSQL";
import followerLogic from "./Logic/followerMYSQL";
import multer from "multer";
import storage from "./Utils/storage";
import followersRouter from "./Routes/followRoutes";

//create server
const server = express();

//handle cors
server.use(cors());

//how we send the data back
server.use(express.json());

//where I save the vacations images
const upload = multer({ storage: storage });
server.use("/images", express.static("images"));

//enable file uploading and create a path for the files if it's not exist
// server.use(fileUpload({createParentPath: true}));

//parse the body as json
server.use(bodyParser.json());

//how to use the routes
server.use("/api/v1/vacations", vacationRouter);
server.use("/api/v1/users", userRouter);
server.use("/api/v1/followers", followersRouter);

//create our tables + FK if they not exists
console.log("check if tables exists...");
vacationLogic.createVacationsTable();
userLogic.createUsersTable();
followerLogic.createFollowersTable();

//handle errors(route not found)
server.use("*", ErrorHandler);

//start the server
server.listen(config.WebPort, () => {
  console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});
