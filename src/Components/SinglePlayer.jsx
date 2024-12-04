import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePlayer.css'; // Create a CSS file for styling if needed

const SinglePlayer = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched player data:', data);
        setPlayer(data.data.player); // Access the correct nested property
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching player:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!player) {
    return <div>Player not found.</div>;
  }

  return (
    <div className="single-player">
      <img src={player.imageUrl} alt={player.name} className="player-image" />
      <h2>{player.name}</h2>
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <p>Created At: {new Date(player.createdAt).toLocaleDateString()}</p>
      <p>Updated At: {new Date(player.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default SinglePlayer;
