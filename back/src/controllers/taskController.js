const { Task } = require('../models');

exports.createTask = async (req, res) => {
  const { description, priority } = req.body;
  try {
    const task = await Task.create({ description, priority, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id, status: 'pending' } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
