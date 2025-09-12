import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectAccessToken, initializeAuth } from '../redux/slices/authSlice';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Check if user is authenticated
  const isUserAuthenticated = isAuthenticated && accessToken;

  // If authenticated, redirect to dashboard or intended page
  if (isUserAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  // If not authenticated, render the public component
  return <>{children}</>;
};

export default PublicRoute;
