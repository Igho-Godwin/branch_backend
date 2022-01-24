"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Responses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      responseId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      messageId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      agentId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      response: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("available", "deleted"),
        defaultValue: "available",
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Responses");
  },
};
