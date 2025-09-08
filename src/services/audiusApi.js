const BASE_URL = 'https://api.audius.co/v1';

export const audiusApi = {
  // Search tracks
  searchTracks: async (query = 'popular', limit = 50) => {
    try {
      const searchQuery = query.trim() || 'popular';
      const url = `${BASE_URL}/tracks/search?query=${encodeURIComponent(searchQuery)}&app_name=musicstream&limit=${limit}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter and map tracks
      const tracks = (data.data || [])
        .filter(track => track.stream && track.stream.url) // Only streamable tracks
        .map(track => ({
          id: track.track_id || track.id,
          name: track.title || 'Unknown Title',
          title: track.title || 'Unknown Title',
          artist_name: track.user?.name || track.user?.handle || 'Unknown Artist',
          album_name: track.album?.album_name || 'Unknown Album',
          duration: track.duration || 0,
          image: track.artwork?.['480x480'] || track.artwork?.['150x150'] || null,
          audio: track.stream.url,
          stream_url: track.stream.url,
          releasedate: track.release_date || new Date().toISOString(),
          tags: track.tags || '',
          genre: track.genre || 'Unknown',
          play_count: track.play_count || 0,
          favorite_count: track.favorite_count || 0,
          user: {
            name: track.user?.name || track.user?.handle || 'Unknown Artist',
            handle: track.user?.handle || '',
            profile_picture: track.user?.profile_picture?.['150x150'] || null
          }
        }));

      return {
        results: tracks,
        total: data.data?.length || 0
      };
    } catch (error) {
      console.error('Error fetching tracks from Audius:', error);
      throw new Error('Failed to fetch tracks from Audius API');
    }
  },

  // Get track by ID
  getTrackById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tracks/${id}?app_name=musicstream`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const track = data.data;
      
      if (!track || !track.stream || !track.stream.url) {
        return null;
      }

      return {
        id: track.track_id || track.id,
        name: track.title || 'Unknown Title',
        title: track.title || 'Unknown Title',
        artist_name: track.user?.name || track.user?.handle || 'Unknown Artist',
        album_name: track.album?.album_name || 'Unknown Album',
        duration: track.duration || 0,
        image: track.artwork?.['480x480'] || track.artwork?.['150x150'] || null,
        audio: track.stream.url,
        stream_url: track.stream.url,
        releasedate: track.release_date || new Date().toISOString(),
        tags: track.tags || '',
        genre: track.genre || 'Unknown',
        play_count: track.play_count || 0,
        favorite_count: track.favorite_count || 0,
        user: {
          name: track.user?.name || track.user?.handle || 'Unknown Artist',
          handle: track.user?.handle || '',
          profile_picture: track.user?.profile_picture?.['150x150'] || null
        }
      };
    } catch (error) {
      console.error('Error fetching track by ID:', error);
      throw error;
    }
  },

  // Get trending tracks
  getTrendingTracks: async (limit = 50) => {
    try {
      const response = await fetch(`${BASE_URL}/tracks/trending?app_name=musicstream&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const tracks = (data.data || [])
        .filter(track => track.stream && track.stream.url)
        .map(track => ({
          id: track.track_id || track.id,
          name: track.title || 'Unknown Title',
          title: track.title || 'Unknown Title',
          artist_name: track.user?.name || track.user?.handle || 'Unknown Artist',
          album_name: track.album?.album_name || 'Unknown Album',
          duration: track.duration || 0,
          image: track.artwork?.['480x480'] || track.artwork?.['150x150'] || null,
          audio: track.stream.url,
          stream_url: track.stream.url,
          releasedate: track.release_date || new Date().toISOString(),
          tags: track.tags || '',
          genre: track.genre || 'Unknown',
          play_count: track.play_count || 0,
          favorite_count: track.favorite_count || 0,
          user: {
            name: track.user?.name || track.user?.handle || 'Unknown Artist',
            handle: track.user?.handle || '',
            profile_picture: track.user?.profile_picture?.['150x150'] || null
          }
        }));

      return {
        results: tracks,
        total: data.data?.length || 0
      };
    } catch (error) {
      console.error('Error fetching trending tracks:', error);
      throw error;
    }
  }
};