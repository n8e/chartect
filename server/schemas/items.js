//var require the seqalize module
var Seq = require('sequelize'),
    db = require('../config/db-connect'),
    users = db.define('items', {

            //username
            item: {
                type: Seq.STRING,
                allowNull: false,
                unique: true,
            },
            //password
            quantity: {
                type: Seq.STRING,
                allowNull: false,
                unique: true
            }
        },
        // table configuration
        {
            // prevent time stamps from using camelcase
            // updatedAt to updated_at and createdAt to created-at
            underscore: true,
            // prevent sequelize from transforming the user tables to prural
            freezetableName: true
        }
    );

module.exports = users;