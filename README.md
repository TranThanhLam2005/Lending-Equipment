# Lending Equipment And Course Management

## 🎯 Project Overview

The Lending Equipment And Course Management is a comprehensive full stack web application using the PERN stack, including PostgreSQL database hosted with Neon services, ExpressJS and NodeJS for RESTful Backend APIs, and React for frontend user interfaces. The application is designed to facilitate the lending equipment supporting mood operation for school. It provides different interfaces for various user roles including student, academic staff, professor and admin.

### 🏗️ Architecture

This project follows a **Headless UI Architecture** pattern with clear separation of concerns:

- **API Layer** - Type-safe data fetching services
- **Hooks Layer** - Business logic and state management
- **Handlers Layer** - Event handling functions
- **UI Layer** - Pure presentational components
- **Pages Layer** - Component composition

📖 **Architecture Documentation:**

- [`HEADLESS_UI_ARCHITECTURE.md`](./HEADLESS_UI_ARCHITECTURE.md) - Complete architecture guide
- [`IMPLEMENTATION_EXAMPLES.md`](./IMPLEMENTATION_EXAMPLES.md) - Practical examples
- [`ARCHITECTURE_DIAGRAMS.md`](./ARCHITECTURE_DIAGRAMS.md) - Visual diagrams
- [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md) - Quick reference guide
- [`REFACTORING_SUMMARY.md`](./REFACTORING_SUMMARY.md) - Refactoring summary

Note: Admin account for system:
UserName: admin123
Password: admin123

User account with preset data:
UserName: testaccount1
Password: Testing123

Application Demo Video link:

### Key Features

## Tech Stack

- React.js for frontend
- Node.js and Express.js for backend
- PostgreSQL for database
- Neon for database hosting
- Tailwind for UI styling
- RESTful API architecture
- Cookie for authentication and authorization

## System Requirements

- Node.js 16 or later (Download at https://nodejs.org/en/download)
- NPM 8 or later (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

1. Clone the repository

2. Install backend dependencies

```bash
# In the root directory
cd ./FullStackDev_Group4_BackEnd
npm install
```

3. Configure environment variables

```bash
# In the backend directory
cp .env.example .env
```

4. Install frontend dependencies

```bash
# In the root directory
cd ./FullStackDev_Group4_Project
npm install
```

5. Run the application

```bash
# In the root directory
cd ./FullStackDev_Group4_BackEnd
node main.js
________

# In the root directory (separate terminal)
cd ./FullStackDev_Group4_Project
npm run dev
```

## User Roles & Functionalities

### Attendee

### Organizer

### Admin

## Database Schema

The system uses a database with the following main entities:

## Features Implemented

### Frontend

### Backend

- RESTful API endpoints for all core features
- JWT authentication and role-based authorization
- File upload functionality for event images
- Database models and relationships
- Event statistics and reporting APIs
- Input validation and sanitization
- Error handling middleware

## Future Enhancements

## Acknowledgments
