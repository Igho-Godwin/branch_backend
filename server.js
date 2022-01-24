require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const rateLimit = require("express-rate-limit");

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

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

const PORT = process.env.NODE_DOCKER_PORT || 8080;
if(process.env.NODE_ENV === "production"){
  const PORT = process.env.PORT || 8080;
}
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = { app, db, server };
