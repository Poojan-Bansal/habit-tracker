// src/components/HabitForm.jsx
import React, { useState } from "react";

export default function HabitForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    onAdd({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="container form-container" onSubmit={handleSubmit}>
      <h2>Add New Habit</h2>
      <input
        type="text"
        placeholder="Habit Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}
