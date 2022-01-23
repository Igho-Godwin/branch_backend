const { create: createAgent, login } = require("./controllers/AgentController");

module.exports = (app) => {
  var router = require("express").Router();

  router.post("/agent/signup", createAgent);

  router.post("/agent/login", login);

  app.use("/api/", router);
};
