import joi from "joi"
export const signUpSchema=joi.object({
    name:joi.string().required().messages({
        "string.empty":"Trường name không được bỏ trống",
        "any.required":"Trường name là bắt buộc",
    }),
    email:joi.string().email().required().messages({
        "string.empty":"Trường email không được bỏ trống",
        "any.required":"Trường email là bắt buộc",
        "string.email":"Email không đúng định dạng"
    }),
    password:joi.string().required().messages({
        "string.empty":"Trường password không được bỏ trống",
        "any.required":"Trường password là bắt buộc",
        
    }),
    confirmPassword:joi.string().valid(joi.ref("password")).required().messages({
        "string.empty":"Trường confirmPassword không được bỏ trống",
        "any.required":"Trường confirmPassword là bắt buộc",
        "any.only":"Password không khớp"
        
    })
})

export const signInSchema=joi.object({
  
    email:joi.string().email().required().messages({
        "string.empty":"Trường email không được bỏ trống",
        "any.required":"Trường email là bắt buộc",
        "string.email":"Email không đúng định dạng"
    }),
    password:joi.string().required().messages({
        "string.empty":"Trường password không được bỏ trống",
        "any.required":"Trường password là bắt buộc",
        
    })
    
})