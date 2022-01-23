require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(__dirname));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

require("./auth/auth");
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to branch  application.s" });
});

app.use(passport.initialize());

require("./routes")(app);

const secureRoute = require("./secure-routes");

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use("/api/", passport.authenticate("jwt", { session: false }), secureRoute);

module.exports = { app, db };
