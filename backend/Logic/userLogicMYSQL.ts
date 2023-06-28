import User from "../Models/User";
import dal_mysql from "../Utils/dal_mysql";
import { OkPacket, escape } from "mysql";

const addUser = async (newUser: User) => {
  const SQLcommand = `
    INSERT INTO travel.users
(firstName, lastName, email, password, role) VALUES (${escape(
    newUser.firstName
  )}, ${escape(newUser.lastName)}, ${escape(newUser.email)}, ${escape(
    newUser.password
  )}, 'user');
`;
  const response: OkPacket = await dal_mysql.execute(SQLcommand);
  return response.insertId;
};

const deleteUser = (id: number) => {
  const SQLcommand = `
    DELETE FROM travel.users WHERE id = ${id}
    `;
  dal_mysql.execute(SQLcommand);
  return true;
};

const getUserById = async (id: number) => {
  return await dal_mysql.execute(`SELECT * FROM travel.users WHERE id =${id}`);
};

const getAllUsers = async () => {
  const SQLcommand = `
    SELECT * FROM travel.users
    `;
  return await dal_mysql.execute(SQLcommand);
};

const createUsersTable = () => {
  const SQLcommand = `
    CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        firstName VARCHAR(45) NOT NULL,
        lastName VARCHAR(45) NOT NULL,
        email VARCHAR(256) NOT NULL,
        password VARCHAR(256) NOT NULL,
        role VARCHAR(45) NOT NULL,
        PRIMARY KEY (id));
    `;
  const response = dal_mysql.execute(SQLcommand);
};

const checkIfEmailExist = async (email: string): Promise<boolean> => {
  const SQLcommand = `
    SELECT COUNT(*) AS count
    FROM travel.users
    WHERE email = ${escape(email)}
    `;
  const result = await dal_mysql.execute(SQLcommand);
  return result[0].count > 0;
};

const getUserByEmailNPassword = async (user: User): Promise<string> => {
  const SQLcommand = `
    SELECT * FROM users WHERE email = ${escape(
      user.email
    )} AND password = ${escape(user.password)}
    `;
  const result = await dal_mysql.execute(SQLcommand);
  return result[0] || null;
};
export default {
  createUsersTable,
  getAllUsers,
  getUserById,
  deleteUser,
  addUser,
  checkIfEmailExist,
  getUserByEmailNPassword,
};
