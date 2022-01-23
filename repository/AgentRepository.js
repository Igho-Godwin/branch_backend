const db = require("../models/index.js");
const AgentModel = db.sequelize.models.Agent;

exports.create = async (agent) => {
  const agentDetails = await AgentModel.create(agent);

  return agentDetails;
};

exports.findOne = async (param) => {
  param.status = "available";
  const agentDetails = await AgentModel.findOne({ where: param });
  return agentDetails;
};
