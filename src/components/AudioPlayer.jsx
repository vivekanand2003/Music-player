import { useMusic } from '../context/MusicContext';

const AudioPlayer = () => {
  const { 
    currentSong, 
    isPlaying, 
    pauseSong, 
    stopSong, 
    playNext, 
    playPrevious, 
    toggleLike, 
    likedSongs,
    currentTime,
    duration,
    seekTo
  } = useMusic();

  if (!currentSong) return null;

  const isLiked = likedSongs.includes(currentSong.id);

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

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    seekTo(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div className="audio-player">
      <div className="audio-player-content">
        <div className="audio-player-info">
          <div 
            className="audio-player-thumbnail"
            style={{
              backgroundImage: currentSong.image ? `url(${currentSong.image})` : 'none'
            }}
          >
            {!currentSong.image && '🎵'}
          </div>
          <div className="audio-player-details">
            <h4>{currentSong.name}</h4>
            <p>{currentSong.artist_name}</p>
            <p style={{ fontSize: '0.7rem', color: '#999' }}>
              {formatNumber(currentSong.play_count)} plays • {currentSong.genre}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="audio-progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <div 
            className="audio-progress-bar" 
            onClick={handleProgressClick}
          >
            <div 
              className="audio-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="time-display">{formatTime(duration)}</span>
        </div>
        
        <div className="audio-player-controls">
          <button 
            onClick={playPrevious}
            className="btn btn-secondary control-btn"
            title="Previous"
          >
            ⏮️
          </button>
          <button 
            onClick={pauseSong}
            className="btn btn-secondary control-btn"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button 
            onClick={playNext}
            className="btn btn-secondary control-btn"
            title="Next"
          >
            ⏭️
          </button>
          <button 
            onClick={stopSong}
            className="btn btn-secondary control-btn"
            title="Stop"
          >
            ⏹️
          </button>
          <button 
            onClick={() => toggleLike(currentSong.id)}
            className={`btn control-btn ${isLiked ? 'btn-liked' : 'btn-secondary'}`}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;