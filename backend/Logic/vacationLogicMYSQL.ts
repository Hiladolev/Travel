import Vacation from '../Models/Vacation';
import dal_mysql from "../Utils/dal_mysql";
import {OkPacket} from "mysql";

// const formatDate = (date:Date):string =>{
//     const formattedDate = new Date(date).toISOString().split("T")[0];
//     return formattedDate;
// }

const addVacation = async (newVacation: Vacation)=> {
    const SQLcommand = `
    INSERT INTO travel.vacations
(destination, description, startDate, endDate, price, image) VALUES ('${newVacation.destination}', '${newVacation.description}', '${newVacation.startDate}', '${newVacation.endDate}', '${newVacation.price}', '${newVacation.image}');
    `;
    const result: OkPacket = await dal_mysql.execute(SQLcommand);
    return result.insertId
};

const updateVacation = async (vacation: Vacation) => {
    const SQLcommand = `
    UPDATE
    travel.vacations
    SET destination = '${vacation.destination}', description = '${vacation.description}', startDate = '${vacation.startDate}', endDate = '${vacation.endDate}', price = ${vacation.price}, image = '${vacation.image}'
    WHERE (id = ${vacation.id})  
    `;
    await dal_mysql.execute(SQLcommand);
    return true;
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
    )
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
};

