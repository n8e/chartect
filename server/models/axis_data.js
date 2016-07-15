// require needed modules
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
var DataSchema = new Schema({
  labels_id: {
    type: String
  },
  x: {
    type: String
  },
  y: {
    type: String
  }

});

// make the model available to our users in our Node applications
module.exports = mongoose.model('Datum', DataSchema);
