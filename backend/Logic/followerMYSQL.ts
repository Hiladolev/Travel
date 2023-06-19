import { OkPacket } from "mysql";
import dal_mysql from "../Utils/dal_mysql";

const createFollowersTable = () => {
  const SQLcommand = `
    CREATE TABLE IF NOT EXISTS followers (
        followerId INT NOT NULL AUTO_INCREMENT,
        userId INT NOT NULL,
        vacationId INT NOT NULL,
        PRIMARY KEY (followerId),
        CONSTRAINT FK_userId
        FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
        CONSTRAINT FK_vacationId
        FOREIGN KEY (vacationId) REFERENCES vacations(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
        );
        
`;
  const response = dal_mysql.execute(SQLcommand);
};

const addLike = async (userId: number, vacationId: number) => {
  const SQLcommand = `
    INSERT INTO travel.followers (userId, vacationId) VALUES (${userId},${vacationId});
    `;
  const response: OkPacket = await dal_mysql.execute(SQLcommand);
  return response.insertId;
};

const unLike = (vacationId: number, userId: number) => {
  const SQLcommand = `
    DELETE FROM travel.followers WHERE vacationId = ${vacationId} AND userId=${userId}`;
  dal_mysql.execute(SQLcommand);
  return true;
};
const followersByVacationId = async (vacationId: number) => {
  const SQLcommand = `
  SELECT COUNT(*) AS count
  FROM travel.followers
  WHERE vacationId = ${vacationId}`;
  const followers = await dal_mysql.execute(SQLcommand);
  return followers[0].count;
};
const followersByUserId = async (userId: number) => {
  const SQLcommand = `
    SELECT * FROM travel.followers WHERE userId = ${userId}`;
  return await dal_mysql.execute(SQLcommand);
};
const isVacationFollowedByUserId = async (
  vacationId: number,
  userId: number
): Promise<boolean> => {
  const SQLcommand = `SELECT COUNT(*) AS count
  FROM travel.followers
  WHERE vacationId = ${vacationId} AND userId=${userId}`;
  const followed = await dal_mysql.execute(SQLcommand);
  return followed[0].count > 0;
};

export default {
  createFollowersTable,
  addLike,
  unLike,
  followersByVacationId,
  followersByUserId,
  isVacationFollowedByUserId,
};
