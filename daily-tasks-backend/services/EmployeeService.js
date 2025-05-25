const EmployeeRepository = require('../repositories/EmployeeRepository');

const EmployeeService = {
  async createEmployee(data) {
    return await EmployeeRepository.create(data);
  },
  async getAllEmployees() {
    return await EmployeeRepository.findAll();
  },
  async getEmployeeById(id) {
    return await EmployeeRepository.findById(id);
  }
};

module.exports = EmployeeService;
