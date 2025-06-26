import { useContext } from 'react'
import React from 'react'
import { AppContext } from '../../context/AppContext'
import styles from './DreamList.module.css'

export default function DreamList() {
  const { dreams, loading, error } = useContext(AppContext)

  if (loading) return <div className={styles.loading}>Loading dreams...</div>
  if (error) return <div className={styles.error}>{error}</div>
  if (!dreams || dreams.length === 0) return <div className={styles.empty}>No dreams recorded yet</div>

  return (
    <div className={styles.dreamList}>
      {dreams.map(dream => (
        <div key={dream._id || dream.id} className={styles.dreamCard}>
          <h3>{dream.title}</h3>
          <p className={styles.description}>{dream.description}</p>
          <p className={styles.date}>
            <strong>Date:</strong>{" "}
            {dream.date
              ? new Date(dream.date).toLocaleDateString()
              : "N/A"}
          </p>
          <p className={styles.mood}>
            <strong>Mood:</strong> {dream.mood ? dream.mood : 'N/A'}
          </p>
          <p className={styles.lucid}>
            <strong>Lucid Dream:</strong> {dream.isLucid ? 'Yes' : 'No'}
          </p>
        </div>
      ))}
    </div>
  )
}