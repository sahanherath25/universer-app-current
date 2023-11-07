import validate from "validate.js";

export  const validateLength=(inputId, inputValue,minLength,maxLength,allowEmpty)=>{

    const constraints = {
        presence: {allowEmpty},
    }
    //HEre we not allow to submit empty values
    if (!allowEmpty || inputValue !== "") {
        constraints.length = {}

        if(minLength !=null){
            constraints.length.minimum=minLength;
        }

        if(maxLength !=null){
            constraints.length.maximum=maxLength;

        }
    }
    const validationResults=validate({[inputId]: inputValue}, {[inputId]: constraints})
    return validationResults && validationResults[inputId]

}

export  const validateString=(inputId, inputValue)=>{

    const constraints = {
        presence: {allowEmpty: false},
    }
    if (inputValue !== "") {
        constraints.format = {
            pattern: "[a-z]+",
            flags: "i",
            message: "Values can contain only letters"
        }
    }
    const validationResults=validate({[inputId]: inputValue}, {[inputId]: constraints})
    return validationResults && validationResults[inputId]

}

export const validateEmail=(inputId,inputValue)=>{
    const constraints = {
        presence: {allowEmpty: false},
    }
    if (inputValue !== "") {
        constraints.email=true;

    }
    const validationResults=validate({[inputId]: inputValue}, {[inputId]: constraints})
    return validationResults && validationResults[inputId]

}

export const validatePassword=(inputId,inputValue)=>{
    const constraints = {
        presence: {allowEmpty: false},
    }
    if (inputValue !== "") {
        constraints.length= {
            minimum:6,
            message:"Password Must Be At Least 6 Characters"
        }

    }
    const validationResults=validate({[inputId]: inputValue}, {[inputId]: constraints})
    return validationResults && validationResults[inputId]

}


