import * as nodemailer from "nodemailer";
import { Users } from "../model/user.model";
import * as fs from "fs";
import { config } from "dotenv";
import { promisify } from "util";
import * as path from "path";
const key = {
  type: "service_account",
  project_id: "boiler-india-2022",
  private_key_id: "9f3cfc8db3334aa9c715ffe6dd27c393d5fdff6a",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTP3YVJnmcTH6h\n+iwiWtSbFETj6VqargkTlVybBTa4HUyWPrnTztUXXrTQkC/ZDvIS0LQU5K6M/ion\naFZJ0TnAaLIT8mrjzdS3znGlfHqEizB/whojeZn9pQlkepZNiwWk1UPdAUEqU+fV\nxW4qxDAJDyScZd72AWZwkXN90P7SNlDuy+jCX4F032ppbSwQXNUHSZnpUAbWhTVs\nHtlUjY2EsP8V/5shZneVb2qxBk6/Gdidpiw6MRqwh3oK9vlo/ga0HFSYl74sIdtN\ngUoOPHAifHzSWDXieAW4FWF2a6Bz6+DxsN+xREDvs/V32P3keOARNAQtb3YR+tt9\nqB+eWYVjAgMBAAECggEAEy/vCSn1RV8+G6o+B5TM1y62uL8n4QEwhw9u80M8kbaF\n9hn80ojPAN0Arim0Ht8yDGFzQ3gnhPWxw670MqcG7tU5/E1teTZN1uNKatrs9rL8\n+1QYma/gbvhmUcw/1wueJJ2cspGVmkM3ihdXoH/9uPG5XcQNX1AIC1UHjDfHNwKL\nm9Obhh0OE61j91ysCtVfn1DMqiyBGQvedsL6cvbehHd9c8iIC/V5uKf3xyA1fbuH\nEak2+Xqu8RgKMT34n1SaAGZs6YrUXxFICgvNfgDw7wqVKs0TCJkOxI5UvkB4t9RO\nlFZTv++VKQKAZMdgED68zgefTkHyshqU1QWG7FhsyQKBgQD6StKHekxAge5anOsM\nQeCuu5LznWm7ANgG4NJQ9FPgNz6N5+jqdyhPNaBq95UtYQbTTVMgUaqTECKL5oEU\nhk6vo/yBcA9zi/XkiCAMvfNRFgJEPrYC9BcAJ8I1PgfLG+Yd1RoxdciebW4S4oZ9\nlPKv2BWiWDwp1Ex1oTfCqdZPtwKBgQDYELPH0iKkTin5ewbVUJ8nh89I1gmcKgfc\nQ1AgqgCEljjgkEF67cz2HH25U9OxFIqG5IDzNcECTsBtTxKmUvByNWR76rnffhUj\n4RdkO/Exa/1bFfMpTaAsgE4X/aR/xiBfyDsxkAlWOXOtnPYn8K+2lc4Q7y67h90u\n2xK0wzQftQKBgQCZNPuxmhba1a3FIZBvLFQQIRlOrehuY5HYg/25OBWvhaFw06gq\n/U1bTwQm9e4GnQHEjex4OAUliBbdc/dHTP8VXFfQE3whymZ1wS19Hzi1RbeVdp2L\nKUZ6/dtPI+05UpaFZFBoPiTTdUCPpsGUVXxITwjPGxuYry8uQcUUD0nz+QKBgBh4\n89P7Mh9IFysBy0lYA17X3BuU2qvMeu1w1l+MwdhCp5iP3krNKnzpxze5je2ttO8I\nbK6fdQgM4XDAFw2tsTxOXd5HPNxajIxuz1Z0D6KYZ67scolIGI9RzQacnQg36azP\nohzAAr64bSjJ8XueoFhe6WMzpChrgBrxh1HgFkRNAoGAZK+r0I6ZwrJy0XkhEG4I\n6+BKfelQ7oyqZAR+qAaDriEui04AD8I6eWRh9RgwAkjEeBiZufUCb9GqfiBhxc7G\nzER7Aak10loETqJOFxuuQjwzN2LHtOemxrlYfuTxaVTgfIEcijI5xUfVMoC+jJrj\nVkpnkD4UXB3W0wMnTOdMFsU=\n-----END PRIVATE KEY-----\n",
  client_email: "boiler-world-expo@boiler-india-2022.iam.gserviceaccount.com",
  client_id: "108448369640926618518",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/boiler-world-expo%40boiler-india-2022.iam.gserviceaccount.com",
};
config();
const readfile = promisify(fs.readFile);
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER_3, // generated ethereal user
    serviceClient: key.client_id,
    privateKey: key.private_key,
  },
});
export const sendEmail = async (user:any)=>{
    try{
        await transporter.verify();
        console.log(__dirname, '/emailOTP.html');
        const filePath = path.join(__dirname, 'emailOTP.html');
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: user.to, // list of receivers
            subject: `OTP for registration`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>
            <style>
                .otp {
                    font-family: 'Quicksand', sans-serif;
                }
            
                .text-center {
                    text-align: center;
                }
            </style>
            
            <body>
            
                <div class="container text-center" style="text-align: center;">
                    <img src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png">
                    <br>
                    <h2><b>Verification Code</b></h2>
                    <h1 class="otp">${user.otp}</h1>
                    <h3>Here is your OTP verification Code</h3>
            
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendForgetPasswordEMail = async (user) => {
    try{
        await transporter.verify();
        console.log(__dirname, '/emailOTP.html');
        const filePath = path.join(__dirname, 'emailOTP.html');
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: user.to, // list of receivers
            subject: `Password reset`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>
            <style>
                .otp {
                    font-family: 'Quicksand', sans-serif;
                }
            
                .text-center {
                    text-align: center;
                }
                .btn{
                    padding: .5rem 1rem;
                    font-size: 1.25rem;
                    line-height: 1.5;
                    border-radius: .3rem;
                }
                .btn-primary {
                    color: #fff;
                    background-color: #007bff;
                    border-color: #007bff;
                }
            </style>
            
            <body>
            
                <div class="container text-center" style="text-align: center;">
                    <img src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png">
                    <br>
                    <h2><b>Visit this link to reset password</b></h2>
                    <h1 class="otp">
                        <a href='${user.link}' target='_blank'>
                            <button 
                            style="
                            display: inline-block;
                            text-align: center;
                            cursor: pointer;
                            border: 1px solid transparent;
                            padding: .5rem 1rem;
                            font-size: 1.25rem;
                            line-height: 1.5;
                            border-radius: .3rem;
                            color: #fff;
                            background-color: #007bff;
                            border-color: #007bff;
                            ">Reset Password</button>
                        </a>
                    </h1>
            
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendWelcomeEmail = async (user) => {
    try{
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: user.to, // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <img src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png">
                    <br>
                    <h2><b>Registration Successfull</b></h2>
                    <h3>Our representative will get in touch with you soon.</h3>
                    <h3>In the meanwhile <a href="https://app.boilerworldexpo.com/login">Sign In</a> to submit stall preferences.</h3>
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export  const sendWelcomeExhibitor = async(user) => {
    try{
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: user.to, // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <img src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png">
                    <br>
                    <h2><b>Congratulations! You have successfully registered as an exhibitor!</b></h2>
                    <h3>
                        To proceed with your stall booking, kindly send an email to shraddha@orangebeak.com
                    </h3>
                    <h3>
                        If you have already booked a stall, kindly login at https://app.boilerworldexpo.com/ using your email id and password and start filling the Online Exhibitor Manual Forms.
                    </h3>
                    <h3>
                        In case of any doubts or queries, kindly contact Anosh: +91 84463 02245
                    </h3>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=Name=${user.company_repName};No=${user.mobile_no};Email=${user.email};Company=${user.company_name};Role=exhibitor;Designation=${user.designation}">
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendWelcomeEmailVisitor = async (user) => {
    try{
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: user.to, // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <img src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png">
                    <br>
                    <h2><b>Congratulations! You have registered successfully.</b></h2>
                    <h3>
                        Kindly carry a print of the below QR code to the venue for entry to the expo and collect your badge from the registration counter.
                    </h3>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=Name=${user.company_repName};No=${user.mobile_no};Email=${user.email};Company=${user.company_name};Role=visitor;Designation=${user.designation}">
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendWelcomeEmailDelegate = async (user) => {
    try{
        let days = '';
        if(user.day_1 == 1){
            days += '1,';
        }
        if(user.day_2 == 1){
            days += '2,';
        }
        if(user.day_3 == 1){
            days += '3';
        }
        let qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=Name=${user.name};No=${user.mobile_no};Email=${user.email};Company=${user.company_name};Day=${days};Hall=${user.hall};Category=${user.category};Role=delegate;Designation=${user.designation}`;
        if(user.category == 'Academician/Student'){
            qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=Name=${user.name};No=${user.mobile_no};Email=${user.email};Institute=${user.institute};Day=${days};Hall=${user.hall};Category=${user.category};Role=delegate;Branch=${user.branch}`;
        }
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: user.to, // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <img src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png">
                    <br>
                    <h2><b>Congratulations! You have registered for the seminar successfully.</b></h2>
                    
                    <h3>
                        To proceed with your stall booking, kindly send an email to shraddha@orangebeak.com
                    </h3>
                    
                    <h3>
                        Kindly carry a print of the below QR code to the venue for entry to the seminar and collect your badge and seminar kit from the registration counter.
                    </h3>
                    <h3>
                        This pass is also valid for entry to the exhibition as a visitor for all 3 days
                    </h3>
                    <img src="${qrUrl}">
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendIntimationEmail = async (user) => {
    try{
        let d = new Date();
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: 'shraddha@orangebeak.com', // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <h2>New Lead Generated On ${d}</h2>
                    <h3>Company: ${user.company_name}</h3>
                    <h3>Name: ${user.company_repName}</h3>
                    <h3>Designation: ${user.designation}</h3>
                    <h3>Email: ${user.email}</h3>
                    <h3>Mobile: ${user.mobile_no}</h3>
                    <h3>Category: ${user.pro_category}</h3>
                    <h3>City: ${user.city}</h3>
                    <h3>State: ${user.state}</h3>
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendIntimationEmailForVisitor = async (user) => {
    try{
        let d = new Date();
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: 'shraddha@orangebeak.com', // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <h2>New Visitor Registration On ${d}</h2>
                    <h3>Company: ${user.company_name}</h3>
                    <h3>Name: ${user.company_repName}</h3>
                    <h3>Designation: ${user.designation}</h3>
                    <h3>Email: ${user.email}</h3>
                    <h3>Mobile: ${user.mobile_no}</h3>
                    <h3>Category: ${user.profession}</h3>
                    <h3>City: ${user.city}</h3>
                    <h3>State: ${user.state}</h3>
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendIntimationEmailForDelegate = async (user) => {
    try{
        let d = new Date();
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: 'shraddha@orangebeak.com', // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <h2>New Delegate Registration On ${d}</h2>
                    <h3>Company: ${user.company_name}</h3>
                    <h3>Name: ${user.name}</h3>
                    <h3>Designation: ${user.designation}</h3>
                    <h3>Email: ${user.email}</h3>
                    <h3>Mobile: ${user.mobile_no}</h3>
                    <h3>Category: ${user.category}</h3>
                    <h3>City: ${user.city}</h3>
                    <h3>State: ${user.state}</h3>
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendStallPreferenceIntimation = async (user) => {
    try{
        let d = new Date();
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: 'shraddha@orangebeak.com',
            subject: `Stall Preference Submission`, // Subject line
            html: `<!DOCTYPE html>
            <html>
                <body>
                    <h1 style="color: #5e9ca0; text-align: center;"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png" alt="" /><span style="font-size: 14px;">&nbsp;</span>Stall Preference Submission!</h1>
                    <p><strong>Stall Preference has been submitted by Exhibitor <span style="text-decoration: underline;">Tech World</span> on ${d}.</strong></p>
                    <p><strong>Company: ${user.company_name}</strong></p>
                    <p><strong>Name: ${user.company_repName}</strong></p>
                    <p><strong>Designation: ${user.designation}</strong></p>
                    <p><strong>Email: ${user.email}</strong></p>
                    <p><strong>Category: ${user.pro_category}</strong></p>
                    <p><strong>City: ${user.city}</strong></p>
                    <p><strong>State: ${user.state}</strong></p>
                    <p><strong>&nbsp;</strong></p>
                </body>
            </html>
            `}
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendRequestBadge = async (user) => {
    try{
        await transporter.verify();
        const mailOptions = {
            from: `${user.to} <${user.to}>`, // sender address
            to: 'anosh@orangebeak.com', // list of receivers
            subject: `Additional Exhibitor Badges Required`, // Subject line
            html: `<p>Request from ${user.to}</p>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}

export const sendTestTemplate = async(user) => {
    try{
        await transporter.verify();
        const mailOptions = {
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`, // sender address
            to: user.to, // list of receivers
            subject: `Registration Successful`, // Subject line
            html: `<!DOCTYPE html>
            <html>
            
            <head>
            
            </head>            
            <body>
            
                <div style="text-align: center;">
                    <img src="https://app.boilerworldexpo.com/assets/BWA_Logo_horizontal.png">
                    <br>
                    <h2><b>Congratulations! You have registered for the seminar successfully.</b></h2>
                    <h3>
                        To proceed with your stall booking, kindly send an email to shraddha@orangebeak.com
                    </h3>
                    <h3>
                        Kindly carry a print of the below QR code to the venue for entry to the seminar and collect your badge and seminar kit from the registration counter.
                    </h3>
                    <h3>
                        This pass is also valid for entry to the exhibition as a visitor for all 3 days
                    </h3>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=Name=${user.company_repName};No=${user.mobile_no};Email=${user.email};Company=${user.company_name}">
                </div>
            
            </body>
            
            </html>`
        };
        await transporter.sendMail(mailOptions);
    } catch(err){
        console.error(err)
    }
}
