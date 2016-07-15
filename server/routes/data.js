module.exports = function(app) {
  var Datum = require('../controllers/dataCtrl')(app);

  // data routes
  app.route('/api/datum')
    .get(Datum.all)
    .post(Datum.create);

  app.route('/api/datum/:id')
    .get(Datum.find)
    .put(Datum.update)
    .delete(Datum.delete);
};