Task Management System

https://task-management-system-1-tg23.onrender.com/

A full-stack MERN application that allows users to manage their daily tasks — including creating, updating, deleting, and tracking tasks with filters and pagination.
Built with MongoDB, Express.js, React (Vite), and Node.js, and deployed using Render for both backend and frontend with MongoDB Atlas for database hosting.

🚀 Live Demo

Frontend: https://task-management-system-1-tg23.onrender.com

Backend: https://task-management-system-lryo.onrender.com
🧩 Tech Stack
Layer	Technology
Frontend	React (Vite), Axios, CSS
Backend	Node.js, Express.js, JWT, Mongoose
Database	MongoDB Atlas
Hosting	Render (Frontend + Backend)
Authentication	JWT (JSON Web Tokens)
⚙️ Features

✅ User Authentication — Secure Signup/Login using JWT
✅ CRUD Tasks — Create, Read, Update, and Delete tasks
✅ Filtering — Filter tasks by status (Pending/Completed)
✅ Search — Search tasks by title
✅ Pagination — Manage large task lists with page controls
✅ Protected Routes — Users can only access their own tasks
✅ Responsive UI — Built with simple, clean CSS
✅ Cloud Deployment — Hosted fully on Render with MongoDB Atlas

Project Structure
Task-Management-System/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── taskModel.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── server.js
│   ├── package.json
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   └── EditTaskForm.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── main.jsx
│   │   ├── App.jsx
│   ├── public/
│   │   └── _redirects
│   ├── .env
│   ├── vite.config.js
│   ├── package.json
│
├── README.md


🧩 Backend Setup
npm install

//backend/.env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskDB
JWT_SECRET=SomeSuperSecretKey
PORT=5000

npm start

💻 Frontend Setup
cd frontend
npm install

VITE_API_URL=http://localhost:5000

npm run dev


| Method | Endpoint       | Description                                         | Auth Required |
| ------ | -------------- | --------------------------------------------------- | ------------- |
| POST   | `/auth/signup` | Register new user                                   | ❌             |
| POST   | `/auth/login`  | Login existing user                                 | ❌             |
| GET    | `/tasks`       | Get all tasks (supports pagination, search, filter) | ✅             |
| POST   | `/tasks`       | Create new task                                     | ✅             |
| PATCH  | `/tasks/:id`   | Update a task                                       | ✅             |
| DELETE | `/tasks/:id`   | Delete a task                                       | ✅             |

⭐ Future Improvements

Add task due dates & reminders

Add drag-and-drop task sorting

Add dark mode theme

Add user profile management


🧑‍💻 Author

Amit Pandey
📧 Email: 07.pandeyamit@gmail.com
🌐 GitHub: https://github.com/pandeyamit-07

🏁 License
This project is open-source and available under the MIT License
