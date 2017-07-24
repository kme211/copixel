const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
//const jwt = require('jsonwebtoken');
const api = require("./api");
const { getUserMongoId } = require("./controllers/userController");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const jwtCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'http://localhost:7777/api', // had to set this up in the APIs section of Auth0
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ['RS256']
});

app.use(/^\/api\/v\d+\/secured/, jwtCheck, getUserMongoId);

app.get('/api/v1/secured/resource', function (req, res) {
  console.log('req to secured resource')
  res.json({
    message: 'Secured Resource',
    user: req.user
  });
});

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
