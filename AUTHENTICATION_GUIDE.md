# Authentication System Implementation

This document explains how the authentication system has been implemented in the Saloon Extension Admin application.

## Overview

The authentication system uses Redux for state management and provides:
- Token-based authentication
- Automatic token handling in API requests
- Protected routes for authenticated users
- Public routes for non-authenticated users
- Persistent login state using localStorage
- Automatic logout functionality

## Key Components

### 1. Auth State Management (`src/redux/slices/authSlice.ts`)

The auth slice manages the authentication state including:
- User data
- Access token and refresh token
- Authentication status
- Loading and error states

**Key Actions:**
- `loginSuccess`: Saves user data and tokens after successful login
- `logout`: Clears all authentication data
- `initializeAuth`: Restores auth state from localStorage on app start
- `updateUserProfile`: Updates user profile information
- `updateTokens`: Updates tokens (for token refresh)

### 2. Auth API (`src/redux/services/authSlice.ts`)

RTK Query API slice for authentication endpoints:
- `login`: Handles user login and automatically dispatches `loginSuccess`
- `logout`: Handles user logout and automatically dispatches `logout`
- `register`, `forgetPassword`, `verifyOtp`, `resetPassword`: Other auth endpoints

### 3. Protected Routes (`src/components/ProtectedRoute.tsx`)

Component that wraps protected pages:
- Checks authentication status
- Redirects to login if not authenticated
- Preserves intended destination for post-login redirect

### 4. Public Routes (`src/components/PublicRoute.tsx`)

Component that wraps public pages (login, signup, etc.):
- Redirects authenticated users to dashboard
- Only accessible when not logged in

## Usage Examples

### Login Response Data Structure

When a user logs in successfully, the API returns:

```json
{
    "message": "Logged in successfully!",
    "success": true,
    "user": {
        "_id": "68b5ce5a14389db8fff2e6cd",
        "fullName": "Admin Panel",
        "email": "admin01@yopmail.com",
        "phone": "1234567890043",
        "shippingAddress": "123 Main Street, New York, NY",
        "instagramHandle": "@johndoe",
        "cosmetologyLicenseNumber": "LIC123456",
        "stateOfIssuance": "New York",
        "currentAddress": "456 Elm Street, New York, NY",
        "licensePhoto": null,
        "user_bio": null,
        "points": [],
        "usedCoupons": [],
        "otp": null,
        "role": "admin",
        "isActive": true,
        "createdAt": "2025-09-01T16:48:26.714Z",
        "updatedAt": "2025-09-12T15:04:55.374Z",
        "__v": 1
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Using Authentication in Components

#### 1. Login Component

```tsx
import { useLoginMutation } from '../../redux/services/authSlice';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAccessToken } from '../../redux/slices/authSlice';

const LoginComponent = () => {
  const [login] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      if (response?.data?.success) {
        // Login successful - auth state is automatically updated
        // User will be redirected by ProtectedRoute
      }
    } catch (error) {
      // Handle login error
    }
  };
};
```

#### 2. Logout Component

```tsx
import { useLogoutMutation } from '../../redux/services/authSlice';

const LogoutComponent = () => {
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      // Logout successful - auth state is automatically cleared
      // User will be redirected to login by PublicRoute
    } catch (error) {
      // Even if API fails, local state is cleared
    }
  };
};
```

#### 3. Accessing User Data

```tsx
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '../../redux/slices/authSlice';

const UserProfile = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      {isAuthenticated && user && (
        <div>
          <h1>Welcome, {user.fullName}!</h1>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};
```

### Route Configuration

#### Protected Routes
```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

#### Public Routes
```tsx
<Route path="/login" element={
  <PublicRoute>
    <Login />
  </PublicRoute>
} />
```

## Automatic Features

### 1. Token Management
- Access tokens are automatically included in API requests via `prepareHeaders`
- Tokens are stored in Redux state and localStorage for persistence
- Tokens are automatically cleared on logout

### 2. Route Protection
- Protected routes automatically redirect to login if not authenticated
- Public routes automatically redirect to dashboard if already authenticated
- Intended destination is preserved for post-login redirect

### 3. State Persistence
- Authentication state is automatically restored from localStorage on app start
- User data and tokens persist across browser sessions
- State is automatically cleared on logout

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage for persistence but managed through Redux state
2. **Automatic Logout**: Logout clears both Redux state and localStorage
3. **Route Protection**: All protected routes are wrapped with authentication checks
4. **API Security**: All API requests automatically include the access token

## Error Handling

- Login errors are handled gracefully with user-friendly messages
- Logout errors don't prevent local state clearing
- Network errors are handled appropriately
- Invalid tokens result in automatic logout

This implementation provides a robust, secure, and user-friendly authentication system that handles all the common authentication scenarios automatically.
