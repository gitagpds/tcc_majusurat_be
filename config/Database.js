import { Sequelize } from "sequelize";

const db = new Sequelize("majusurat_db", "root", "majusurat123", {
    host: "34.45.107.245",
    dialect: "mysql"

})

export default db;
