const JAMENDO_CLIENT_ID = 'your_client_id'; // In a real app, this would be in environment variables
const BASE_URL = 'https://api.jamendo.com/v3.0';

// For demo purposes, we'll use the public API without client_id
// In production, you should register for a client_id at https://developer.jamendo.com/

export const jamendoApi = {
  // Get popular tracks
  getTracks: async (limit = 20, offset = 0, search = '') => {
    try {
      let url = `${BASE_URL}/tracks/?format=json&limit=${limit}&offset=${offset}&order=popularity_total`;
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      return {
        results: data.results || [],
        headers: data.headers || {}
      };
    } catch (error) {
      console.error('Error fetching tracks:', error);
      throw error;
    }
  },

  // Get track by ID
  getTrackById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tracks/?format=json&id=${id}`);
      const data = await response.json();
      return data.results?.[0] || null;
    } catch (error) {
      console.error('Error fetching track:', error);
      throw error;
    }
  },

  // Get albums
  getAlbums: async (limit = 20, offset = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/albums/?format=json&limit=${limit}&offset=${offset}&order=popularity_total`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching albums:', error);
      throw error;
    }
  },

  // Get artists
  getArtists: async (limit = 20, offset = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/artists/?format=json&limit=${limit}&offset=${offset}&order=popularity_total`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching artists:', error);
      throw error;
    }
  }
};