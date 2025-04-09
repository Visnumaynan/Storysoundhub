import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const BookClubService = {
  // Get all book clubs
  getAllBookClubs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book-clubs`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book clubs:', error);
      throw error;
    }
  },

  // Get a specific book club by ID
  getBookClubById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/book-clubs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book club with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new book club
  createBookClub: async (bookClubData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/book-clubs`, bookClubData);
      return response.data;
    } catch (error) {
      console.error('Error creating book club:', error);
      throw error;
    }
  },

  // Update a book club
  updateBookClub: async (id, bookClubData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/book-clubs/${id}`, bookClubData);
      return response.data;
    } catch (error) {
      console.error(`Error updating book club with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a book club
  deleteBookClub: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/book-clubs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book club with id ${id}:`, error);
      throw error;
    }
  }
};

export default BookClubService;