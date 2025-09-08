import { useState, useEffect } from 'react';
import { useMusic } from '../context/MusicContext';
import SongCard from '../components/SongCard';

const Home = () => {
  const { songs, loading, error, searchTracks, loadTracks, loadCategoryTracks } = useMusic();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('hindi');

  useEffect(() => {
    // Load Hindi songs by default when component mounts
    loadCategoryTracks('hindi');
  }, []);

  const handleFetch = () => {
    if (searchTerm.trim()) {
      searchTracks(searchTerm);
    } else {
      // Load current category when search is empty
      loadCategoryTracks(activeCategory);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchTerm(''); // Clear search when switching categories
    loadCategoryTracks(category);
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading amazing music from Audius...</h2>
        <p>Please wait while we fetch the latest tracks from independent artists.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Discover Music on Audius</h1>
      <p>Explore thousands of tracks from independent artists and creators worldwide.</p>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for songs, artists, or albums..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button 
          onClick={handleFetch}
          className="btn btn-primary fetch-btn"
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      <div className="category-tabs">
        <button 
          className={`category-tab ${activeCategory === 'hindi' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('hindi')}
          disabled={loading}
        >
          Hindi
        </button>
        <button 
          className={`category-tab ${activeCategory === 'english' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('english')}
          disabled={loading}
        >
          English
        </button>
        <button 
          className={`category-tab ${activeCategory === 'popular' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('popular')}
          disabled={loading}
        >
          Popular
        </button>
      </div>

      <div className="songs-grid">
        {songs.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {songs.length === 0 && !loading && (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
          <p>No songs found matching your search.</p>
          <p>Try searching for artists or song titles.</p>
        </div>
      )}
    </div>
  );
};

export default Home;