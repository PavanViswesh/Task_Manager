import Login from "../components/Login";
import Register from "../components/Register";
import "../styles/auth.css";

function AuthPage({ showRegister, setShowRegister, onLogin }) {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          {showRegister ? (
            <Register onRegister={() => setShowRegister(false)} />
          ) : (
            <Login
              onLogin={onLogin}
              onShowRegister={() => setShowRegister(true)}
            />
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <h2>Connect anytime, anywhere</h2>
          <p>Free • Easy Setup • Private</p>
          <img
            src="/illustration.png"
            alt="illustration"
          />
        </div>

      </div>
    </div>
  );
}

export default AuthPage;
