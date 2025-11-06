const Task = require('../models/taskModel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get Tasks (with Pagination + Filter + Search)
exports.getTasks = async (req, res) => {
  try {
    // Extract query parameters
    const { status, page = 1, limit = 5, search = "" } = req.query;

    // Build query
    const query = { userId: req.userId };

    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: "i" }; // case-insensitive search

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch tasks
    const tasks = await Task.find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    // Count total
    const total = await Task.countDocuments(query);

    res.status(200).json({
      tasks,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
