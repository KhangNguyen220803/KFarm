import connectDB from "../config/connectDB.js";

const getAdmin = async (username) => {
    const [rows, fields] = await connectDB.execute('SELECT * FROM `users` WHERE `username`=?', [username])
    return rows[0]
}

const insertAdmin = async (username, password, role) => {
    const [rows, fields] = await connectDB.execute('INSERT INTO `users` VALUES (?, ?, ?)', [username, password, role])
    return rows
}
export default {getAdmin, insertAdmin}