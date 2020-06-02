const validator = require('validator')


module.exports = function validateRegisterData(data){
    var errors = {}
    let isValid = true
    if(data.email===undefined) data.email = ''
    if(data.password===undefined) data.password = ''
    if(data.name===undefined) data.name = ''

    if(!validator.default.isLength(data.name,{min:2,max:30})){
        errors.name = "Name must be between 2 and 30 characters"
        isValid = false
    }
    if(validator.default.isEmpty(data.name)){
        errors.name = "Please enter name"
    }
    if(!validator.default.isEmail(data.email)){
        errors.email = "Email is Invalid"
        isValid = false
    }
    if(validator.default.isEmpty(data.password)){
        errors.password = "Please enter password"
    }
    if(!validator.default.isLength(data.password,{min:6,max:20})){
        errors.password = "Length of password should be 6 characters"
        isValid = false
    }
    if(validator.default.isEmpty(data.email)){
        errors.name = "Please enter email"
    }
    console.log(errors,data)
    return{
        errors,
        isValid
    }
}