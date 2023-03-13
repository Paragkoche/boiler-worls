import { Router } from "express";
import { checkPermission } from "../middleware/adminCheckPerm";
import * as Controller from "../controller/exhibitor.controller"
import { checkToken } from "../middleware/exhibitorJWT";
import { superAdminToken } from "../middleware/adminJWT";
import { upload } from "../helper/multer.helper";
import { Exhibitor } from "../model/exhibitor.model";
import db from "../db/db";
const route = Router();
 route.get("/", checkPermission('exhibitor', 'read'), Controller.getAll)
  route.get("/getMyProfile", checkToken, Controller.myProfile)
  route.get("/getOne/:id", superAdminToken, Controller.getOne)
  route.get("/search", Controller.searchExhibitor)
  route.post("/", Controller.create)
  route.put("/update/exhibitor/:id", superAdminToken, Controller.update)
  route.put("/update/profile", checkToken, Controller.updateProfile)
  route.post("/login", Controller.login)
  route.put("/assignStall/exhibitor/:exhibitor", superAdminToken, Controller.assignStall)
  route.put("/confirm/exhibitor/:exhibitor", superAdminToken, Controller.confirmExhibitor)
  route.put("/disapprove/exhibitor/:exhibitor", superAdminToken, Controller.disapproveExhibitor)

  route.put("/removeStall/exhibitor/:exhibitor/stall/:stall", superAdminToken, Controller.deAssignStall)

  route.delete("/delete/:id", superAdminToken, Controller.deleteA)
  // Upload vaccine certificate file
  route.post("/upload/vaccineCertificate", checkToken, Controller.uploadVaccine, Controller.uploadVaccine)

  // Upload Exhibitor Stall Design
  route.post("/upload/stallDesign", checkToken, Controller.uploadStallDesign, Controller.uploadStallDesign)

  // route.post("/uploadLogo", checkToken, exhibitor.updateCompanyLogo);
  route.post("/uploadLogo", checkToken, upload.single("file"), async (req, res) => {
    const data = req.file
    console.log(data)
    const url = `${process.env.BASE_URL}/images/${data.filename}`

    const update = await db.getRepository(Exhibitor).update(
        { id: req['exhibitor'].id },
      {
        company_logo: url
      })
    if (update)
      return res.send({
        status: true,
        url: url,
        message: 'Profile Uploaded'
      })
    return res.send({
      status: false,
      url: '',
      message: 'Failed to update'
    })
  });

  // Exhibitor Charts & Graphs

  route.get("/getExhibitorCategory", Controller.getExhibitorCharts)

  // Exhibitor Orders route
  route.get("/getOrders", checkToken, Controller.getOrders)
  route.get("/getOrderDetail/:id", checkToken, Controller.getOrderDetail)

  // OEM Progress
  route.get("/getOEMProgress", checkToken, Controller.getOEMProgress)

  // Export data as csv
  route.get("/export", Controller.exhibitor)

  // Exhibitor Contact
  route.post("/updateContact", checkToken, Controller.exhibitorContactUpdate)

  // Exhibitor Manner
  route.get("/getManners", checkToken, Controller.getManners)
  route.post("/addManners", checkToken, Controller.addManners)
  route.put("/updateManners/:id", checkToken, Controller.updateManners)
  route.delete("/deleteManners/:id", checkToken, Controller.deleteManners)

  // Exhibitor Passport
  route.post("/uploadPassport", checkToken,  Controller.uploadPassport)
  route.get("/getPassport", checkToken, Controller.getPassport)

  // Exhibitor Contractor
  route.post("/uploadContractor", checkToken, Controller.uploadContractor)
  route.get("/getContractor", checkToken, Controller.getContractor)
  route.delete("/deleteContractor/:id", checkToken, Controller.deleteContractor)

  // Exhibitor Principle
  route.post("/addPrinciple", checkToken, Controller.addPrinciple)
  route.get("/getPrinciple", checkToken, Controller.getPrinciple)

  route.get("/requestBadges", checkToken, Controller.requestBadges)

  // OEM routes

  route.post("/oem-remark", checkPermission('exhibitor', 'read'), Controller.oem_remarks)
  
  // Export
  route.get("/exportExhibitor", Controller.exportExhibitor) 


export default route;