const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Task = require('./task')(sequelize);

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync();

module.exports = { sequelize, User, Task };
