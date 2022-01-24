"use strict";
const csvtojson = require("csvtojson");
var moment = require("moment");

const { generateUUID } = require("../controllers/globals.js");

const fileName = "./messageSeeds.csv";

module.exports = {
  async up(queryInterface, Sequelize) {
    const messages = [];

    const source = await csvtojson().fromFile(fileName);

    for (var i = 0; i < source.length; i++) {
      var userId = source[i]["User ID"],
        entryDate = source[i]["Timestamp (UTC)"],
        message = source[i]["Message Body"],
        date = moment().format("yyyy-MM-DD HH:MM:SS"),
        createdAt = date,
        updatedAt = date;

      let messageDetails = {
        userId,
        messageId: generateUUID(),
        entryDate,
        message,
        createdAt,
        updatedAt,
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
