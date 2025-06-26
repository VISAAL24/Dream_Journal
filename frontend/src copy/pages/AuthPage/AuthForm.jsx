import { useState, useEffect } from 'react';
import styles from './AuthForm.module.css';
import React from 'react';
export default function AuthForm({ isLogin, onSubmit, error, loading }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Reset form when switching between login/register
  useEffect(() => {
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  }, [isLogin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    onSubmit(isLogin
      ? { username: formData.username, password: formData.password }
      : formData
    );
  };

  const validateForm = () => {
    if (!isLogin && (!formData.email || !formData.email.includes('@'))) {
      return false;
    }
    if (formData.username.length < 3) {
      return false;
    }
    if (formData.password.length < 6) {
      return false;
    }
    return true;
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          minLength="3"
          maxLength="15"
          placeholder="Minimum 3, max 15 characters"
        />
      </div>
      {!isLogin && (
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
        </div>
      )}
      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
          placeholder="Minimum 6 characters"
        />
      </div>
      {error && (
        <div className={styles.error}>
          {error === 'Invalid credentials'
            ? 'Invalid username or password.'
            : error}
        </div>
      )}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
}