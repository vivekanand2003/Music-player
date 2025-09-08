import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';

const SongCard = ({ song }) => {
  const { user } = useAuth();
  const { likedSongs, toggleLike, playSong, currentSong, isPlaying } = useMusic();
  const navigate = useNavigate();

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

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="song-card">
      <Link  onClick={handlePlay} >
        <div className={`song-thumbnail ${!song.image ? 'no-image' : ''}`}>
          {song.image ? (
            <img src={song.image} alt={song.name} />
          ) : (
            '🎵'
          )}
        </div>
      </Link>
      
      <div className="song-info">
        <h3>{song.name}</h3>
        <p>{song.artist_name}</p>
        <p style={{ fontSize: '0.8rem', color: '#999' }}>
          {formatDuration(song.duration)} • {formatNumber(song.play_count)} plays
        </p>
        {song.genre && (
          <p style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
            {song.genre}
          </p>
        )}
      </div>

      <div className="song-actions">
        <button 
          onClick={handlePlay} 
          className="btn btn-play"
        >
          {isCurrentSong && isPlaying ? '⏸️' : '▶️'} 
          {isCurrentSong && isPlaying ? ' Pause' : ' Play'}
        </button>
        
        <button 
          onClick={handleLike}
          className={`btn btn-like ${isLiked ? 'liked' : ''}`}
          title={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default SongCard;