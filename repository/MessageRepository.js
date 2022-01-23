const { Op } = require("sequelize");
const db = require("../models/index.js");
const MessageModel = db.sequelize.models.Message;

exports.create = async (message) => {
  const messageDetails = await MessageModel.create(message);

  return messageDetails;
};

exports.findAll = async (offset, limit, agentId, param) => {
  if (param) {
    const messages = await MessageModel.findAndCountAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { message: { [Op.like]: "%" + param + "%" } },
              { userId: { [Op.like]: "%" + param + "%" } },
            ],
          },
          { [Op.or]: [{ agentId }, { agentId: null }] },
          { status: "available" },
        ],
      },
      attributes: {
        include: [
          [
            MessageModel.sequelize.literal(
              'CASE WHEN message like "%loan%" THEN 1 ELSE 0 END  '
            ),
            "loanMessage",
          ],
        ],
      },
      offset,
      limit,
      order: [
        [MessageModel.sequelize.literal("loanMessage"), "desc"],
        ["id", "desc"],
      ],
    });
    return messages;
  }
  const messages = await MessageModel.findAndCountAll({
    where: {
      [Op.and]: [
        { [Op.or]: [{ agentId }, { agentId: null }] },
        { status: "available" },
      ],
    },
    attributes: {
      include: [
        [
          MessageModel.sequelize.literal(
            'CASE WHEN message like "%loan%" THEN 1 ELSE 0 END  '
          ),
          "loanMessage",
        ],
      ],
    },
    offset,
    limit,
    order: [
      [MessageModel.sequelize.literal("loanMessage"), "desc"],
      ["id", "desc"],
    ],
  });

  return messages;
};

exports.update = async (agentId, messageId) => {
  await MessageModel.update({ agentId }, { where: { messageId } });
};
