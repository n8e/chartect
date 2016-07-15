// require needed modules
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
var LabelsSchema = new Schema({
  x_units: {
    type: String,
    required: true
  },
  y_units: {
    type: String,
    required: true
  }
});

// make the model available to our users in our Node applications
module.exports = mongoose.model('Labels', LabelsSchema);
