import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PlayerList.css'; 

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players') 
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); 
        setPlayers(data.data.players || []); // Access the correct nested property
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Players</h1>
      <div className="player-list">
        {Array.isArray(players) && players.length > 0 ? (
          players.map(player => ( // Ensure players is an array
            <div key={player.id} className="player-card">
              <img src={player.imageUrl} alt={player.name} className="player-image" />
              <h2>{player.name}</h2>
              <p>Breed: {player.breed}</p>
              <p>Status: {player.status}</p>
              <Link to={`/player/${player.id}`}>View Player</Link>
            </div>
          ))
        ) : (
          <div>No players found.</div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;