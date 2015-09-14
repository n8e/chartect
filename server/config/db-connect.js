var Seq = require('sequelize'),
    sequelize = new Seq('chartsjs', 'postgres', 'root', {
        host: '127.0.0.1',
        port: 5433,
        dialect: 'postgres'
    });

module.exports = sequelize;