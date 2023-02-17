const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

// JOI Validation
const schema = Joi.object({
    name: Joi.string() .min(6).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string() .min(6).max(50).required(),    
});

exports.schema = schema;
exports.Customer = Customer; 

//The difference between the two validation methods is that the first one (mongoose schema validation) is used to validate the data before it gets saved in the database, while the second one (Joi validation) is used to validate user input before it gets sent to the server.