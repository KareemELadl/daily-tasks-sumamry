const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.post('/', EmployeeController.create);
router.get('/', EmployeeController.getAll);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

module.exports = router;
