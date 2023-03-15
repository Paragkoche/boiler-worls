import * as Controller from "../controller/user.controller";
import {Router} from "express";
import { checkToken } from "../middleware/jwt";

const route = Router();
route.post("/generate/OTP",Controller.generate)
// router.post("/sendEmail/OTP",Controller.generateEmail)
route.get("/",checkToken,Controller.getAll)
// route.get("/:id",Controller.getOne)
route.post("/", checkToken, Controller.create)
// route.post("/vaccine", upload,Controller.vaccineUpload)
// route.put("/:id",Controller.update)
// route.delete("/:id",Controller.delete)
route.post("/login",Controller.login)

// route.post("/forgetPassword",Controller.forgetPassword)
// route.post("/verifyLink/:id/passwordReset",Controller.forgetLinkVerfication)
// route.get("/checkEmail/:email",Controller.checkEmail)
// route.get("/checkEmailWithRole/:email/:role",Controller.checkEmailWithRole)

// route.get("/checkMobile/:mobile",Controller.checkMobile)
// route.get("/checkMobileWithRole/:mobile/:role",Controller.checkMobileWithRole)

// refresh token
route.get("/refresh", checkToken, Controller.refreshToken)

route.get("/sendWelcomeEmail/:id/:role", Controller.sendWelcomeEmail)
export default route;