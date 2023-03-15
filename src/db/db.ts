import "reflect-metadata"
import {DataSource} from "typeorm"
import {config} from "dotenv";
import  enstitys from "../model"
config()
export default new DataSource({
    type:'postgres',
    url:"postgresql://parag:_2wl-so2S0KnHktLjZJOrQ@discord-3838.6xw.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full",
    
    // host:process.env.DB_HOST,
    // username:process.env.DB_USER,
    // database:process.env.DB_NAME,
    // port:parseInt(process.env.DB_PORT || ''),
    logging:'all',
    // synchronize:true,
    migrationsRun: true,
    entities:enstitys
})