# Gluten-Free Celiac Support System

## Project Description

Gluten-Free Celiac Support System is a web-based application developed for celiac patients and gluten-sensitive users.  
The system allows users to manage gluten-free products securely with authentication and user-specific data isolation.

Users can:

- Register and login securely
- Add gluten-free products
- Edit product information
- Delete products
- Search products dynamically
- View product statistics and safe percentage rates

The application is developed as a Single Page Application (SPA) using Vanilla JavaScript without any frontend framework.

---

# Technologies Used

## Frontend
- HTML5
- CSS3
- Vanilla JavaScript

## Backend
- Node.js
- Express.js

## Database
- SQLite

## Authentication
- JWT (JSON Web Token)
- bcryptjs

## API Documentation
- Swagger UI

## Testing & DevOps
- Jest
- ESLint
- GitHub Actions

---

# Features

- CRUD Operations
- RESTful API
- JWT Authentication
- User-specific product isolation
- Dynamic SPA frontend
- Validation on frontend and backend
- Product statistics calculation
- Safe product percentage calculation
- Product search functionality
- Unit testing for business logic
- Interactive Swagger API documentation

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/EsraBayrak/gluten-free-celiac-support-system.git

```

## 2. Open project folder

```bash
cd gluten-free-celiac-support-system
```

## 3. Install backend dependencies

```bash
cd backend
npm install
```

---

# Running the Project

## Start backend server

```bash
node server.js
```

Server runs on:

```text
http://localhost:8000
```

## Open frontend

Open:

```text
frontend/login.html
```

with Live Server extension or browser.

---

# API Documentation

Swagger UI:

```text
http://localhost:8000/api-docs
```

Users can test all REST API endpoints interactively through Swagger UI.

---

# REST API Endpoints

## Authentication

| Method | Endpoint |
|---|---|
| POST | /api/auth/register |
| POST | /api/auth/login |

## Products

| Method | Endpoint |
|---|---|
| GET | /api/products |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

# Testing

Run unit tests:

```bash
npm test
```

---

# GitHub Actions & ESLint

The project includes:
- ESLint configuration
- GitHub Actions workflow
- Automatic lint checking on push

---

# Re-running the System

If the project is reopened later:

## Backend

```bash
cd backend
node server.js
```

## Frontend

Open:

```text
frontend/login.html
```

again with Live Server.

---

# Author

Esra Bayrak