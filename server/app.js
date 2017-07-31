const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');
const User = mongoose.model("User")
const api = require("./api");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

if(process.env.NODE_ENV !== "production") {
  var webpack = require('webpack');
  var webpackConfig = require('../webpack.config');
  var compiler = webpack(webpackConfig);
  app.use(require("webpack-dev-middleware")(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
}

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

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

const getMongoUser = async (req, res, next) => {
  const [connection, id] = req.user.sub.split("|");
  const user = await User.findOne({
    connection,
    id
  });
  if(user) req.user = user;
  next();
}

app.use(/^\/api\/v\d+\/secured/, jwtCheck, getMongoUser);

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

app.set('port', process.env.PORT || 7777);
server.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});


module.exports = app;
