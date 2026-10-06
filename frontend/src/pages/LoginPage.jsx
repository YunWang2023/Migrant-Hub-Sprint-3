import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useApi from "../hooks/useApi.js";
import "../styles/auth.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const { loading, error, request } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await request("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      login(result.user, result.token);
      navigate("/");
    } catch {
      // useApi already stored the message in `error`
    }
  };

  return (
    <>
      <main className="auth-page">
        <section className="auth-card" aria-labelledby="login-title">
          <div className="auth-badge" aria-hidden="true">👋</div>
          <h1 id="login-title">Welcome back</h1>
          <p className="auth-subtitle">
            Log in to write posts and share your experience.
          </p>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <div className="password-field">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading || !email || !password}
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="auth-switch">
            New to Migrant Hub? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </main>
    </>
  );
}
