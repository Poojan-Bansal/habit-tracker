// src/components/Login.jsx
import React, { useState } from "react";
import { auth } from "../services/api";

export default function Login({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error("Email and password required");
      const { token } = await auth.login({ email, password });
      localStorage.setItem("authToken", token);
      onLoginSuccess();
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <div className="centered-container">
      <div className="container form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
          <button type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <button onClick={onSwitchToSignup} className="switch-button">
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}
