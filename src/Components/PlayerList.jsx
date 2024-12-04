import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PlayerList.css'; 

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    breed: '',
    status: '',
    imageUrl: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleDelete = (id) => {
    fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setPlayers(players.filter(player => player.id !== id));
        } else {
          console.error('Failed to delete player');
        }
      })
      .catch(error => console.error('Error deleting player:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear success message before submitting
    fetch('https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlayer)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data); // Log the entire response data
        if (data.success && data.data && data.data.player) {
          console.log('Added player:', data);
          setPlayers(prevPlayers => [...prevPlayers, data.data.player]); // Update state correctly
          setNewPlayer({ name: '', breed: '', status: '', imageUrl: '' });
          setSuccessMessage('New player successfully added');
          setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
        } else {
          console.error('Failed to add player:', data.error);
          setSuccessMessage('Failed to add player');
        }
      })
      .catch(error => {
        console.error('Error adding player:', error);
        setSuccessMessage('Error adding player');
      });
  };

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
              <div className="button-group">
                <Link to={`/player/${player.id}`} className="button">View Player</Link>
                <button onClick={() => handleDelete(player.id)} className="button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div>No players found.</div>
        )}
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <h2>Add Player</h2>
      <form onSubmit={handleSubmit} className="add-player-form">
        <input
          type="text"
          name="name"
          value={newPlayer.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="breed"
          value={newPlayer.breed}
          onChange={handleChange}
          placeholder="Breed"
          required
        />
        <input
          type="text"
          name="status"
          value={newPlayer.status}
          onChange={handleChange}
          placeholder="Status"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={newPlayer.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <button type="submit" className="button">Add</button>
      </form>
    </div>
  );
};

export default PlayerList;