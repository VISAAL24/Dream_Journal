import React from 'react'; // Add this import
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to Dream Journal</h1>
      <p>Record and analyze your dreams to better understand your subconscious</p>
    </div>
  );
}