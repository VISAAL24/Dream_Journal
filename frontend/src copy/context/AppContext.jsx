import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    dreams: [],
    loading: false,
    error: null
  });

  // Unified state update
  const updateState = (newState) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const fetchDreams = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get('/dreams', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Always clear error if request succeeds, even if dreams is empty or missing
      updateState({ dreams: Array.isArray(res.data) ? res.data : [], error: null });
    } catch (err) {
      // Only set error if the request itself fails
      console.error('Fetch dreams error:', err);
      updateState({ 
        error: err.response?.data?.message || 'Failed to load dreams' 
      });
    }
  };

  const verifyToken = async () => {
    try {
      updateState({ loading: true });
      const token = localStorage.getItem('token');
      if (!token) {
        updateState({ user: null });
        return;
      }
      const res = await axios.get('/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      updateState({ user: res.data.user });
      await fetchDreams();
    } catch (err) {
      console.error('Token verification error:', err);
      localStorage.removeItem('token');
      updateState({ 
        user: null,
        error: 'Session expired. Please login again.' 
      });
    } finally {
      updateState({ loading: false });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) verifyToken();
  }, []);

  const register = async (userData) => {
    try {
      updateState({ loading: true, error: null });
      // userData: { username, email, password }
      const res = await axios.post('/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      updateState({ user: res.data.user });
      await fetchDreams();
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      updateState({
        error: err.response?.data?.message || 'Registration failed'
      });
      return false;
    } finally {
      updateState({ loading: false });
    }
  };

  const login = async (credentials) => {
    try {
      updateState({ loading: true, error: null });
      // credentials: { username, password }
      const res = await axios.post('/auth/login', credentials);
      localStorage.setItem('token', res.data.token);
      updateState({ user: res.data.user });
      await fetchDreams();
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      updateState({
        error: err.response?.data?.message || 'Login failed'
      });
      return false;
    } finally {
      updateState({ loading: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    updateState({ user: null, dreams: [] });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        fetchDreams,
        setError: (message) => updateState({ error: message })
      }}
    >
      {children}
    </AppContext.Provider>
  );
}