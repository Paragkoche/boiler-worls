import * as joi from "joi"
export const settingSchema = joi.object({
    type:joi.string().required(),
    time:joi.string().required()
})
export const exhibitorRegistration = joi.object({
    company_repName:joi.string().required().messages({
        'any.required': `Company representative name is a required field`
      }),
    company_name:joi.string().required(),
    blood_group:joi.string().required(),
    mobile_no:joi.string().required(),
    email:joi.string().email().required(),
    designation:joi.string().required(),
    city:joi.string().required(),
    state:joi.string().required(),
    country: joi.string().required(),
    password:joi.string().required(),
    cpassword:joi.string().required(),
    pro_category:joi.string().required(),
    exhibitor:joi.string().optional(),
})