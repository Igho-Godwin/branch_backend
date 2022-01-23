const { Op } = require("sequelize");
const db = require("../models/index.js");
const ResponseModel = db.sequelize.models.Response;

exports.create = async (response) => {
  const responseDetails = await ResponseModel.create(response);

  return responseDetails;
};

exports.findAll = async (messageId) => {
  const responses = await ResponseModel.findAll({
    where: { messageId, status: "available" },
    order: [["id", "asc"]],
  });

  return responses;
};
