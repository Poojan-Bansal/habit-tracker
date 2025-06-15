// src/components/Signup.jsx
import React, { useState } from "react";
import { auth } from "../services/api";

export default function Signup({ onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !confirmPassword)
        throw new Error("All fields are required");
      if (password !== confirmPassword)
        throw new Error("Passwords do not match");

      await auth.signup({ name, email, password, confirmPassword });
      alert("Signup successful!");
      onSwitchToLogin();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="centered-container">
      <div className="container form-container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" style={{ width: "100%" }}>
            Signup
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="switch-button">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
