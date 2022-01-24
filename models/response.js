"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Response.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      responseId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      messageId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      agentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("available", "deleted"),
        defaultValue: "available",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Response",
    }
  );
  return Response;
};
