var router = require("express").Router();
const {
  create: createResponse,
  findAll: findAllResponse,
} = require("./controllers/ResponseController");
const { findAll: findAllMessages } = require("./controllers/MessageController");

router.post("/agent/response/create", createResponse);

router.get("/agent/response/all", findAllResponse);

router.get("/messages", findAllMessages);

module.exports = router;
