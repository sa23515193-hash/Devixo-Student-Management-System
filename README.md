# Devixo Student Management System — Demo Edition

A frontend-only React demonstration project for Devixo Solutions Internship Task 3.

## Important: no backend or database required
This edition uses **sample student records** and browser `localStorage`. It does not connect to MongoDB, does not require Node/Express API deployment, and the submission repository should contain only the `frontend` folder plus documentation.

Changes made in this demo are saved in the current browser. Clearing browser site data resets the sample data.

## Demo accounts
- **Admin:** `admin@devixo.demo` / `Admin123!`
- **Staff:** `staff@devixo.demo` / `Staff123!`

Public registration creates a staff demo account. Admin can delete student records; staff can add, edit, search, and view records.

## Run locally
Requirements: Node.js 18+ and npm.

```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

To create a static production build:
```bash
npm run build
```
Upload the contents of `frontend/dist` to any static hosting provider.

## Included
- Dark navy corporate dashboard and responsive navigation
- Demo login/register/logout
- Dashboard statistics and recent registrations
- Student directory with search and pagination
- Add/edit/view student profile
- Role-aware demo permissions
- Sample data and simulated asynchronous loading
- `PROJECT-REPORT.md` and editable Word report

## Important limitation
This is a **frontend demo**, not a production secure system. Demo passwords and role state are stored in browser storage and can be inspected or changed by the browser user. Do not use real student personal information. Real authentication, authorization, and permanent shared storage require a separately deployed backend and database.

## Keep your demo data safe
The app stores accounts and student records in this browser only. Use **Backup** in the left sidebar regularly to download a JSON copy. To recover data later, open the app in the same browser and use **Restore** to select that JSON file. After restoring, sign in using an account contained in the backup. Clearing browser site data or using another browser/device will not carry data across automatically.
