const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../routes/authRoutes');
const taskRoutes = require('../routes/taskRoutes');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', authRoutes);

app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Algo deu errado!' });
});

sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

module.exports = app;
