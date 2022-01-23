"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Agents", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      agentId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM("available", "deleted", "suspended"),
        defaultValue: "available",
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Agents");
  },
};
