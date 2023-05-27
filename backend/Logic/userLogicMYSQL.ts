import User from "../Models/User";
import dal_mysql from "../Utils/dal_mysql";
import {OkPacket} from "mysql";

const addUser = async (newUser: User)=> {
    const SQLcommand = `
    INSERT INTO travel.users
(firstName, lastName, email, password, role) VALUES ('${newUser.firstName}', '${newUser.lastName}', '${newUser.email}', '${newUser.password}', '${newUser.role}');
`;
    const response: OkPacket = await dal_mysql.execute(SQLcommand);
    return response.insertId;
};

const updateUser = async (user: User)=> {
    const SQLcommand = `
    UPDATE
    travel.users
    SET firstName = '${user.firstName}', lastName = '${user.lastName}',email = '${user.email}',password = '${user.password}', role = '${user.role}' 
    WHERE (id = ${user.id})   
    `;
    await dal_mysql.execute(SQLcommand);
    return true;   
};

const deleteUser = (id: number)=> {
    const SQLcommand = `
    DELETE FROM travel.users WHERE id = ${id}
    `;
    dal_mysql.execute(SQLcommand);
    return true;
};

const getUserById = async (id:number) => {
    return await dal_mysql.execute(
        `SELECT * FROM travel.users WHERE id =${id}`     
    )    
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

const checkIfEmailExist = async (email:string) =>{
    const SQLcommand = (`
    SELECT COUNT(email)
    FROM travel.users
    WHERE email = ${email}
    `  
    );  
return await dal_mysql.execute(SQLcommand);

};

const getUserByEmailNPassword = async (user:User)=>{
    const SQLcommand = `
    SELECT * FROM users WHERE email = '${user.email}' AND password = '${user.password}'
    `;
    return await dal_mysql.execute(SQLcommand);
}
export default {
    createUsersTable,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    addUser,
    checkIfEmailExist,
    getUserByEmailNPassword
};