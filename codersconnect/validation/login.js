const validator = require('validator')


module.exports = function validateLoginData(data){
    var errors = {}
    let isValid = true
    if(data.email===undefined) data.email = ''
    if(data.password===undefined) data.password = ''

    if(!validator.default.isEmail(data.email)){
        errors.email = "Email is Invalid"
        isValid = false
    }
    if(validator.default.isEmpty(data.password)){
        errors.name = "Please enter password"
        isValid =false
    }
    if(!validator.default.isLength(data.password,{min:6,max:20})){
        errors.password = "Length of password should be 6 characters"
        isValid = false
    }
    if(validator.default.isEmpty(data.email)){
        errors.name = "Please enter email"
        isValid = false
    }
    return{
        errors,
        isValid
    }
}