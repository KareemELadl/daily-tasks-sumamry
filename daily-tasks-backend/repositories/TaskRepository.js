const Task = require('../models/Task');

const TaskRepository = {
  async create(data) {
    
    return await Task.create(data);
  },
  async findByEmployee(employeeId) {
    return await Task.find({ employeeId });
  },
  async findById(id) {
    return await Task.findById(id);
  },
  async update(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  },
  async delete(id) {
    return await Task.findByIdAndDelete(id);
  },
  async findByEmployeeAndDateRange(employeeId, startDate, endDate) {
  return await Task.find({
    employeeId,
    fromTime: { $gte: startDate, $lt: endDate }
  });
}
};

module.exports = TaskRepository;
