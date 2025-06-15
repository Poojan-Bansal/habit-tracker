// src/components/HabitCard.jsx
import React from "react";

export default function HabitCard({ habit, onComplete, onDelete }) {
  return (
    <div className={`habit-card ${habit.completed ? "habit-complete" : ""}`}>
      <div className="habit-title">{habit.title}</div>
      <div className="habit-desc">{habit.description}</div>
      <div className="streak-badge">🔥 {habit.streak} day streak</div>
      <div className="habit-actions">
        <button
          onClick={() => onComplete(habit._id)}
          className="complete-btn"
        >
          Complete
        </button>
        {onDelete && (
          <button
            onClick={() => onDelete(habit._id)}
            className="delete-btn"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
