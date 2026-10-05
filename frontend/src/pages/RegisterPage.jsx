import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext.jsx";
import useApi from "../hooks/useApi.js";
import "../styles/auth.css";

const MIN_PASSWORD = 8;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);

  const { login } = useAuth();
  const { loading, error, request } = useApi();
  const navigate = useNavigate();

  const passwordTooShort = password.length > 0 && password.length < MIN_PASSWORD;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);

    // Check here first so the user gets a clear message
    // instead of a generic server error.
    if (!name.trim() || !email.trim()) {
      setFormError("Please fill in your name and email.");
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setFormError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }

    try {
      const result = await request("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });

      // The API returns a token on register, so log the user straight in.
      login(result.user, result.token);
      navigate("/");
    } catch {
      // useApi already stored the message in `error`
    }
  };

  const message = formError || error;

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-card" aria-labelledby="register-title">
          <div className="auth-badge" aria-hidden="true">🌱</div>
          <h1 id="register-title">Join Migrant Hub</h1>
          <p className="auth-subtitle">
            Create an account to share tips with other newcomers in Finland.
          </p>

          {message && (
            <p className="auth-error" role="alert">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <label htmlFor="register-name">Name</label>
            <input
              id="register-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="register-password">Password</label>
            <div className="password-field">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-hint"
                aria-invalid={passwordTooShort}
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
            <p
              id="password-hint"
              className={passwordTooShort ? "auth-hint auth-hint-warn" : "auth-hint"}
            >
              At least {MIN_PASSWORD} characters
              {password.length > 0 && ` (${password.length}/${MIN_PASSWORD})`}
            </p>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
