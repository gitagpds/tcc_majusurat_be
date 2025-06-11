import { Sequelize } from "sequelize";

const db = new Sequelize("majusurat_db", "root", "", {
    host: "localhost",
    dialect: "mysql"

})

export default db;
