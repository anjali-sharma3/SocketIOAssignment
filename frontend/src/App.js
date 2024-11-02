import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PlayerDashboard from './components/PlayerDashboard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser)); // Parse and set user data
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Save user data in localStorage
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data from localStorage
        setUser(null); // Clear user state
    };

    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <Router>
            <Routes>
                <Route 
                    path="/dashboard" 
                    element={userData ? (userData.role === 'admin' ? <AdminDashboard user={userData} onLogout={handleLogout} /> : <PlayerDashboard user={userData} onLogout={handleLogout} />) : <Navigate to="/login" />} 
                />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={userData ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
