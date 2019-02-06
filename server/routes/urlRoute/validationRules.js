
const urlInterface = require("./urlInterface");

const ERRORS = {
    URL_NOT_FOUND: "Url property was not found in json body",
    INVALID_URL: "The url you tried to enter is not valid",
}


module.exports = {
    createUrl: (req,_,next) => {
        const { url } = req.body;
        if(!req.body.url){
            req.validationErrors = [ERRORS.URL_NOT_FOUND]
        }
        const errors = [];
        if(!urlInterface.isValid(url)){
            errors.push(ERRORS.INVALID_URL);
        }
        req.validationErrors = errors;
        next();
    }
}