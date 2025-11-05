const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController'); // auth ke liye
// ya
// const { createTask, getTasks } = require('../controllers/taskController');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router; // <-- THIS LINE VERY IMPORTANT
