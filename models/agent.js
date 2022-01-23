"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      agentId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM("available", "deleted", "suspended"),
        defaultValue: "available",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Agent",
    }
  );
  return Agent;
};
