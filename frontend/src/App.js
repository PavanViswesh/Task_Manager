import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import "./styles/auth.css";

import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  // 🚪 LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.info("Logged out successfully 👋");
  };


  return (
    <>
      {/* 🔔 TOASTS (GLOBAL) */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* 🔒 NOT LOGGED IN */}
      {!token ? (
        showRegister ? (
          <Register onRegister={() => setShowRegister(false)} />
        ) : (
          <Login
            onLogin={(newToken) => {
              localStorage.setItem("token", newToken);
              setToken(newToken);
            }}
            onShowRegister={() => setShowRegister(true)}
          />
        )
      ) : (
        /* ✅ LOGGED IN */
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
