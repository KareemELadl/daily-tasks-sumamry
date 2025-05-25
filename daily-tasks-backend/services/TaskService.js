const TaskRepository = require('../repositories/TaskRepository');

const TaskService = {
  async createTask(data) {
    
    const duration = (new Date(data.toTime) - new Date(data.fromTime)) / (1000 * 60 * 60);
    if (duration > 8) throw new Error("Task duration cannot exceed 8 hours");
    
    const existingTasks = await TaskRepository.findByEmployee(data.employeeId);
    const totalHours = existingTasks.reduce((acc, task) => {
      return acc + ((new Date(task.toTime) - new Date(task.fromTime)) / (1000 * 60 * 60));
    }, 0);

    if ((totalHours + duration) > 8) throw new Error("Total daily tasks cannot exceed 8 hours");

    
    return await TaskRepository.create(data);
  },
  async getTasks(employeeId) {
    return await TaskRepository.findByEmployee(employeeId);
  },
  async updateTask(id, data) {
    return await TaskRepository.update(id, data);
  },
  async deleteTask(id) {
    return await TaskRepository.delete(id);
  },

   async getDailySummary(employeeId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tasks = await TaskRepository.findByEmployeeAndDateRange(employeeId, today, tomorrow);

    const totalHours = tasks.reduce((acc, task) => {
      const from = new Date(task.fromTime);
      const to = new Date(task.toTime);
      return acc + (to - from) / (1000 * 60 * 60);
    }, 0);

    return { totalHours: Math.round(totalHours * 100) / 100 };
  }
};

module.exports = TaskService;
