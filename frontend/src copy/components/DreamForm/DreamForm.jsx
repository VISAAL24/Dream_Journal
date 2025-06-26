import { useState } from 'react'
import React from 'react'
import styles from './DreamForm.module.css'

export default function DreamForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mood: 'neutral',
    isLucid: false,
    date: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      mood: 'neutral',
      isLucid: false,
      date: ''
    });
  }

  return (
    <form className={styles.dreamForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="mood">Mood</label>
        <select
          id="mood"
          name="mood"
          value={formData.mood}
          onChange={handleChange}
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="scary">Scary</option>
          <option value="confusing">Confusing</option>
          <option value="neutral">Neutral</option>
          <option value="exciting">Exciting</option>
        </select>
      </div>
      <div className={styles.formGroup + ' ' + styles.checkboxGroup}>
        <label htmlFor="isLucid">
          <input
            type="checkbox"
            id="isLucid"
            name="isLucid"
            checked={formData.isLucid}
            onChange={handleChange}
          />
          Lucid Dream
        </label>
      </div>
      <button type="submit" className={styles.submitButton}>
        Save Dream
      </button>
    </form>
  )
}