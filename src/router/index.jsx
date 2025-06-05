// src/router/index.js

import { Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import VerifyAccountt from '../pages/VerifyAccountt';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Home from '../pages/Home';
import ProfilePage from '../pages/ProfilePage'; // Ensure this path is correct, it might be '../pages/ProfilePage'
import SearchPage from '../pages/SearchPage';
import AuthProvider from '../api/AuthProvider'; // Your AuthProvider is correctly imported

// Import the new ProtectedRoute component
import ProtectedRoute from '../components/ProtectedRoute'; // <--- ADD THIS IMPORT
import CreatePostPage from '../pages/CreatePostPage';
import PageNotFound from '../pages/NotFound';


export default function AppRouter() {
  return (
    <>
      <AuthProvider> {/* AuthProvider correctly wraps all routes to provide auth context */}
        <Routes>
          {/* Public Routes - Accessible to everyone */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-account" element={<VerifyAccountt />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          

          {/* Protected Routes - Only accessible if authenticated */}
          {/* Use the <Route element={<ProtectedRoute />}> to wrap your protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} /> {/* Home is usually protected */}
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path= "/new-post" element = {<CreatePostPage />} />
            {/* Add any other routes that should only be accessible when logged in */}
          </Route>

          {/* You might also want a catch-all for 404 pages */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </AuthProvider>
      
    </>
  );
}