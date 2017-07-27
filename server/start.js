const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Uh, oh... → ${err.message}`);
});

require('./models/Activity');
require('./models/Like');
require('./models/User');
require('./models/Section');
require('./models/Painting');

const app = require('./app');