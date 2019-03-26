/**
* Check if the input body has the same parameters as we
* expect it to have.
*/
const checkFields = (input, expected) => {
    for (const field in expected) {
        if (typeof input[field] !== expected[field] || input[field].trim() === "") {
            return false;
        }
    }
    return true;
};


/**
* Checks input for the register form.
*/
const registerForm = body => {
    const fields = {
        "firstName" : "string",
        "lastName" : "string",
        "address" : "string",
        "city" : "string",
        "phone" : "string",
        "email" : "string",
        "password" : "string",
        "passwordConfirm" : "string",
    };
    
    return checkFields(body, fields);
};

/**
* Checks input for the login form.
*/
const loginForm = body => {
    const fields = {
        "email" : "string",
        "password" : "string"
    };
    
    return checkFields(body, fields);
};

const smsForm = body => {
    const fields = {
        "unique" : "string",
        "smsCode" : "string"
    };
    
    return checkFields(body, fields);
};


module.exports = {
    registerForm,
    loginForm,
    smsForm
}