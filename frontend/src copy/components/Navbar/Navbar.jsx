import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useContext(AppContext);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Dream Journal
      </Link>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className={styles.button}>Logout</button>
          </>
        ) : (
          <Link to="/auth">Login/Register</Link>
        )}
      </div>
    </nav>
  );
}