const Joi = require("joi");
const { findAll } = require("../repository/MessageRepository");

exports.findAll = async (req, res) => {
  const { offset, limit, param } = req.query;

  const schema = Joi.object({
    offset: Joi.number().min(0).required(),
    limit: Joi.number().min(1).required(),
    param: Joi.string().min(1).optional(),
  });

  const result = schema.validate(req.query);
  const { error } = result;

  if (error) {
    return res.status(422).json({
      message: error.message,
    });
  }

  try {
    const messages = await findAll(+offset, +limit, req.user.agentId, param);
    return res.send({
      data: messages,
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
