// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// You'll need a simple loader component
// For example:
const FullScreenLoader = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '2em'
    }}>
        
    </div>
);


const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) {
        // Show a loader while the authentication status is being determined by AuthProvider
        return <FullScreenLoader />;
    }

    // If not authenticated (and loading is false), redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // 'replace' prevents going back to the protected route
    }

    // If authenticated (and loading is false), render the nested routes
    return <Outlet />;
};

export default ProtectedRoute;