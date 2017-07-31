const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  firstName: {
    type: String,
    required: 'Please supply a first name!',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Please supply a last name!',
    trim: true
  },
  connection: {
    type: String,
    required: 'Please supply a connection!'
  },
  id: {
    type: String,
    required: 'Please supply an id!'
  },
  picture: {
    type: String,
    required: 'Please supply a picture!'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('activities', {
  ref: 'Activity',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('paintings', {
  ref: 'Painting',
  localField: '_id',
  foreignField: 'creator'
});

userSchema.virtual('contributions', {
  ref: 'Section',
  localField: '_id',
  foreignField: 'creator'
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);