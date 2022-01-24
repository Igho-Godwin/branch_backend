const Joi = require("joi");
const jwt = require("jsonwebtoken");

const { create, findOne } = require("../repository/AgentRepository");

const { generateUUID, successMsg, defaultErrorMsg } = require("./globals");

exports.create = async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required().email(),
  });

  const result = schema.validate(req.body);
  const { error } = result;

  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }

  const { firstName, lastName, email } = req.body;

  // Create an Agent
  const agentDetails = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    agentId: generateUUID(),
  };

  // Save Agent in the database
  try {
    const agent = await create(agentDetails);
    return res.send({ data: agent, message: successMsg });
  } catch (err) {
    if (typeof err.errors != "undefined") {
      return res.status(422).send({
        message: err.errors[0].message,
      });
    }
    return res.status(500).send({
      message: err.message || defaultErrorMsg,
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(50).required().email(),
  });

  const { email } = req.body;

  const result = schema.validate(req.body);
  const { error } = result;

  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }

  try {
    const agent = await findOne({ email });
    if (!agent) {
      return res.status(401).json({
        message: "Agent not Authorized",
      });
    }

    const { id, agentId } = agent;

    const body = { id, email, agentId };

    let token = jwt.sign({ agent: body }, "TOP_SECRET", { expiresIn: "24h" });

    token = "Bearer " + token;

    return res.send({ token, message: successMsg });
  } catch (err) {
    if (typeof err.errors != "undefined") {
      return res.status(422).send({
        message: err.errors[0].message,
      });
    }
    return res.status(500).send({
      message: err.message || defaultErrorMsg,
    });
  }
};
