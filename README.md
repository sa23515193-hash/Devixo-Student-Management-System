# 🎓 Student Management System

A modern, responsive, and user-friendly Student Management System built with **React.js**. This project provides an interactive dashboard to manage student records, monitor statistics, search student information, and manage user accounts.

The application uses browser-based local storage with preloaded demo data, so no external database or backend server is required.

---

## 🌟 Project Overview

The Student Management System is designed to simplify student record management through a clean dashboard and an intuitive interface.

It provides separate Admin and Staff access, student record management, dashboard statistics, and data backup functionality.

## ✨ Key Features

### 🔐 Authentication

* User login and registration.
* Admin and Staff demo roles.
* Persistent login using browser LocalStorage.
* Logout functionality.
* Protected dashboard routes.

### 📊 Dashboard

* Total students overview.
* Active and inactive student statistics.
* Quick access to student records.
* Summary cards and organized dashboard layout.

### 👨‍🎓 Student Management

* View all student records.
* Add new students.
* Edit existing student information.
* Delete student records (Admin only).
* Search students by name or details.
* Student record pagination.

### 💾 Data Persistence & Backup

* Automatically saves data in browser LocalStorage.
* Keeps student records after refreshing the page.
* Export accounts and student records as a JSON backup.
* Restore previously exported data.
* No MongoDB or external database required.

### 📱 Responsive Design

* Modern dashboard interface.
* Clean navigation and layout.
* Responsive design for desktop, tablet, and mobile.
* User-friendly forms and data tables.

---

## 🛠️ Technologies Used

| Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| React.js         | Frontend development              |
| JavaScript       | Application functionality         |
| HTML5            | Website structure                 |
| CSS3             | Styling and responsive design     |
| React Router DOM | Page navigation                   |
| LocalStorage     | Demo data persistence             |
| Vite             | Development server and build tool |
| Lucide React     | Icons                             |

---

## 🔑 Demo Login Credentials

You can use the following accounts to explore the application.

| Role  | Email                                         | Password  |
| ----- | --------------------------------------------- | --------- |
| Admin | [admin@devixo.demo](mailto:admin@devixo.demo) | Admin123! |
| Staff | [staff@devixo.demo](mailto:staff@devixo.demo) | Staff123! |

**Note:** These are demonstration credentials, not secure production accounts.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Download or Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Alternatively, download the ZIP file and extract it.

### 2. Open the Project

Open the extracted project folder in Visual Studio Code.

### 3. Open the Terminal

Navigate to the frontend directory:

```bash
cd frontend
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open in Browser

Visit:

```text
http://localhost:5173
```

Log in using the demo credentials provided above.

---

## 📦 Production Build

To create an optimized production build, run:

```bash
npm run build
```

The generated production files will be available in:

```text
frontend/dist/
```

---

## 📁 Project Structure

```text
Devixo-Student-Management-System/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── PROJECT-REPORT.md
└── .gitignore
```

---

## 🔒 Important Notes

* This is a frontend-only demonstration project.
* No separate backend server is included.
* No external database is connected.
* Demo accounts and student records are stored in browser LocalStorage.
* Data is specific to the browser and device being used.
* Clearing browser site data may permanently remove locally stored records.
* Use the Backup feature regularly to export your data.
* LocalStorage authentication is for demonstration purposes only and is not suitable for production security.

---

## 🎯 Project Objectives

* Develop a modern student management interface.
* Practice React component-based development.
* Implement CRUD operations for student records.
* Understand browser-based data persistence.
* Build a responsive dashboard.
* Implement role-based demonstration access.
* Provide data export and restore functionality.

---

## 👩‍💻 Developed By

**Sawaira Ijaz**

Computer Science Student | Frontend Developer

**Internship Organization:** Devixo Solutions

**Project:** Task 03 – Student Management System

---

## ⭐ Acknowledgement

This project was developed as part of the Devixo Solutions internship program to demonstrate practical frontend development skills, React.js concepts, responsive UI design, and student record management functionality.

---

⭐ If you find this project useful, consider giving the repository a star!
