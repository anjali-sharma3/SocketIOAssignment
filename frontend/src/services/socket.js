import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const useSocket = () => {
    useEffect(() => {
        // Optional: Log socket connection status
        socket.on('connect', () => {
            console.log('Socket connected');
        });

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;
