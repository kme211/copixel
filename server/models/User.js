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
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  connection: {
    type: String,
    required: 'You must supply a connection!'
  },
  id: {
    type: String,
    required: 'You must supply an id!'
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