
import React, { useEffect, useState } from "react";
import { habits as habitsAPI, auth as authService } from "../services/api";
import HabitForm from "./HabitForm";
import HabitCard from "./HabitCard";

export default function Dashboard({ onLogout }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        const data = await habitsAPI.list();
        setHabits(data || []);
      } catch (err) {
        alert("Failed to load habits: " + err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const handleAdd = async ({ title, description }) => {
    try {
      const created = await habitsAPI.create({ title, description });
      setHabits((prev) => [created, ...prev]);
    } catch (err) {
      alert("Failed to add habit: " + err.message);
    }
  };

 
  const handleComplete = async (id) => {
    try {
      const updated = await habitsAPI.complete(id);
      setHabits((prev) => prev.map((h) => (h._id === id ? updated : h)));
    } catch (err) {
      alert("Failed to complete habit: " + err.message);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this habit?")) return;
    try {
      await habitsAPI.delete(id);
      setHabits((prev) => prev.filter((h) => h._id !== id));
    } catch (err) {
      alert("Failed to delete habit: " + err.message);
    }
  };

  const doLogout = () => {
    authService.logout();
    onLogout();
  };

  if (loading) {
    return (
      <div className="container dashboard-container">
        <p>Loading habits...</p>
      </div>
    );
  }

  return (
    <div className="container dashboard-container">
      <div className="dashboard-header">
        <h1>Habit Tracker</h1>
        <button onClick={doLogout}>Logout</button>
      </div>

      <HabitForm onAdd={handleAdd} />

      <div className="habits-grid">
        {habits.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
            No habits yet. Add one above!
          </p>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit._id}
              habit={habit}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
