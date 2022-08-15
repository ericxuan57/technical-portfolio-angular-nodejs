const config = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operationsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.projectCode = require('./projectCode.model')(sequelize, Sequelize);
db.activities = require('./activities.model')(sequelize, Sequelize);
db.dependency = require('./dependency.model')(sequelize, Sequelize);
db.headquarter = require('./headquarter.model')(sequelize, Sequelize);

module.exports = db;
