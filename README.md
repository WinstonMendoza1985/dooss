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

### Database (MongoDB - ATLAS)
- **Database Design**
  - Collections:
    - `Users`: Stores patient profiles.
    - `Dentists`: Stores dentist profiles and availability.
    - `Appointments`: Tracks booking details.

- **Operations**
  - CRUD support for:
    - Creating, reading, updating, and deleting - appointments, users profile & dentist details.
    - Managing user profiles.
    - Viewing dentist availability.

## Project Structure
### Dental Office Online Scheduling System 
DOOSS/
│
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── DentistProfile/
│ │ │ │ ├── DentistProfiles.jsx
│ │ │ │ └── NewDentist.jsx
│ │ │ ├── UserProfile/
│ │ │ │ ├── UserProfile.jsx
│ │ │ │ └── UserRegister.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Logout.jsx
│ │ │ ├── HomePage.jsx
│ │ │ ├── BookingPage.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── pages/
│ │ │ ├── HomePage.jsx
│ │ │ ├── BookingPage.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── App.js
│ │ └── index.js
│
├── backend/ # Node.js
│ ├── node_modules/
│ ├── models/
│ │ ├── User.js
│ │ ├── Dentist.js
│ │ └── Appointments.js
│ ├── routes/
│ │ ├── Auth.js
│ │ ├── Users.js
│ │ ├── Dentists.js
│ │ └── Appointments.js
│ ├── package-lock.json
│ ├── package.json
│ └── server.js
│
└── README.md


## API Reference
**Users**
- POST /api/users/register
- POST /api/auth/login
- GET /api/auth/profile

**Dentists**
- GET /api/dentists/
- POST /api/dentists/new

**Appointments**
- POST /api/appointments/
- GET /api/appointments/slots?dentistId=####&date=YYYY-MM-DD
- GET /api/appointments/user/:userId
- PUT /api/appointments/reschedule/:id
- DELETE /api/appointments/cancel/:id

**Extra - Rate Limiter**
- This runs an express rate limit
- Applied in "server.js"
- Set rate limiter: maximum of 100 requests per 15 minutes per IP

**Extra - Notifications Email & SMS**
- Did not add this becuase I don't have a free API
- But I added an area trigger where we can put this API's, for now the message is displayed in console