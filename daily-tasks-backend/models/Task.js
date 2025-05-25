const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  fromTime: { type: Date, required: true },
  toTime: { type: Date, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
