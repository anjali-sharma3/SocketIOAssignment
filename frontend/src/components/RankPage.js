import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function RankPage() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    socket.on('rankUpdate', (updatedRanking) => setRanking(updatedRanking));
    return () => socket.off('rankUpdate');
  }, []);

  return (
    <div className="rank-page">
      <h2>Player Ranking</h2>
      <ul>
        {ranking.map((player, index) => (
          <li key={player._id}>
            {index + 1}. {player.username} - {player.bananaClicks} clicks
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RankPage;
