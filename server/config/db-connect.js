var Seq = require('sequelize'),
    sequelize = new Seq('vvida', 'postgres', 'root', {
        host: 'localhost',
        dialect: 'postgres'
    });

module.exports = sequelize;