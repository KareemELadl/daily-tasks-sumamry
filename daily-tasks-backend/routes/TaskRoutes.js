const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.get('/summary/:employeeId/today', TaskController.getDailySummary);

router.post('/', TaskController.create);
router.get('/:employeeId', TaskController.getByEmployee);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

module.exports = router;
