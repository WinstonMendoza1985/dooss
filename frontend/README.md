# Dental Appointment Booking Application
- DOOSS (Dental Office Online Scheduling System)

This is a full-stack dental appointment booking application designed to streamline scheduling for dental offices and patients. It features a **ReactJS** frontend, a **Node.js** backend, and uses **MongoDB - ATLAS** for data storage.

## Features

### Frontend (ReactJS + Material UI)
- **Home Page**
  - Displays dental office information, services offered, and a call-to-action to schedule an appointment.
- **Booking Page**
  - Enables users to:
    - Select a dentist.
    - View available time slots.
    - Book an appointment.
- **User Dashboard**
  - Available after login.
  - Users can:
    - View upcoming appointments.
    - Reschedule or cancel appointments.

### Backend (Node.js, Express, & Axois Client)
- **User Authentication**
  - User registration and login using JWT tokens.
  - Secure password hashing (e.g., bcrypt).
  - Profile management capabilities.
- **API Endpoints**
  - RESTful APIs for:
    - Users (Register/Login/Profile).
    - Dentists (List available dentists).
    - Appointments (CRUD operations).
- **Error Handling**
  - Comprehensive error management with meaningful status codes and error messages.
  - Handles:
    - Invalid input.
    - Authentication errors.
    - Not found and server errors.