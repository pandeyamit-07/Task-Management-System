const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "pending" },
  tags: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Task', taskSchema);
