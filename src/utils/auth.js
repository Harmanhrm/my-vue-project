// src/utils/auth.js
import {jwtDecode} from 'jwt-decode';

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return !!decodedToken.username; // Adjust according to your token structure
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
  return false;
};

export const getUsername = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.username; // Adjust according to your token structure
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};