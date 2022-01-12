const validator = require ("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.country = !isEmpty(data.country) ? data.country : "";
    data.healthCardNumber = !isEmpty(data.healthCardNumber) ? data.healthCardNumber : "";

    if (!validator.isLength(data.firstName, {min: 2, max: 30})){
        errors.name = "First name must be between 2 and 30 characters";
    }
    if (validator.isEmpty(data.firstName)) {
        errors.name = "First name is required.";
    }

    if (!validator.isLength(data.lastName, {min: 2, max: 30})){
        errors.name = "Last name must be between 2 and 30 characters";
    }
    if (validator.isEmpty(data.lastName)) {
        errors.name = "Last name is required.";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }   
    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required.";
    } 

    if (validator.isEmpty(data.country)) {
        errors.country = "Country code is required.";
    }

    // TODO: add health card validation (external API service?)
    if (validator.isEmpty(data.healthCardNumber)) {
        errors.healthCardNumber = "Healthcard number is required.";
    }

    if (!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be between 6 and 30 characters.";
    }  
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required.";
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
};