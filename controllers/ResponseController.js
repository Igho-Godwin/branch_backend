const Joi = require("joi");
const { create, findAll } = require("../repository/ResponseRepository");
const { update: updateMessage } = require("../repository/MessageRepository");
const { generateUUID } = require("./globals");

exports.create = async (req, res) => {
  const schema = Joi.object({
    response: Joi.string().min(3).required(),
    userId: Joi.string().min(1).required(),
    messageId: Joi.string().min(36).max(36).required(),
  });

  const result = schema.validate(req.body);
  const { error } = result;

  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
  const { response, userId, messageId } = req.body;

  const agentResponse = {
    responseId: generateUUID(),
    messageId,
    agentId: req.user.agentId,
    userId,
    from: "Agent",
    response,
  };

  try {
    const responseDetails = await create(agentResponse);
    await updateMessage(req.user.agentId, messageId);
    return res.send({
      message: "Successful",
      data: responseDetails,
      token: req.headers.authorization,
    });
  } catch (err) {
    if (typeof err.errors != "undefined") {
      return res.status(422).send({
        message:
          err.errors[0].message ||
          err.message ||
          "Some error occurred while getting messages.",
      });
    }
    return res.status(500).send({
      message: err.message || "Some error occurred while getting messages.",
    });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const { messageId } = req.query;

  const schema = Joi.object({
    messageId: Joi.string().min(36).max(36).required(),
  });

  const result = schema.validate(req.query);
  const { error } = result;

  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }

  try {
    const responses = await findAll(messageId);

    return res.send({
      data: responses,
      token: req.headers.authorization,
      message: "Successful",
    });
  } catch (err) {
    if (typeof err.errors != "undefined") {
      return res.status(422).send({
        message:
          err.errors[0].message ||
          err.message ||
          "Some error occurred while getting messages.",
      });
    }
    return res.status(500).send({
      message: err.message || "Some error occurred while getting messages.",
    });
  }
};
