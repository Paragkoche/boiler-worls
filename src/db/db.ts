import "reflect-metadata"
import {DataSource} from "typeorm"
import {config} from "dotenv";
import  enstitys from "../model"
config()
export default new DataSource({
    type:'mysql',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    database:process.env.DB_NAME,
    port:parseInt(process.env.DB_PORT || ''),
    logging:'all',
    synchronize:true,
    migrationsRun: true,
    entities:enstitys
})