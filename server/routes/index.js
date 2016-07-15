(function() {
  'use strict';
  
  module.exports = function(app) {
    require('./data')(app);
    require('./labels')(app);

    /* GET home page. */
    app.get('/*', function(req, res) {
      // res.render('index', { title: 'Express' });
      res.sendFile('index.html', {
        root: './public/'
      });
    });
  };
})();