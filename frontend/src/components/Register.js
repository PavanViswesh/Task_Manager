import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully 🎉");
      onRegister(); // back to login
    } catch (err) {
      toast.error("Email already exists ❌");
    }
  };

  return (
    <div className="login-box">
      <h2>SIGN UP</h2>

      {/* NAME */}
      <div className="input-group">
        <div className="icon-circle">👤</div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* EMAIL */}
      <div className="input-group">
        <div className="icon-circle">📧</div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* PASSWORD */}
      <div className="input-group invert">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="icon-circle">🔒</div>
      </div>

      <button className="login-btn" onClick={handleRegister}>
        SIGN UP
      </button>

      <p className="footer-text">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="link-btn"
        >
          Login
        </button>

      </p>
    </div>
  );
}

export default Register;
