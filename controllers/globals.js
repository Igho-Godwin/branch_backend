const { v4: uuidv4 } = require('uuid');

exports.generateUUID = () => {
    return uuidv4();
};

exports.successMsg = "Successful";

exports.defaultErrorMsg = "Some error occurred while getting messages.";


