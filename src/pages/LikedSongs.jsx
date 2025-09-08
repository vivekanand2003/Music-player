import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';
import { useNavigate } from 'react-router-dom';
import SongCard from '../components/SongCard';

const LikedSongs = () => {
  const { user } = useAuth();
  const { getLikedSongsData } = useMusic();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Please log in to view your liked songs</h2>
        <button onClick={() => navigate('/login')} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }

  const likedSongsData = getLikedSongsData();

  return (
    <div>
      <h1>Your Liked Songs</h1>
      <p>Here are all the songs you've liked. Enjoy your personal collection!</p>

      {likedSongsData.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            You haven't liked any songs yet.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Discover Music
          </button>
        </div>
      ) : (
        <div className="songs-grid">
          {likedSongsData.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;