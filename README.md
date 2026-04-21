# Finance Tracker

![Project Banner](https://via.placeholder.com/1000x300?text=Finance+Tracker+Project)

A comprehensive Full-Stack web application designed to help users track their income, monitor expenses, and visualize their financial health through interactive reports and dashboards.

This project was developed as part of the **College Project for "Second Semester Project-I"** subject.

---

## 🎯 Project Overview

Managing personal finances effectively is a crucial skill. The **Finance Tracker** simplifies this by providing an intuitive interface to log transactions, analyze spending patterns, and maintain a clear picture of one's financial status.

### Academic Context
- **Course:** Project-I (Second Semester)
- **Objective:** To demonstrate practical knowledge of modern web development frameworks, database management, and building robust RESTful APIs in a full-stack context.

---

## ✨ Features

- **User Authentication:** Secure user registration, login, and protected routes using JSON Web Tokens (JWT) and bcrypt.
- **Dashboard:** Interactive dashboard summarizing total income, total expenses, and current balance.
- **Income & Expense Management:** Add, update, view, and delete income and expense records.
- **Visual Reports:** Understand spending habits with dynamic charts and graphs (powered by Chart.js & ApexCharts).
- **Transaction History:** Detailed chronological view of all user transactions.
- **User Profile & Settings:** Manage user details and application preferences.

---

## 🛠️ Technology Stack

The application is built using the **PERN** stack (PostgreSQL, Express, React, Node.js) with TypeScript on the backend.

### Frontend (Client)
- **Framework:** React.js (Vite)
- **Routing:** React Router v7
- **Styling UI:** Tailwind CSS, Material UI (MUI), Chakra UI, Lucide React
- **Charts:** Chart.js, React-Chartjs-2, ApexCharts
- **HTTP Client:** Axios
- **State Management/Notifications:** React Hot Toast

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens), bcrypt
- **Development Tool:** Nodemon, ts-node

---

## 📂 Project Structure

```
FinanceTracker/
│
├── client/              # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # React Router page components
│   │   ├── utils/       # PrivateRoute, Helpers
│   │   ├── App.jsx      # Main frontend routing
│   │   └── main.jsx     # Frontend entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/              # Backend Express application
    ├── src/
    │   ├── controller/  # Request handlers
    │   ├── database/    # Sequelize configuration & models
    │   ├── middlewares/ # Authentication, Error handlers
    │   ├── routes/      # API Route definitions
    │   ├── services/    # Business logic layer
    │   └── app.ts       # Express app setup
    ├── server.ts        # Backend entry point
    ├── package.json
    └── tsconfig.json
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) database installed and running.

### 1. Clone the repository (if applicable)
```bash
git clone <your-repository-url>
cd FinanceTracker
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `server/` directory. Example:
   ```env
   PORT=5000
   DB_NAME=financetracker
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   JWT_SECRET=super_secret_key_here
   ```
4. Start the backend development server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will typically be accessible at `http://localhost:5173`. Make sure the backend CORS is allowed for this port (configured in `app.ts`).

---

## 📡 API Endpoints

The backend exposes several REST API endpoints:
- **Auth:** `/api/auth/register`, `/api/auth/login`
- **Income:** `/api/income` (GET, POST, PUT, DELETE)
- **Expense:** `/api/expense` (GET, POST, PUT, DELETE)
- **Reports:** `/api/reports` (For chart aggregation data)
- **User:** `/api/user` (Profile and settings management)

---

## 👨‍💻 Developer/Author
This project was built from scratch as part of the academic curriculum. 
Feel free to explore, clone, and modify it!
