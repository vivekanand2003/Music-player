import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';

const SongDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { likedSongs, toggleLike, playSong, currentSong, isPlaying, songs, getSongById } = useMusic();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSongDetails();
  }, [id]);

  const loadSongDetails = () => {
    try {
      setLoading(true);
      setError(null);
      
      // First try to find the song in the current songs list
      const songData = getSongById(id);
      if (songData) {
        setSong(songData);
      } else {
        setError('Song not found. Please go back and select a song from the list.');
      }
    } catch (err) {
      setError('Failed to load song details');
      console.error('Error loading song:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading song details...</h2>
      </div>
    );
  }

  if (error || !song) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Song not found</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const isLiked = likedSongs.includes(song.id);
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    playSong(song);
  };

  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    toggleLike(song.id);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="song-detail">
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Back
      </button>

      <div className="song-detail-header">
        <div className={`song-detail-thumbnail ${!song.image ? 'no-image' : ''}`}>
          {song.image ? (
            <img src={song.image} alt={song.name} />
          ) : (
            '🎵'
          )}
        </div>
        
        <div className="song-detail-info">
          <h1>{song.name}</h1>
          <p><strong>Artist:</strong> {song.artist_name}</p>
          <p><strong>Album:</strong> {song.album_name}</p>
          <p><strong>Duration:</strong> {formatDuration(song.duration)}</p>
          <p><strong>Genre:</strong> {song.genre}</p>
          <p><strong>Release Date:</strong> {formatDate(song.releasedate)}</p>
          <p><strong>Plays:</strong> {formatNumber(song.play_count)}</p>
          <p><strong>Favorites:</strong> {formatNumber(song.favorite_count)}</p>
          
          <div className="song-detail-actions">
            <button 
              onClick={handlePlay} 
              className="btn btn-play"
            >
              {isCurrentSong && isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            
            <button 
              onClick={handleLike}
              className={`btn btn-like ${isLiked ? 'liked' : ''}`}
            >
              {isLiked ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>

          {!user && (
            <p style={{ marginTop: '1rem', color: '#666', fontStyle: 'italic' }}>
              Please <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>login</button> to play and like songs.
            </p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>About this track</h3>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          "{song.name}" by {song.artist_name} is a {song.genre.toLowerCase()} track from the album "{song.album_name}". 
          This song has been played {formatNumber(song.play_count)} times and favorited by {formatNumber(song.favorite_count)} users on Audius. 
          The track spans {formatDuration(song.duration)} and was released on {formatDate(song.releasedate)}.
        </p>
        
        {song.tags && (
          <div style={{ marginTop: '1rem' }}>
            <h4>Tags:</h4>
            <p style={{ color: '#666' }}>{song.tags}</p>
          </div>
        )}

        <div style={{ marginTop: '1rem' }}>
          <h4>Artist:</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {song.user.profile_picture && (
              <img 
                src={song.user.profile_picture} 
                alt={song.user.name}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            )}
            <div>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{song.user.name}</p>
              {song.user.handle && (
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>@{song.user.handle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetail;