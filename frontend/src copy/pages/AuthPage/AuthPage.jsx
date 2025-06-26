import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const { login, register, error, loading } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    let success = false;
    if (isLogin) {
      success = await login(formData);
    } else {
      success = await register(formData);
    }
    if (success) {
      navigate('/dashboard');
    }
    // If not successful, error will be shown by AuthForm via the `error` prop
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.toggleAuth}>
        <button 
          onClick={() => setIsLogin(true)}
          className={isLogin ? styles.active : ''}
        >
          Login
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          className={!isLogin ? styles.active : ''}
        >
          Register
        </button>
      </div>
      <AuthForm 
        isLogin={isLogin}
        onSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
      <button onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
}