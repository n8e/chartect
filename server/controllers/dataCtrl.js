(function() {
  'use strict';

  module.exports = function() {
    var Datum = require('../models/axis_data');

    return {
      create: function(req, res) {
        if (req.body.hasOwnProperty('x') &&
          req.body.hasOwnProperty('y') &&
          req.body.hasOwnProperty('labels_id')) {
          // create new data document
          Datum.create({
              labels_id: req.body.labels_id,
              x: req.body.x,
              y: req.body.y
            })
            .then(function(data) {
              res.json(data);
            })
            .catch(function(err) {
              res.status(500).json({
                error: err.message || err.errors[0].message
              });
            });
        } else {
          res.status(406).json({
            error: 'Not enough arguments/values to create data.'
          });
        }
      },

      all: function(req, res) {
        Datum.find({}).then(function(data) {
          res.json(data);
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      find: function(req, res) {
        Datum.find({
          where: {
            id: req.params.id
          }
        }).then(function(data) {
          if (!data) {
            res.status(404).json({
              error: 'Item not found'
            });
          } else {
            res.json(data);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      update: function(req, res) {
        Datum.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'Item has been updated.'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      delete: function(req, res) {
        Datum.destroy({
          where: {
            id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'Delete successful'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      }
    };
  };
})();
