const Employee = require('../models/Employee');

const EmployeeRepository = {
  async create(data) {
    return await Employee.create(data);
  },
  async findAll() {
    return await Employee.find();
  },
  async findById(id) {
    return await Employee.findById(id);
  }
};

module.exports = EmployeeRepository;
