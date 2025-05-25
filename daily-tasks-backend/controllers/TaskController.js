const TaskService = require('../services/TaskService');

const TaskController = {
  async create(req, res) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getByEmployee(req, res) {
    const tasks = await TaskService.getTasks(req.params.employeeId);
    res.json(tasks);
  },
  async update(req, res) {
    const task = await TaskService.updateTask(req.params.id, req.body);
    res.json(task);
  },
  async delete(req, res) {
    await TaskService.deleteTask(req.params.id);
    res.status(204).send();
  },
    async getDailySummary(req, res) {
    try {
      const { employeeId } = req.params;
      const summary = await TaskService.getDailySummary(employeeId);
      res.json(summary);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = TaskController;
