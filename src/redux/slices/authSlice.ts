import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the user interface based on the API response
export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  instagramHandle: string;
  cosmetologyLicenseNumber: string;
  stateOfIssuance: string;
  currentAddress: string;
  licensePhoto: string | null;
  user_bio: string | null;
  points: any[];
  usedCoupons: any[];
  otp: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the auth state interface
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define the login response interface
export interface LoginResponse {
  message: string;
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Login success - save user data and tokens
    loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;

      // Save to localStorage for persistence
      localStorage.setItem('userDetails', JSON.stringify({
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      }));
    },

    // Logout - clear all auth data
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem('userDetails');
    },

    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      try {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
          const parsed = JSON.parse(userDetails);
          if (parsed.accessToken && parsed.user) {
            state.user = parsed.user;
            state.accessToken = parsed.accessToken;
            state.refreshToken = parsed.refreshToken;
            state.isAuthenticated = parsed.isAuthenticated || true;
          }
        }
      } catch (error) {
        console.error('Error initializing auth from localStorage:', error);
        localStorage.removeItem('userDetails');
      }
    },

    // Update user profile
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        
        // Update localStorage
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
          const parsed = JSON.parse(userDetails);
          parsed.user = state.user;
          localStorage.setItem('userDetails', JSON.stringify(parsed));
        }
      }
    },

    // Update tokens (for token refresh)
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      // Update localStorage
      const userDetails = localStorage.getItem('userDetails');
      if (userDetails) {
        const parsed = JSON.parse(userDetails);
        parsed.accessToken = action.payload.accessToken;
        parsed.refreshToken = action.payload.refreshToken;
        localStorage.setItem('userDetails', JSON.stringify(parsed));
      }
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  loginSuccess,
  logout,
  initializeAuth,
  updateUserProfile,
  updateTokens,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
