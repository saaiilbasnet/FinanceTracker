# Personal Finance Tracker

## Project Description

**Personal Finance Tracker** is a full-stack web application designed to help individuals efficiently manage their personal finances. The system allows users to record income and expenses, categorize transactions, set monthly budgets, and visualize financial data through interactive dashboards.  
The primary goal of this project is to provide a centralized, user-friendly platform that improves financial awareness and supports better decision-making.

This project was developed as part of **Project I** under the **BCSIT program (Pokhara University)**.

---

## Problem Statement

Many individuals still rely on manual methods such as notebooks, bills, or spreadsheets to manage their finances. These approaches often result in:
- Poor visibility of spending patterns
- Calculation errors
- Difficulty tracking budgets
- Limited financial insights

There is a need for a digital system that securely stores financial data, organizes transactions, and presents meaningful insights in a simple and accessible way.

---

## Solution Overview

Personal Finance Tracker addresses these challenges by providing a web-based solution where users can:
- Securely log in and manage their data
- Record income and expenses in a structured format
- Categorize transactions for clarity
- Set and monitor monthly budgets
- View graphical summaries of financial activity

The system follows a client–server architecture with a modern frontend, a RESTful backend, and a cloud-based database.

---

## Key Features

- Secure user registration and authentication
- Add, edit, and delete income and expense transactions
- Transaction categorization
- Dashboard with visual analytics (charts and summaries)
- Monthly budget management and comparison
- Persistent and secure data storage

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, React.js  
- **Backend:** Node.js  
- **Database:** Supabase  
- **Charts & Visualization:** Chart.js  
- **Version Control:** Git, GitHub  

---

## System Architecture / Workflow

1. Users interact with the application through a React-based frontend.
2. The frontend communicates with the backend using RESTful API requests.
3. The Node.js backend handles:
   - Authentication
   - Business logic
   - CRUD operations for financial data
4. Supabase stores user accounts, transactions, and budget information securely.
5. Chart.js is used on the frontend to visualize financial data.

---

## Installation & Setup Instructions

> **Assumption:** The project uses Node.js and npm. Exact versions may be configurable.

### Prerequisites
- Node.js (LTS recommended)
- npm
- Supabase account

### Steps

```bash
# Clone the repository
git clone https://github.com/saaiilbasnet/FinanceTracker.git

# Navigate into the project directory
cd FinanceTracker

# Install dependencies
npm install

# Start the backend-development server
npm start

# Start the frontend-development server
npm run dev
```
## Contribution
### Feel free to contribute and contact us for any feedbacks !
