const { v4: uuidv4 } = require('uuid');

exports.generateUUID = () => {
    return uuidv4();
};


