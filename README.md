# Daily Tasks Report

A fullstack application to manage employee tasks on a daily basis.  
Built with **React TypeScript**, **Redux**, **Tailwind CSS**, **shadcn UI** on the frontend, and **Node.js**, **Express**, and **MongoDB** on the backend.  
Supports task creation, updates, summaries, and validation against an 8-hour daily cap.

---

## Tech Stack

**Frontend:**
- React with TypeScript
- Redux Toolkit
- Tailwind CSS + shadcn UI
- React Query for API calls and caching

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- Layered architecture: Models, Controllers, Services, Repositories

---

## Features

- Add and manage employees
- Create, update, and delete tasks
- Validate task time (max 8 hours total per day)
- Show total and remaining hours in a clean dashboard
- Real-time updates using React Query

---

## Setup Instructions

### Prerequisites

- Node.js & npm installed
- MongoDB running locally (or cloud Mongo URI)

---

### Backend Setup

```bash
cd daily-tasks-backend
npm install
npm start
```

> `.env` example:
> ```
> MONGO_URI=mongodb://localhost:27017/daily-tasks
> PORT=4000
> ```

---

### Frontend Setup

```bash
cd daily-tasks-frontend
npm install
npm start
```

> Make sure your backend runs on `http://localhost:4000`

---

## Folder Structure

### Backend

```
daily-tasks-backend/
├── models/
├── controllers/
├── services/
├── repositories/
├── routes/
└── server.js
```

### Frontend

```
daily-tasks-frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── store/
└── tailwind.config.js
```

---

## Code Style & Notes

- All code follows best practices: separation of concerns, reusable hooks/components.
- Typed consistently using TypeScript.
- API requests are cached and refetched using React Query.
- State is minimal; mainly handled via hooks and query keys.

---

## Acknowledgements

This project uses:
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)