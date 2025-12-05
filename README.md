# Khalti Payment Integration

A full-stack payment integration application built with Vite, React, TypeScript, and Node.js Express backend. This project demonstrates integration with the Khalti payment gateway.

## Project Structure

```
khalti-new/
├── frontend/                 # Vite React TypeScript application
│   ├── src/
│   │   ├── api/             # API integration (Khalti)
│   │   ├── components/      # React components
│   │   ├── context/         # Auth context management
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions and Axios setup
│   │   └── App.tsx
│   └── package.json
│
└── server/                   # Node.js Express backend
    ├── src/
    │   ├── config/          # Database and environment configuration
    │   ├── controllers/      # Route controllers
    │   ├── middleware/       # Custom middleware
    │   ├── models/          # Database models
    │   ├── routes/          # API routes
    │   ├── types/           # TypeScript type definitions
    │   ├── utils/           # Utility functions
    │   └── index.ts
    └── package.json
```

## Features

- **Authentication**: User registration and login with JWT
- **Payment Processing**: Khalti payment gateway integration
- **Protected Routes**: Authentication-based route protection
- **Error Handling**: Centralized error handling middleware
- **Security**: Environment variables, input validation, and security middleware
- **Type Safety**: Full TypeScript support on both frontend and backend

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Khalti merchant account (for payment integration)

## Installation

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
npm install
```

2. Create a `.env` file in the `server` directory:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
KHALTI_SECRET_KEY=your_khalti_secret_key
KHALTI_PUBLIC_KEY=your_khalti_public_key
```

3. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Payment Routes

- `POST /api/khalti/initiate-payment` - Initiate Khalti payment
- `POST /api/khalti/verify-payment` - Verify payment status

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/khalti-app
JWT_SECRET=your_super_secret_jwt_key
KHALTI_SECRET_KEY=your_khalti_secret_key
KHALTI_PUBLIC_KEY=your_khalti_public_key
NODE_ENV=development
```

### Frontend (.env - if needed)

```
VITE_API_URL=http://localhost:5000
```

## Scripts

### Backend

```bash
npm run dev      # Start development server with nodemon
npm run build    # Build TypeScript
npm start        # Start production server
```

### Frontend

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Tech Stack

### Frontend

- Vite
- React 18+
- TypeScript
- Axios (HTTP client)
- Context API (State management)

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Khalti API

## File Descriptions

### Frontend Key Files

- **`src/api/khalti.ts`** - Khalti payment API integration
- **`src/context/AuthContext.tsx`** - Authentication context and hooks
- **`src/components/ProtectedRoute.tsx`** - Route protection component
- **`src/utils/Axios.ts`** - Axios instance configuration
- **`src/pages/PaymentPage.tsx`** - Payment form and processing
- **`src/pages/PaymentSuccess.tsx`** - Payment success page

### Backend Key Files

- **`src/config/database.ts`** - MongoDB connection
- **`src/config/env.ts`** - Environment variable management
- **`src/controllers/authController.ts`** - Auth business logic
- **`src/controllers/khaltiController.ts`** - Payment business logic
- **`src/middleware/auth.ts`** - JWT authentication middleware
- **`src/middleware/errorHandler.ts`** - Error handling middleware
- **`src/models/User.ts`** - User database schema
- **`src/models/Payment.ts`** - Payment database schema

## Khalti Integration

### Payment Flow

1. User selects products and initiates payment
2. Frontend sends payment request to backend
3. Backend creates Khalti payment request
4. Khalti redirects user to payment page
5. User completes payment
6. Khalti redirects to success/failure page
7. Frontend verifies payment with backend
8. Payment record is stored in database

## Security Considerations

- JWT tokens for authentication
- Environment variables for sensitive data
- CORS configuration
- Input validation and sanitization
- Error handling without exposing sensitive information

## Troubleshooting

### Backend Connection Issues

- Ensure MongoDB is running
- Check database connection string in `.env`
- Verify port 5000 is not in use

### Frontend API Calls Failing

- Verify backend is running on the correct port
- Check CORS configuration
- Ensure authentication tokens are being sent correctly

### Khalti Payment Issues

- Verify Khalti credentials in `.env`
- Check payment amount format
- Ensure merchant account is active

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.

## Conatct Me

contact@biplapneupane.com.np
