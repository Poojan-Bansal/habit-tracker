import React, { useState } from "react";
import "./styles.css";

import Login     from "./components/Login";
import Signup    from "./components/Signup";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [page, setPage] = useState("login");

  const handleLoginSuccess = () => setPage("dashboard");
  const handleLogout       = () => setPage("login");

  return (
    <>
      {page === "login"    && (
        <Login
          onSwitchToSignup={ () => setPage("signup") }
          onLoginSuccess={ handleLoginSuccess }
        />
      )}
      {page === "signup"   && (
        <Signup onSwitchToLogin={ () => setPage("login") } />
      )}
      {page === "dashboard"&& (
        <Dashboard onLogout={ handleLogout } />
      )}
    </>
  );
}
