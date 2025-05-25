const EmployeeService = require('../services/EmployeeService');

const EmployeeController = {
  async create(req, res) {
    try {
      const employee = await EmployeeService.createEmployee(req.body);
      res.status(201).json(employee);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getAll(req, res) {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
  },

    async update(req, res) {
        try {
        const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
        res.json(employee);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
        await EmployeeService.deleteEmployee(req.params.id);
        res.status(204).send();
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    }
};

module.exports = EmployeeController;
