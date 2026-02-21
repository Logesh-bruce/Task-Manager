# Task Management System API (Production MERN Backend)

A secure, modular, and production-ready Node.js + Express + MongoDB backend for a Task Management System.

## Features

- **Layered Architecture**: Separation of concerns with Routes, Controllers, Services, and Models.
- **JWT Authentication**: Secure authentication via JSON Web Tokens.
- **RESTful API**: Full CRUD operations for tasks.
- **Advanced Task Management**:
  - **Filtering**: Filter tasks by `status` and `priority`.
  - **Pagination**: Efficiently fetch large datasets using `page` and `limit`.
  - **Sorting**: Tasks are sorted by descending creation date.
- **Performance Optimized**: MongoDB indexing on frequently queried fields (`email`, `user`, `status`, `priority`).
- **Security**:
  - Password hashing using `bcryptjs`.
  - Protected routes via `authMiddleware`.
  - CORS enabled.
- **Enterprise-ready Error Handling**: Centralized error middleware with consistent JSON responses.
- **Health Monitoring**: `/api/health` endpoint for monitoring server status.

## Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB + Mongoose**: Database and ODM
- **JWT**: Authentication
- **Bcryptjs**: Security

## Folder Structure

```text
server/
 ├── config/            # DB connection configuration
 ├── models/            # Mongoose schemas (User, Task)
 ├── controllers/       # Request handlers (logic-light)
 ├── services/          # Business logic (database calls & heavy processing)
 ├── routes/            # Route definitions
 ├── middleware/        # Security (auth) & error handling
 ├── utils/             # Helper functions (token generation)
 ├── .env               # Environment variables (private)
 ├── .env.example       # Environment variables template
 ├── server.js          # Entry point
 └── package.json       # Dependencies & scripts
```

## Setup Instructions

1. **Clone the repository** (if applicable)
2. **Navigate to the server directory**:
   ```bash
   cd server
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Configure environment variables**:
   - Create a `.env` file in the `server` root (use `.env.example` as a template).
   - Set your `MONGODB_URI` and `JWT_SECRET`.
5. **Run the server**:
   - For development (with nodemon): `npm run dev`
   - For production: `npm start`

## API Documentation

### Response Format (Strict)

All successful responses follow this structure:
```json
{
  "success": true,
  "message": "Description",
  "data": {}
}
```

### Auth Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get JWT token |

### Task Endpoints (Protected)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/tasks` | Private | Get all tasks (supports `status`, `priority`, `page`, `limit` query params) |
| POST | `/api/tasks` | Private | Create a new task |
| PUT | `/api/tasks/:id` | Private | Update a task |
| DELETE | `/api/tasks/:id` | Private | Delete a task |
| PATCH | `/api/tasks/:id/status` | Private | Update only the status of a task |

### System Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/health` | Public | Check API health status |

## Example Task Query

`GET /api/tasks?status=pending&priority=high&page=1&limit=5`

---
Built with ❤️ by Antigravity (Assistant)
