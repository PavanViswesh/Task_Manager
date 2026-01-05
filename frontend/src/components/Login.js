import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      toast.success("Login successful 🚀");
      onLogin(res.data);
    } catch (err) {
      toast.error("Invalid email or password ❌");
    }setLoading(true);
  };

  return (
    <div className="login-box">
      <h2>USER LOGIN</h2>

      {/* USERNAME */}
      <div className="input-group">
        <div className="icon-circle">👤</div>
        <input
          type="text"
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

      <button
  className="login-btn"
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>


      <p style={{ color: "#9ca3af", marginTop: "20px" }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "#38bdf8", cursor: "pointer" }}
          onClick={onShowRegister}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
