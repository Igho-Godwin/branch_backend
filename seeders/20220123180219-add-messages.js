"use strict";

const csvtojson = require("csvtojson");
const { generateUUID } = require("../controllers/globals.js");

const fileName = "./messageSeeds.csv";

module.exports = {
  async up(queryInterface, Sequelize) {
    const messages = [];

    const source = await csvtojson().fromFile(fileName);
    for (var i = 0; i < source.length; i++) {
      var userId = source[i]["User ID"],
        entryDate = source[i]["Timestamp (UTC)"],
        message = source[i]["Message Body"];

      let messageDetails = {
        userId,
        messageId: generateUUID(),
        entryDate,
        message,
      };

      messages.push(messageDetails);
    }

    await queryInterface.bulkInsert("Messages", messages);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
