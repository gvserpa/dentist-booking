# Dentist Booking

[![dentist-booking CI/CD](https://github.com/gvserpa/dentist-booking/actions/workflows/lint-test-deploy.yml/badge.svg)](https://github.com/gvserpa/dentist-booking/actions/workflows/lint-test-deploy.yml)

## LIVE DEMO ##

 https://dentist-booking-ten.vercel.app/

## Overview

**Dentist Booking** is a modern web application for dental clinics that allows patients to book appointments and administrators to manage bookings dynamically and efficiently. The project is built with **React** and uses **Firebase** for authentication, data storage, and a serverless backend.

The system is fully responsive and provides a seamless experience for both users and administrators.

---

## Key Features

### User (Patient)
- **Login/Register System**: Patients can create accounts using email and password (Firebase Authentication).  
- **User Dashboard**:
  - View past appointments.
  - Book new appointments directly from the dashboard.
  - Only available time slots are shown, preventing double bookings.
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices.

### Administrator (Staff/Clinic)
- **Admin Dashboard**:
  - Displays all appointments made by users.
  - Mark tasks/appointments as completed.
  - Cancel or reschedule appointments.
  - Organized and dynamic interface, perfect for daily clinic management.
- **Schedule Management**: See busy and available times, ensuring accurate bookings.

---

## Technologies Used

- **Frontend**:
  - React (Vite)
  - Modern and responsive CSS
- **Backend / Services**:
  - Firebase Authentication (login/register)
  - Firestore (data and appointment storage)
  - Firebase Security Rules (data access control)
- **Other Tools**:
  - React Router (page navigation)
  - Git/GitHub (version control)
  - VSCode (recommended IDE)

---

## Local Setup

1. Clone the repository:
git clone https://github.com/gvserpa/dentist-booking.git

2. Install dependencies:
npm install

3. Create a `.env` file with your Firebase credentials:

   
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id



5. Start the development server:
npm run dev

---

## Responsiveness

- Fully adaptable layouts for:
  - Desktop
  - Tablets
  - Mobile devices
- Uses CSS flexbox and media queries to ensure all sections (login, dashboard, appointments) work on any screen size.

---

## Future Improvements

- Integration with Google Calendar for automatic appointment synchronization.  
- Email or SMS notifications for appointment reminders.  
- Appointment review system for patients.  

---

## Useful Links

- GitHub Repository: https://github.com/gvserpa/dentist-booking  
- Live Site: https://dentist-booking-ten.vercel.app/
