import axios from 'axios';

// The base URL will be proxied by the Vite development server.
const API_URL = '/api';

/**
 * Fetches the current user's data using the provided token.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<object>} The user data.
 */
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/users/me`, config);
  return response.data;
};

const authService = {
  getMe,
};

export default authService;

