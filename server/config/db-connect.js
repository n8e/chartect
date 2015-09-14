var Seq = require('sequelize'),
    sequelize = new Seq('chartsjs', 'postgres', 'root', {
        host: 'localhost',
        dialect: 'postgres'
    });

module.exports = sequelize;