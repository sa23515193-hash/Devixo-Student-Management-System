# Devixo Solutions Internship — Task 3
# Full Stack Student Management System (Frontend Demo)

**Prepared by:** Sawaira Ijaz  
**UI technology:** React + Vite  
**Demo data:** localStorage (no backend/database connection)

## 1. Project Overview
This submission is a frontend demonstration of a student management workspace. It includes realistic sample records, a responsive dashboard, student directory, profile pages, and simulated authentication. No backend or database needs to be installed or deployed.

## 2. Technology Stack
- React and Vite for the interface
- React Router for navigation
- Custom CSS for the responsive dark corporate design
- Lucide React for interface icons
- Browser localStorage for demo accounts and student records

## 3. Demo Architecture
Browser → React pages/components → demo data service → browser localStorage. The demo data service simulates asynchronous API operations so that loading indicators and CRUD interactions can be demonstrated without a server.

## 4. Demo Data
The app seeds sample student records on first use and stores subsequent changes in localStorage. Clearing the browser's site data resets the sample dataset.

**Admin demo:** `admin@devixo.demo` / `Admin123!`  
**Staff demo:** `staff@devixo.demo` / `Staff123!`

## 5. Features
- Demo login, registration, and logout
- Admin/staff role-aware interface
- Dashboard totals and recent registrations
- Student search and pagination
- Add, edit, view, and admin-delete student records
- Responsive dark corporate layout
- Loading indicators, form feedback, and simulated async operations

## 6. Run Instructions
```bash
cd frontend
npm install
npm run dev
```
Open the Vite local URL. For static hosting, run `npm run build` and deploy `frontend/dist`.

## 7. Screenshot Evidence
Attach screenshots captured from the running demo.

### Figure 1 — Login Screen
[Insert screenshot here]  
*Caption: Demo sign-in screen with preconfigured admin and staff accounts.*

### Figure 2 — Registration Screen
[Insert screenshot here]  
*Caption: New staff demo account registration form.*

### Figure 3 — Dashboard
[Insert screenshot here]  
*Caption: Dashboard showing sample student statistics and recent registrations.*

### Figure 4 — Student Directory
[Insert screenshot here]  
*Caption: Searchable sample student directory with status badges and actions.*

### Figure 5 — Add / Edit Student
[Insert screenshot here]  
*Caption: Student record form for creating or updating demo records.*

### Figure 6 — Student Profile
[Insert screenshot here]  
*Caption: Student profile with contact and academic details.*

### Figure 7 — Mobile View
[Insert screenshot here]  
*Caption: Responsive mobile view of the dashboard or student directory.*

## 8. Limitations and Security Note
This version is intended for internship demonstration and static frontend hosting only. localStorage is browser-specific and is not a secure database. Demo credentials and role state are visible to the browser user. Do not enter real personal/student information. Production-grade authentication, authorization, and permanent shared records require a separately deployed backend and database.

## 9. Conclusion and Future Scope
The frontend demonstrates the user experience and main student administration workflows. Future work can connect the existing interface to a secure API and database, then add CSV export, attendance, course enrollment, audit history, and reporting.
