# Saraha App

A Node.js Express application inspired by anonymous messaging apps, where users can register, activate their accounts, manage profiles, and send or receive messages.

## Overview

This project provides a REST API for a social messaging platform with:

- User registration and login
- Account activation via email verification
- JWT-based authentication
- User profile management
- Password updates and account deactivation
- Send, view, update, and delete messages
- Role-based access control for protected endpoints

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Joi for request validation
- bcrypt for password hashing
- nodemailer for account activation emails

## Project Structure

```bash
.
├── index.js
├── package.json
├── src/
│   ├── DB/
│   │   ├── connection.js
│   │   └── models/
│   │       ├── message.model.js
│   │       └── user.model.js
│   ├── middleware/
│   │   ├── authentication.middleware.js
│   │   ├── authorization.middleware.js
│   │   └── validation.middleware.js
│   ├── modules/
│   │   ├── app.controller.js
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   ├── message/
│   │   │   ├── message.controller.js
│   │   │   ├── message.endpoint.js
│   │   │   ├── message.service.js
│   │   │   └── message.validation.js
│   │   └── user/
│   │       ├── user.controller.js
│   │       ├── user.endpoint.js
│   │       ├── user.service.js
│   │       └── user.validation.js
│   └── utils/
│       ├── emails/
│       │   ├── email.event.js
│       │   ├── sendEmails.js
│       │   └── emailTemplate/
│       │       └── generateHTML.js
│       ├── encryption/
│       │   └── encryption.js
│       ├── errorHandling/
│       │   ├── asyncHandler.js
│       │   ├── globalErrorHandler.js
│       │   └── notFoundHandler.js
│       ├── hash/
│       │   └── hash.js
│       └── token/
│           └── token.js
└── README.md
```

## Prerequisites

Before running the app, make sure you have:

- Node.js installed
- MongoDB running locally or a remote MongoDB URI
- A Gmail account or SMTP account for email activation

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Saraha-App
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/saraha-app
JWT_SECRET=your_super_secret_key
EMAIL=your_email@gmail.com
PASS=your_email_app_password
```

> For Gmail, use an app password instead of your normal account password if 2FA is enabled.

## Running the App

Start the development server:

```bash
npm run dev
```

The app starts on:

```bash
http://localhost:3000
```

## API Endpoints

### Authentication

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive a JWT token
- `GET /auth/activate_account/:token` — Activate a user account after email verification

### User

- `GET /user/profile` — Get current user profile
- `GET /user/profile/:id` — View a shared profile
- `PATCH /user/profile` — Update profile information
- `PATCH /user/password` — Update password
- `DELETE /user/account` — Deactivate account

### Messages

- `POST /message` — Send a message to another user
- `GET /message/:id` — Get a single message
- `GET /message?flag=inbox` — Get inbox messages
- `GET /message?flag=outbox` — Get sent messages
- `PATCH /message/:id` — Update a sent message
- `DELETE /message/:id` — Delete a sent message

## Authentication

Protected routes require a valid JWT token in the request headers:

```http
Authorization: Bearer <token>
```

## Notes

- User accounts are inactive by default and must be activated through the email link sent during registration.
- The app uses Express middleware for validation, authentication, and authorization.
- Errors are centralized in the global error handler for consistent API responses.

## License

This project is licensed under the ISC License.
