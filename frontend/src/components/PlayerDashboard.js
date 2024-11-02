import React, { useEffect, useState } from 'react';
import useSocket from '../services/socket';
import './PlayerDashboard.css'; 
import { useNavigate } from 'react-router-dom';

const PlayerDashboard = ({ user }) => {
    const [bananaCount, setBananaCount] = useState(0);
    const socket = useSocket();
    const navigate = useNavigate();

    const handleBananaClick = async () => {
        const response = await fetch(`http://localhost:5000/api/player/click`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email }),
        });

        if (response.ok) {
            const data = await response.json();
            setBananaCount(data.score);
            socket.emit('bananaClick', { userId: user.id, newCount: data.bananaClicks }); 
        } else {
            // Handle error response
            const errorData = await response.json();
            console.error('Error updating clicks:', errorData.error);
            alert('Error updating banana clicks. Please try again.');
        }
    };

    const handleLogout = () => {
      localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="player-dashboard">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <h2 className="welcome-message">Welcome, {user.email}</h2>
            <div className="banana-container">
                <button className="banana-button" onClick={handleBananaClick}>
                    <img src='https://img.freepik.com/free-vector/simple-isolated-banana_1308-125007.jpg' alt="Banana" className="banana-image" />
                </button>
                <p className="click-count">Your Banana Click Count: {bananaCount}</p>
            </div>
        </div>
    );
};

export default PlayerDashboard;



