import * as express from "express";
import {Request,Response}  from "express"
import * as Cores from "cors";
import * as dotenv from "dotenv"
import * as fs from "fs"
import db from "./db/db"
import * as Routes from "./routes"
import { upload } from "./helper/multer.helper";
dotenv.config();
const app = express();

app.use(
    Cores({
        origin:'*'
    })
)
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({ status: true, message: `Boiler_India API `, developedBy: "Procohat Pvt. Ltd." })
})
app.post("/api/upload", upload.single("file"), (req:Request, res:Response) => {
    const data = req.files[0]
    const url =`file:///F:/procohat/boiler_india/public/images/${data.filename}`
    res.send({
        status:true,
        url:url
    })
  });
app.use('/api/exhibitor',Routes.exhibitor)
app.use('/api/user',Routes.user)
app.listen(80,async()=>{
    await db.initialize();
    console.log("http://localhost:8080")
})