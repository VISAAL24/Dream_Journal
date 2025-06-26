import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import DreamForm from '../../components/DreamForm/DreamForm';
import DreamList from '../../components/DreamList/DreamList';
import axios from 'axios';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { 
    user, 
    dreams, 
    error, 
    fetchDreams,
    logout,
    loading,
    setError // optional, if you want to set error on create
  } = useContext(AppContext);
  
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      navigate('/auth');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchDreams();
    }
  }, [user, fetchDreams]);

  const handleCreate = async (dreamData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    try {
      const res = await axios.post('/dreams', dreamData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // After creating, reload dreams from backend for consistency
      await fetchDreams();
      if (setError) setError(null);
      setSuccessMsg(res.data.message || 'Dream saved');
      setTimeout(() => setSuccessMsg(''), 2000); // Clear after 2s
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
        if (setError) setError('Session expired. Please login again.');
      } else if (setError) {
        setError(err.response?.data?.message || 'Error creating dream');
      }
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Welcome back, {user?.username}</h1>
      {successMsg && <div className={styles.success}>{successMsg}</div>}
      {error && <div className={styles.error}>{error}</div>}
      <DreamForm onSubmit={handleCreate} />
      {loading ? (
        <div className={styles.loading}>Loading your dreams...</div>
      ) : (
        <DreamList dreams={dreams} />
      )}
    </div>
  );
}