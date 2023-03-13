import { Request, Response } from "express";
import { Like } from "typeorm";
import db from "../db/db";
import {
  checkEmailwithRole,
  checkMobilewithRole,
} from "../helper/checkExsisting.helper";
import { exhibitorRegistration } from "../helper/vakidate_body";
import { Exhibitor } from "../model/exhibitor.model";
import { Stall } from "../model/stall.model";
import { StallPref } from "../model/stall_pref.model";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { sendIntimationEmail, sendRequestBadge, sendWelcomeExhibitor } from "../helper/email.helper";
import { sign } from "jsonwebtoken";
import { ExhibitorPassport } from "../model/exhibitor-passport.model";
import { ExhibitorContractor } from "../model/exhibitor-contractor.model";
import { ExhibitorPrinciple } from "../model/exhibitor-principles.model";
import { VendorOrder } from "../model/vendorOrder-remark";
import { ExhibitorManning } from "../model/exhibitor-manning.model";
import { OEMRemark } from "../model/oem-remark.model";
export const getAll = async (req: Request, res: Response) => {
  try {
    const curPage = parseInt(req.query.page as string) || 0;

    const showConfirmed = parseInt(req.query.confirmed as string) || 3;

    const pgSize = req.query.limit ? req.query.limit : 10;
    const order = req.query.order
      ? [["id", req.query.order]]
      : [["id", "DESC"]];

    const searchFor = req.query.searchFor || "exhibitor";
    const query = req.query.query || null;
    let where;

    if (showConfirmed == 1 || showConfirmed == 0) {
      where = {
        is_confirmed: showConfirmed,
      };
    } else {
      where = {};
    }
    if (searchFor == "exhibitor" && query) {
      where = [
        {
          company_name: Like("%" + query + "%"),
        },
        {
          company_repName: Like("%" + query + "%"),
        },
        {
          mobile_no: Like("%" + query + "%"),
        },
        {
          email: Like("%" + query + "%"),
        },
      ];
      if (showConfirmed == 1 || showConfirmed == 0) {
        where.is_confirmed = showConfirmed;
      }
    }
    console.log(where);
    var stall_include: any = {
      model: db.getRepository(Stall),
      as: "stall",
    };
    if (searchFor == "stall") {
      stall_include = {
        model: db.getRepository(Stall),
        as: "stall",
        where: {
          stall_no: Like("%" + query + "%"),
        },
      };
    }
    let options: any = {
      where,
      distinct: true,
      order: order,
      offset: curPage * parseInt(pgSize as string),
      include: [
        stall_include,
        {
          model: db.getRepository(StallPref),
          as: "stall_pref",
        },
      ],
    };
    if (pgSize > 0) options.limit = parseInt(pgSize as string);
    const data = await db.getRepository(Exhibitor).findAndCount(options);
    const [exhibitor, totalItems] = data;
    const currentPage = curPage ? +curPage : 0;
    const totalPages = Math.ceil(totalItems / parseInt(pgSize as string));
    res.send({
      status: true,
      data: {
        currentPage,
        totalPages,
        totalItems,
        rows: exhibitor,
      },
    });
  } catch (err) {
    res.send({
      status: false,
      message: "" + err,
    });
  }
};
export const create = async (req: Request, res: Response) => {
  try {
    const emailExsists = await checkEmailwithRole(req.body.email, "exhibitor");
    const mobileExsists = await checkMobilewithRole(
      req.body.mobile_no,
      "exhibitor"
    );
    if (emailExsists) {
      if (emailExsists["account_deletion_request"]) {
        return res.send({
          status: false,
          message: "Account deletion is in progress",
        });
      }

      return res.send({
        status: false,
        message: "Try another Email.",
      });
    }
    if (mobileExsists) {
      if (mobileExsists["account_deletion_request"]) {
        return res.send({
          status: false,
          message: "Account deletion is in progress",
        });
      }
      return res.send({
        status: false,
        message: "Try another Mobile no.",
      });
    }
    const { error } = exhibitorRegistration.validate(req.body);
    if (error) {
      // console.log(error);
      return res.send({
        status: false,
        message: error.details[0].message,
      });
    }
    if (!req.body.mobile_no) {
      res.send({
        status: false,
        message: "Mobile no. cannot be empty",
      });
      return;
    }
    if (!req.body.email) {
      res.send({
        status: false,
        message: "Email cannot be empty",
      });
      return;
    }
    if (req.body.password !== req.body.cpassword) {
      res.send({
        status: false,
        message: "Password and Confirm Password do not match",
      });
      return;
    }
    const hashPassword = hashSync(req.body.password, genSaltSync(10));
    const saveObj = {
      ...req.body,
      password: hashPassword,
    };
    const data = await db
      .getRepository(Exhibitor)
      .save(db.getRepository(Exhibitor).create({
        ...saveObj
      }));
    await sendWelcomeExhibitor({
      to: req.body.email,
      ...req.body,
    });
    await sendIntimationEmail(data[0]);
    return res.send({
      status: true,
      data: data,
      message: "Registration Successfull",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

export const uploadVaccine = async (req: Request, res: Response) => {
  try {
      // console.log("data");
      
      if(!req.file){
          return res.send({
              status: false,
              message: "No file selected"
          })
      }
      const name = req.file
      console.log();
      const url = `${process.env.BASE_URL}/vaccine/${name}`
      // console.log(name);
      const data = await db.getRepository(Exhibitor).update({
        id:req['exhibitor'].id
      },{
        vaccine_certificate: url 
      })
      if(data)
      return res.send({
          status: true,
          message: "Vaccine Certificate Uploaded"
      })
      return res.send({
          status: false,
          message: "Failed to Upload"
      })
  } catch (err) {
      return res.send({
          status: false,
          message: err
      })
  }
}

export const uploadStallDesign = async (req, res) => {
  try {
      // console.log("data");
      if (req.error) {
          return res.send(req.error)
      }
      if(!req.file){
          return res.send({
              status: false,
              message: "No file selected"
          })
      }
      const name = req.file
      console.log();
      const url = `${process.env.BASE_URL}/design/${name}`
      // console.log(name);
      const data = await db.getRepository(Exhibitor).update(
        { id: req['exhibitor'].id } ,
        { stall_design: url }, 
        
        )
      if(data)
      return res.send({
          status: true,
          url:url,
          message: "Stall Design Uploaded"
      })
      return res.send({
          status: false,
          url: '',
          message: "Failed to Upload"
      })
  } catch (err) {
      return res.send({
          status: false,
          message: err.message
      })
  }
}

export const myProfile = async (req, res) => {
  try {
      const data = await db.getRepository(Exhibitor).findOne({
      where:{
        id:req['exhibitor'].id 
      }

      })

      if (!data) {
          return res.send({
              status: false,
              message: "Not found"
          })
      }
      return res.send({
          status: true,
          data: data,
          message: 'Exhibitor Fetched'
      })
  }

  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}

export const update = async (req, res) => {
  try {

      const update = await db.getRepository(Exhibitor).update(
        {id:req.params.id},
          req.body,
         )
      if (update)
          return res.send({
              status: true,
              message: 'Exhibitor Updated'
          })
      return res.send({
          status: false,
          message: 'Failed to Updated'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}

export const updateProfile = async (req, res) => {
  try {

      const update = await db.getRepository(Exhibitor).update(
        { id: req['exhibitor'].id },
          req.body
         )
      if (update)
          return res.send({
              status: true,
              message: 'Succesfully Updated'
          })
      return res.send({
          status: false,
          message: 'Failed to Updated'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: err
      })
  }
}

export const deleteA = async (req, res) => {

  try {
      if (!req.params.id) {
          return res.send({
              status: false,
              message: "Invalid data"
          })
      }

      const deleted = await db.getRepository(Exhibitor).delete({
        
           id: req.params.id
       
      })

      if (!deleted) {
          return res.send({
              status: false,
              message: "Unable to Deleted Exhibitor"
          })
      }
      return res.send({
          status: true,
          message: "Exhibitor Deleted"
      })
  } catch (err) {
      return res.send({
          status: false,
          message: "" + err
      })
  }
}

export const getOne = async (req, res) => {
  try {
      const id = req.params.id

      if (!id) {
          return res.send({
              status: false,
              message: "Invalid Data"
          })
      }

      const data = await db.getRepository(Exhibitor).findOne({
          where: {
              id: id
          }
        

      })

      if (!data) {
          return res.send({
              status: false,
              message: "Not found"
          })
      }
      return res.send({
          status: true,
          data: data,
          message: 'Exhibitor Fetched'
      })
  }

  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}



export const searchExhibitor = async (req, res) => {
  const curPage = req.query.current_page || 1;
  const pgSize = req.query.per_page || 2;
  try {
      const searchRecord = await db.getRepository(Exhibitor).findAndCount({
          where: {
              company_name: 
                  Like( '%' + req.query.company_name + '%')
              
          },
          order: {
            id:'ASC'
          },
          
          take: parseInt(pgSize),
          select: [
              'id', 'company_repName', 'company_name', 'blood_group', 'mobile_no',
              'designation', 'email', 'country',
              'role', 'exhibitor', 'pro_category'
          ]
          
      })
      return res.status(200).send({ searchRecord })
  } catch (error) {
      return res.status(500).send(error)

  }

}

export const login = async (req, res) => {

  if (!req.body.email) {
      res.send({
          status: false,
          message: "Enter a Email/Mobile"
      })
      return
  }

  if (!req.body.password) {
      res.send({
          status: false,
          message: "Enter a Password"
      })
      return
  }
  try {
      const users = await db.getRepository(Exhibitor).findOne(
          {
              where:  [
                      {
                          mobile_no: 
                              Like( '%' + req.body.email)
                          
                      },
                      {
                          email: req.body.email
                      }
                  ]
              ,
              
          }
      )
      if (users) {
          let user = users
          const passwordCheck = await compareSync(req.body.password, user.password)

          console.log("pass check " + passwordCheck);
          if (passwordCheck) {
              const token = sign(user, process.env.JWTSECRET, { expiresIn: '1h' });
              res.json({
                  status: true,
                  message: "Login Successfully",
                  token: token,
                  data: user
              });
              return
          }
          console.log("pass check " + passwordCheck);
          res.send({
              status: false,
              message: "Wrong Password"
          })
      } else {
          res.send({
              status: false,
              message: "Wrong Email or Mobile"
          })
      }
  } catch (error) {
      res.send({
          status: false,
          message: "" + error
      })
  }
}

// Exhibitor Passport
export const uploadPassport = async (req, res) => {
  try{
      const exhibitor = req.exhibitor.id;
      if(!exhibitor){
          res.send({
              status: false,
              message: "Invalid User"
          })
          return
      }

      if(!req.file){
          res.send({
              status: false,
              message: "No File Selected"
          })
          return
      }

      const passport = db.getRepository(ExhibitorPassport).create({
          ...req.body,
          exhibitor_id: exhibitor,
          passport_image: `${process.env.BASE_URL}/passport/${req.file}`
      })
      if(passport){
          await db.getRepository(Exhibitor).update( {
            id: exhibitor 
        },{
              oem_visa: true
          },)
          res.send({
              status: true,
              message: "Passport Uploaded Successfully"
          })
          return
      }else{
          res.send({
              status: false,
              message: "Passport Upload Failed"
          })
          return
      }
  }catch(err){
      return res.send({
          status: false,
          message: "Error in uploading passport"
      })
  }
}

export const getPassport = async (req, res) => {
  try{
      const exhibitor = req.exhibitor.id;
      if(!exhibitor){
          res.send({
              status: false,
              message: "Invalid User"
          })
          return
      }

      const passport = await db.getRepository(ExhibitorPassport).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(passport){
          res.send({
              status: true,
              message: "Passport Found",
              data: passport
          })
          return
      }
      res.send({
          status: false,
          message: "No Passport Found"
      })
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}


// Exhibitor Contractor
export const uploadContractor = async (req, res) => {
  try{
      const exhibitor = req.exhibitor.id;
      if(!exhibitor){
          res.send({
              status: false,
              message: "Invalid User"
          })
          return
      }

      if(!req.file){
          res.send({
              status: false,
              message: "No File Selected"
          })
          return
      }

      const passport = db.getRepository(ExhibitorContractor).create({
          ...req.body,
          exhibitor_id: exhibitor,
          authorisation_letter: `${process.env.BASE_URL}/contractor/${req.file}`
      })
      if(passport){
          await db.getRepository(Exhibitor).update({ id: exhibitor },{
              oem_booth_contractor: true
          })
          res.send({
              status: true,
              message: "Contractor Uploaded Successfully"
          })
          return
      }else{
          res.send({
              status: false,
              message: "Contractor Upload Failed"
          })
          return
      }
  }catch(err){
      return res.send({
          status: false,
          message: "Error in uploading Contractor"
      })
  }
}

export const getContractor = async (req, res) => {
  try{
      const exhibitor = req.exhibitor.id;
      if(!exhibitor){
          res.send({
              status: false,
              message: "Invalid User"
          })
          return
      }

      const passport = await db.getRepository(ExhibitorContractor).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(passport){
          res.send({
              status: true,
              message: "Contractor Found",
              data: passport
          })
          return
      }
      res.send({
          status: false,
          message: "No Contractor Found"
      })
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}

export const deleteContractor = async (req, res) => {
  try{
      const exhibitor = req.exhibitor.id;
      const id = req.params.id
      if(!exhibitor){
          res.send({
              status: false,
              message: "Invalid User"
          })
          return
      }

      const contractors = await db.getRepository(ExhibitorContractor).delete({
          
              exhibitor_id: exhibitor,
              id: id
          
      })
      if(contractors){
          res.send({
              status: true,
              message: "Contractor Deleted"
          })
          return
      }
      res.send({
          status: false,
          message: "No Contractor Found"
      })
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}

// Exhibitor Principles
export const addPrinciple = async (req, res) => {
  try{
      const exhibitor = req.exhibitor.id;
      if(!exhibitor){
          res.send({
              status: false,
              message: "Invalid User"
          })
          return
      }

      const {principles} = req.body
      if(!principles){
          return res.send({
              status: false,
              message: 'Please select Manner'
          })
      }
      const data = await db.getRepository(ExhibitorPrinciple).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(data.length > 0){
          return res.send({
              status: false,
              message: 'Principles already added'
          })
      }
      const insert = await db.getRepository(ExhibitorPrinciple).save(
        db.getRepository(ExhibitorPrinciple).create(
          
            principles.map(principle => ({
                ...principle,
                exhibitor_id: exhibitor
            })
        )
        )
      )
      if (insert){
          return res.send({
              status: true,
              message: 'Principles added'
          })
      }
      return res.send({
          status: false,
          message: 'Failed to add Principles'
      })
  }catch(err){
      return res.send({
          status: false,
          message: "Error in uploading Principle"
      })
  }
}

export const getPrinciple = async (req, res) => {
  try{
      const exhibitor = req.exhibitor.id;
      if(!exhibitor){
          res.send({
              status: false,
              message: "Invalid User"
          })
          return
      }

      const principles = await db.getRepository(ExhibitorPrinciple).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(principles){
          res.send({
              status: true,
              message: "Principle Found",
              data: principles
          })
          return
      }
      res.send({
          status: false,
          message: "No Principle Found"
      })
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}


// Confirm Exhibitor
export const confirmExhibitor = async (req, res) => {
  try {
      const exhibitor = req.params.exhibitor
      const update = await db.getRepository(Exhibitor).update(
        { id: exhibitor },{
              is_confirmed: '1'
          })
      if (update)
          return res.send({
              status: true,
              message: 'Exhibitor Confirmed'
          })
      return res.send({
          status: false,
          message: 'Failed to Confirm'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}
// Disapprove Exhibitor
export const disapproveExhibitor = async (req, res) => {
  try {
      const exhibitor = req.params.exhibitor
      const update = await db.getRepository(Exhibitor).update(
        { id: exhibitor },{
              is_confirmed: '0'
          })
      if (update)
          return res.send({
              status: true,
              message: 'Exhibitor Disapporved'
          })
      return res.send({
          status: false,
          message: 'Failed to Disapporve'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}

// Assign Stall
export const assignStall = async (req, res) => {
  try {
      const exhibitor = req.params.exhibitor
      const stalls = req.body.stalls
      if (!exhibitor)
          return res.send({
              status: false,
              data: '',
              message: 'Please select Exhibitor'
          })

      if (!stalls || !stalls.length)
          return res.send({
              status: false,
              data: '',
              message: 'Please select Stall'
          })
      console.log(stalls)
      const update = await db.getRepository(Stall).update(
        { id: stalls },
          {
              exhibitor_id: exhibitor
          })
      if (update)
          return res.send({
              status: true,
              message: 'Succesfully Assigned Stall'
          })
      return res.send({
          status: false,
          message: 'Failed to Assign'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}

// De-Assign Stall
export const deAssignStall = async (req, res) => {
  try {
      const exhibitor = req.params.exhibitor
      const stall = req.params.stall
      if (!exhibitor)
          return res.send({
              status: false,
              data: '',
              message: 'Please select Exhibitor'
          })

      if (!stall)
          return res.send({
              status: false,
              data: '',
              message: 'Please select Stall'
          })

      const update = await db.getRepository(Stall).update(
        { id: stall },{
              exhibitor_id: null
          })
      if (update)
          return res.send({
              status: true,
              message: 'Succesfully removed Stall'
          })
      return res.send({
          status: false,
          message: 'Failed to remove'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}

// Get Orders
export const getOrders = async (req, res) => {
  try {
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      const orders = await db.getRepository(VendorOrder).find({
         
          where: {
              exhibitor_id: exhibitor,
              
          }
      })
      if (orders)
          return res.send({
              status: true,
              data: orders,
              message: 'Order Fetched'
          })
      return res.send({
          status: false,
          message: 'Failed to get Orders'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}

export const getOrderDetail = async (req, res) => {
  try {
      console.log(req.params)
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      const order = await db.getRepository(VendorOrder).findOne({
          where: {
              exhibitor_id: exhibitor,
              id: req.params.id
          },
          
      })
      if (order)
          return res.send({
              status: true,
              data: order,
              message: 'Order Fetched'
          })
      return res.send({
          status: false,
          message: 'Failed to get Orders'
      })
  }
  catch (err) {
      res.send({
          status: false,
          message: "" + err
      })
  }
}

// OEM Progress
export const getOEMProgress = async (req, res) => {
  // sequalize calculate all field and return percentage of completion
  try {
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      const data = await db.getRepository(Exhibitor).findOne({
          select: [
              'oem_user_profile',
              'oem_fascia',
              'oem_exhibitor_badges',
              'exhibitor_deliverables_correct',
              'oem_power_requirement',
              'oem_furniture_requirement',
              'oem_host_hostess',
              'oem_bare_space_stall_design',
              'oem_booth_contractor',
              'oem_visa',
              'oem_indemnity_undertaking',
              'oem_health_undertaking',
              'oem_participation',
              'oem_catalog_entry'
          ],
          where: {
              id: exhibitor
          }
      })
      if (data){
          // count how many emtpy field are there from data
          let empty_count = 0;
          const obj = data
          const count = Object.keys(obj).length;
          Object.keys(obj).forEach(function(key) {
              if( obj[key] == null || obj[key] == '' || obj[key] == 0 || obj[key] == false ){
                  empty_count++
              }
          });
          // console.log(obj);
          // console.log(count);
          // console.log(empty_count);
          return res.send({
              status: true,
              data: {
                  oem: {
                      progress: ((count - empty_count) / count * 100).toFixed(2),
                  }
              },
              message: 'OEM Progress Fetched'
          })
      }
      return res.send({
          status: false,
          message: 'Failed to get OEM Progress'
      })
  }catch(err){
      res.send({
          status: false,
          message: "" + err
      })
  }
}

// Export as CSV file
export const exhibitor = async(req,res)=>{

  const fs = require("fs");
      const {resolve} = require("path")
      var path = resolve(process.cwd()+'/public/export')
      console.log(path);

      // check for folder or create one
      if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
          console.log('created export folder')
      }else{
          console.log('not exists')
      }

  try{

      const data = await db.getRepository(Exhibitor).find()
      const fields = [
          'id',
          'company_name',
          'company_repName',
          'designation',
          'pro_category',
          'blood_group',
          'mobile_no',
          'email',
          'city',
          'state',
          'country',
          'createdAt'
      ]
      const json2csv = require('json2csv').parse
      const csv = json2csv(data, { fields })
      res.setHeader('Content-disposition', 'attachment; filename=visitor.csv');
      res.set('Content-Type', 'text/csv');

      // var path='./public/csv/visitor'+Date.now()+'.csv'; 
      path = resolve(process.cwd()+'/public/export/exhibitor'+Date.now()+'.csv')
                 fs.writeFile(path, csv, function(err,data) {
                  if (err) { console.log(err); throw err;}
                  else{ 
                      console.log(path)
                      res.download(path); // This is what you need
                  }
      }); 
      // return res.status(200).send(csv);
  }
  catch(err){
      return res.send({
          status:false,
          message: ""+err
      })
  }
}

// Exhibitor Manner Controllers

export const getManners = async (req, res) => {
  try {
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      const data = await db.getRepository(ExhibitorManning).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if (data){
          return res.send({
              status: true,
              data: data,
              message: 'Manners Fetched'
          })
      }
      return res.send({
          status: false,
          message: 'Failed to get Manner'
      })
  }catch(err){
      return res.send({
          status: false,
          message: ""+err
      })
  }
}

export const addManners = async (req, res) => {
  // Add list of manners to exhibitor_manner table
  try {
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      const {manners} = req.body
      if(!manners){
          return res.send({
              status: false,
              message: 'Please select Manner'
          })
      }
      const data = await db.getRepository(ExhibitorManning).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(data.length > 0){
          await db.getRepository(ExhibitorManning).delete({
              
                  exhibitor_id: exhibitor
              
          })
      }
      const insert = await db.getRepository(ExhibitorManning).save(
        db.getRepository(ExhibitorManning).create(
          manners.map(manner => ({
            ...manner,
            exhibitor_id: exhibitor
        })
        )
      ))
      if (insert){
          await db.getRepository(Exhibitor).update({ id: exhibitor },{
              oem_exhibitor_badges: true
          })
          return res.send({
              status: true,
              message: 'Badges added'
          })
      }
      return res.send({
          status: false,
          message: 'Failed to add Manner'
      })
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}

export const updateManners = async (req, res) => {
  // Update list of manners to exhibitor_manner table
  try {
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      const {manners} = req.body
      if(!manners){
          return res.send({
              status: false,
              message: 'Please select Manner'
          })
      }
      const data = await db.getRepository(ExhibitorManning).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(data.length > 0){
          await db.getRepository(ExhibitorManning).delete({
             
                  exhibitor_id: exhibitor
              
          })
      }
      const insert = await db.getRepository(ExhibitorManning).save(db.getRepository(ExhibitorManning).create(
          manners.map(manner => ({
                  ...manner,
                  exhibitor_id: exhibitor
              })
          )
      ))
      if (insert){
          return res.send({
              status: true,
              message: 'Manners updated'
          })
      }
      return res.send({
          status: false,
          message: 'Failed to update Manner'
      })
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}

export const deleteManners = async (req, res) => {
  // Delete list of manners from exhibitor_manner table
  try {
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      const {manners} = req.body
      if(!manners){
          return res.send({
              status: false,
              message: 'Please select Manner'
          })
      }
      const data = await db.getRepository(ExhibitorManning).find({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(data.length > 0){
          await db.getRepository(ExhibitorManning).delete({
             
                  exhibitor_id: exhibitor
              
          })
      }
      return res.send({
          status: true,
          message: 'Manners deleted'
      })
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}

export const exhibitorContactUpdate = async (req, res) => {
  // create or update exhibitor contact
  try {
      const exhibitor = req.exhibitor.id
      if(!exhibitor){
          return res.send({
              status: false,
              message: 'Please login'
          })
      }
      
      const data = await db.getRepository(ExhibitorContractor).findOne({
          where: {
              exhibitor_id: exhibitor
          }
      })
      if(data){
          const update = await db.getRepository(ExhibitorContractor).update(data,{
              ...req.body
          })
          if(update){
              return res.send({
                  status: true,
                  message: 'Contact updated'
              })
          }
          return res.send({
              status: false,
              message: 'Failed to update contact'
          })
      }
      const insert = await db.getRepository(ExhibitorContractor).save(db.getRepository(ExhibitorContractor).create({
          ...req.body,
          exhibitor_id: exhibitor
      }))
      if(insert){
          return res.send({
              status: true,
              message: 'Contact added'
          })
      }
      return res.send({
          status: false,
          message: 'Failed to add contact'
      })
  }
  catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}

// Exhibitor Charts & Graphs
export const getExhibitorCharts = async (req, res) => {
  // get exhibitor count by pro_category
  try {
      const exhibitor = await db.getRepository(Exhibitor).find({
          select: [
               'pro_category',
          ],
      })

      if(exhibitor){
          return res.send({
              status: true,
              data: exhibitor
          })
      }
  }catch(err){
      return res.send({
          status: false,
          message: err.message
      })
  }
}

export const requestBadges = async (req, res) => {
  await sendRequestBadge({
      to: req.exhibitor.email
  })

  res.send({
      status: true,
      message: 'Request sent'
  })
}

// OEM Controllers
export const oem_remarks = async (req, res) => {
  try {
  const remarkBody = req.body
  const exhibitorId = req.body.exhibitorId
  const oem_form = req.body.oem_form_name
  const remarkCreate = await db.getRepository(OEMRemark).save(db.getRepository(OEMRemark).create({ 
      remarkBy: req.admin.id,    
      ...remarkBody
  }))

  if(!remarkCreate){
      return res.send({
          status: false,
          message: 'Invalid Data Received'
      })
  }

  // oem form open login starts here
  // CATALOGUE
  if(oem_form == 'catalogue'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_catalog_entry: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Catalogue form opened!"
          })
      }
  }
  // FASCIA
  if(oem_form == 'fascia'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_fascia: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Fascia form opened!"
          })
      }
  }
  // BADGES
  if(oem_form == 'badges'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_exhibitor_badges: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Badges form opened!"
          })
      }
  }
  // POWER REQUIREMENT
  if(oem_form == 'power_requirement'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_power_requirement: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Power Requirement form opened!"
          })
      }
  }
  // BARE SPACE
  if(oem_form == 'bare_space'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_bare_space_stall_design: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Bare Space form opened!"
          })
      }
  }
  // Deliverables 
  if(oem_form == 'exhibitor_deliverable'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          exhibitor_deliverables_correct: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Deliverables form opened!"
          })
      }
  }
  // Furniture Requirement
  if(oem_form == 'furniture_requirement'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_furniture_requirement: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Furniture Requirement form opened!"
          })
      }
  }
  // Health Undertaking
  if(oem_form == 'health_undertaking'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_health_undertaking: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Health Undertaking form opened!"
          })
      }
  }
  // Host & Hostess
  if(oem_form == 'host_hostess'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_host_hostess: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Host & Hostess form opened!"
          })
      }
  }
  // Indemnity Undertaking
  if(oem_form == 'indemnity_undertaking'){
      const formUpdate = await db.getRepository(Exhibitor).update( {
        id: exhibitorId
    },{
          oem_indemnity_undertaking: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Indemnity Undertaking form opened!"
          })
      }
  }
  // Participation
  if(oem_form == 'participation'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_participation: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Participation form opened!"
          })
      }
  }
  // User Profile
  if(oem_form == 'user_profile'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_user_profile: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "User Profile form opened!"
          })
      }
  }
  // Visa
  if(oem_form == 'visa'){
      const formUpdate = await db.getRepository(Exhibitor).update(
        {
          id: exhibitorId
      }
        ,{
          oem_visa: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Visa form opened!"
          })
      }
  }
  // Booth Contractor
  if(oem_form == 'booth_contractor'){
      const formUpdate = await db.getRepository(Exhibitor).update({
        id: exhibitorId
    },{
          oem_booth_contractor: false
      })
      if(formUpdate){
          return res.send({
              status: true,
              message: "Booth Contractor form opened!"
          })
      }
  }
  } catch (error) {
      return res.send({
          status: false,
          message: error.message
      })
  }
}


export const exportExhibitor = async (req, res) => {
  const fs = require("fs");
      const {resolve} = require("path")
      var path = resolve(process.cwd()+'/public/export/balle')
      console.log(path);

      // check for folder or create one
      if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
          console.log('created export folder')
      }else{
          console.log('directory exists')
      }

  try{

      const data = await db.getRepository(Exhibitor).find({
          where: {
              
          },
          
      })
      
      let content = [];

      // return res.send({
      //     data: data
      // })
      // for (var i = 0; i < data.length; i++) {
      //     var hall = data[i].stall.length > 0 ? data[i].stall[0].hall: '';
      //     var stall = data[i].stall.length > 0 ? data[i].stall[0].stall_no: '';

      //     content.push([
      //         hall,
      //         stall,
      //         data[i].company_name,
      //         data[i].company_repName,
      //         data[i].designation,
      //         data[i].pro_category,
      //         data[i].mobile_no,
      //         data[i].email,
      //         data[i].city,
      //         data[i].state,
      //         data[i].country,

      //     ]);
      // }
      const { stringify } = require('csv-stringify');

      res.setHeader('Content-disposition', 'attachment; filename=badges.csv');
      res.set('Content-Type', 'text/csv');

      const fields2 = {
          'hall' : 'Hall',
          'stall' : 'Stall No',
          'company_name' : 'Company Name',
          'company_repName' : 'Company Representative Name',
          'designation' : 'Designation',
          'pro_category' : 'Pro Category',
          'mobile_no' : 'Mobile Number',
          'email' : 'Email Address',
          'city' : 'City',
          'state' : 'State',
          'country' : 'Country',

        
      }

      path = resolve(process.cwd()+'/public/export/exhibitor'+Date.now()+'.csv')
      stringify(content, { header: true, columns: fields2 }, (err, output) => {
          if (err) throw err;
          fs.writeFile(path, output, (err) => {
              if (err) { console.log(err); throw err;}
              else{ 
                  console.log(path)
                  res.download(path); // This is what you need
              }
          });
        });
      // return res.status(200).send(csv);
  }
  catch(err){
      return res.send({
          status:false,
          message: ""+err
      })
  }
  
}