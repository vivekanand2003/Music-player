import { createContext, useContext, useState, useEffect } from 'react';
import { audiusApi } from '../services/audiusApi';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    loadCategoryTracks('hindi');
    loadLikedSongs();
  }, []);

  const loadCategoryTracks = async (category) => {
    try {
      setLoading(true);
      setError(null);
      let query = '';
      switch(category) {
        case 'hindi':
          query = 'hindi bollywood';
          break;
        case 'english':
          query = 'english pop rock';
          break;
        case 'popular':
          const trendingData = await audiusApi.getTrendingTracks(50);
          setSongs(trendingData.results);
          setLoading(false);
          return;
        default:
          query = 'hindi bollywood';
      }
      const data = await audiusApi.searchTracks(query, 50);
      setSongs(data.results);
    } catch (err) {
      setError('Failed to load tracks from Audius. Please try again later.');
      console.error('Error loading tracks:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTracks = async () => {
    await loadCategoryTracks('hindi');
  };

  const loadLikedSongs = () => {
    const savedLikedSongs = localStorage.getItem('likedSongs');
    if (savedLikedSongs) {
      setLikedSongs(JSON.parse(savedLikedSongs));
    }
  };

  const searchTracks = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await audiusApi.searchTracks(query, 50);
      setSongs(data.results);
    } catch (err) {
      setError('Failed to search tracks on Audius. Please try again.');
      console.error('Error searching tracks:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = (songId) => {
    const newLikedSongs = likedSongs.includes(songId)
      ? likedSongs.filter(id => id !== songId)
      : [...likedSongs, songId];
    
    setLikedSongs(newLikedSongs);
    localStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
  };

  const playSong = (song) => {
    const songIndex = songs.findIndex(s => s.id === song.id);
    setCurrentIndex(songIndex);

    setCurrentSong(song);

    // If there's an existing audio element, pause it
    if (audioRef) {
      audioRef.pause();
    }

    // Create new audio element
    const audio = new Audio(song.audio || song.stream_url);
    audio.crossOrigin = "anonymous";
    
    // Add time update listener for progress bar
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    // Add duration change listener
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      playNext(); // Auto play next song
    });
    
    audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      setError('Failed to play this track. It may not be available for streaming.');
      setIsPlaying(false);
    });

    audio.addEventListener('loadstart', () => {
      setError(null);
    });

    audio.addEventListener('canplay', () => {
      setIsPlaying(true);
    });
    setAudioRef(audio);
    
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
      setError('Unable to play this track. Please try another song.');
      setIsPlaying(false);
    });
  };

  const pauseSong = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
        setIsPlaying(false);
      } else {
        audioRef.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.error('Error resuming audio:', err);
          setError('Unable to resume playback.');
        });
      }
    }
  };

  const stopSong = () => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSong(null);
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
  };

  const playNext = () => {
    if (songs.length === 0) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIndex];
    if (nextSong) {
      playSong(nextSong);
    }
  };

  const playPrevious = () => {
    if (songs.length === 0) return;
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    const prevSong = songs[prevIndex];
    if (prevSong) {
      playSong(prevSong);
    }
  };

  const getSongById = (id) => {
    return songs.find(song => song.id === id);
  };

  const getLikedSongsData = () => {
    return songs.filter(song => likedSongs.includes(song.id));
  };

  const seekTo = (time) => {
    if (audioRef) {
      audioRef.currentTime = time;
      setCurrentTime(time);
    }
  };
  const value = {
    songs,
    loading,
    error,
    likedSongs,
    currentSong,
    isPlaying,
    currentIndex,
    currentTime,
    duration,
    toggleLike,
    playSong,
    pauseSong,
    stopSong,
    playNext,
    playPrevious,
    getSongById,
    getLikedSongsData,
    searchTracks,
    loadTracks,
    loadCategoryTracks,
    seekTo
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};