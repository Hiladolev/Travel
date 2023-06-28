import Vacation from "../Models/Vacation";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket, escape } from "mysql";

const addVacation = async (newVacation: Vacation) => {
  const SQLcommand = `
    INSERT INTO travel.vacations
(destination, description, startDate, endDate, price, image)
VALUES (${escape(newVacation.destination)}, ${escape(
    newVacation.description
  )}, '${newVacation.startDate}', '${newVacation.endDate}', ${
    newVacation.price
  }, ${escape(newVacation.image)});
    `;
  const result: OkPacket = await dal_mysql.execute(SQLcommand);
  return result.insertId;
};

const updateVacationWithImage = async (vacation: Vacation) => {
  const SQLcommand = `
    UPDATE
    travel.vacations
    SET destination = ${escape(vacation.destination)}, description = ${escape(
    vacation.description
  )}, startDate = '${vacation.startDate}', endDate = '${
    vacation.endDate
  }', price = ${vacation.price}, image = ${escape(vacation.image)}
    WHERE (id = ${vacation.id})  
    `;
  const result: OkPacket = await dal_mysql.execute(SQLcommand);
  return result.insertId;
};
const updateVacation = async (vacation: Vacation) => {
  const SQLcommand = `
    UPDATE
    travel.vacations
    SET destination = ${escape(vacation.destination)}, description = ${escape(
    vacation.description
  )}, startDate = '${vacation.startDate}', endDate = '${
    vacation.endDate
  }', price = ${vacation.price}
    WHERE (id = ${vacation.id})  
    `;
  const result: OkPacket = await dal_mysql.execute(SQLcommand);
  return result.insertId;
};

const deleteVacation = (id: number) => {
  const SQLcommand = `
    DELETE FROM travel.vacations WHERE id=${id}
    `;
  dal_mysql.execute(SQLcommand);
  return true;
};

const getVacationById = async (id: number) => {
  return await dal_mysql.execute(
    `SELECT * FROM travel.vacations WHERE id =${id}`
  );
};

const getAllVacations = async () => {
  const SQLcommand = `
    SELECT * FROM travel.vacations
    `;
  return await dal_mysql.execute(SQLcommand);
};

const createVacationsTable = () => {
  const SQLcommand = `
    CREATE TABLE IF NOT EXISTS vacations (
        id INT NOT NULL AUTO_INCREMENT,
        destination VARCHAR(256) NOT NULL,
        description VARCHAR(256) NOT NULL,
        startDate DATE  NOT NULL,
        endDate DATE  NOT NULL,
        price INT NOT NULL,
        image VARCHAR(256) NOT NULL,
        PRIMARY KEY (id));
    `;
  const response = dal_mysql.execute(SQLcommand);
};

export default {
  createVacationsTable,
  getAllVacations,
  getVacationById,
  deleteVacation,
  updateVacation,
  addVacation,
  updateVacationWithImage,
};
