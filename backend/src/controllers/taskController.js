const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.userId });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
