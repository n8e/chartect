module.exports = function(app) {
  var Labels = require('../controllers/labelsCtrl')(app);

  // labels routes
  app.route('/api/labels')
    .get(Labels.all)
    .post(Labels.create);

  app.route('/api/labels/:id')
    .get(Labels.find)
    .put(Labels.update)
    .delete(Labels.delete);
};