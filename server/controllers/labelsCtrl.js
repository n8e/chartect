(function() {
  'use strict';

  module.exports = function() {
    var Labels = require('../models/axis_labels');

    return {
      create: function(req, res) {
        if (req.body.hasOwnProperty('x_units') &&
          req.body.hasOwnProperty('y_units')) {
          Labels.create({
              x_units: req.body.x_units,
              y_units: req.body.y_units
            })
            .then(function(label) {
              res.json(label);
            })
            .catch(function(err) {
              res.status(500).json({
                error: err.message || err.errors[0].message
              });
            });
        } else {
          res.status(406).json({
            error: 'Not enough arguments/values to create label.'
          });
        }
      },

      all: function(req, res) {
        Labels.find({})
          .then(function(label) {
            res.json(label);
          }).catch(function(err) {
            res.status(500).json({
              error: err.message || err.errors[0].message
            });
          });
      },

      find: function(req, res) {
        Labels.findOne({
          _id: req.params.id
        }).then(function(label) {
          if (!label) {
            res.status(404).json({
              error: 'Labels not found'
            });
          } else {
            res.json(label);
          }
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      update: function(req, res) {
        Labels.update(req.body, {
          where: {
            _id: req.params.id
          }
        }).then(function() {
          res.json({
            message: 'Labels has been updated.'
          });
        }).catch(function(err) {
          res.status(500).json({
            error: err.message || err.errors[0].message
          });
        });
      },

      delete: function(req, res) {
        Labels.remove({
          where: {
            _id: req.params.id
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
