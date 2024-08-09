const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createTask, listTasks } = require('../controllers/taskController');
const router = express.Router();

router.post('/tasks', authMiddleware, createTask);
router.get('/tasks', authMiddleware, listTasks);

module.exports = router;
