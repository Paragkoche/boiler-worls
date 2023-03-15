import axios from "axios"
import {config} from "dotenv"
config();
export const generateOTP=()=> {
          
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
  
    return OTP;
}

export const sendOTP = async (user) => {
  const headers = {
    headers: {
      "content-type": "application/json",
      "api-key": process.env.KALYERA_API_KEY
    }
  }
    return await axios.post(`https://api.kaleyra.io/v1/${process.env.SID}/messages`, {
        to: user.to,
        type: "OTP",
        sender: process.env.SENDER_ID,
        body: `${user.otp} is your mobile verification code to register with Boiler World Africa 2023 organised by Orangebeak Technologies Pvt Ltd.`,
        template_id: process.env.KALYERA_OTP_TEMPLATE_ID
      }, headers)
      .then(function (response) {
        console.log(response)
        return response.data
      })
      .catch(function (error) {
        console.log(error)
        return error.data
      });
}
  module.exports={
      generateOTP,
      sendOTP
    }