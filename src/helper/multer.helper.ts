import * as multer from "multer";
import * as path from "path"
const storage = multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

export const upload = multer({storage})