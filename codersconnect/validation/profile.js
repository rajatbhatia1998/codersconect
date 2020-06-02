const validator = require('validator')

module.exports = function validateProfileData (data){
    const errors = {}
    var isValid = true
    if(data.status===undefined) data.status = ''
    if(data.skills===undefined) data.skills = ''

    if(!validator.default.isLength(data.status,{min:2,max:6})){
        errors.status = "Length should be greater than 2"
        isValid = false
    }
    if(validator.default.isEmpty(data.skills)){
        errors.skills = "There must be Some Skills"
        isValid = false
    }
    if(validator.default.isEmpty(data.status)){
        errors.status = "There must be Some status"
        isValid = false
    }
    

    return{
        errors,
        isValid
    }
   
}