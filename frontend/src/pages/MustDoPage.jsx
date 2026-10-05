import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { themeFor } from "../data/mustDoTheme";
import "../styles/mustdo.css";

export default function MustDoPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/mustdo")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load the Must Do list.");
        return res.json();
      })
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="must-do-page">
        <p className="md-eyebrow">Your first weeks in Finland</p>
        <h1>Must Do Checklist</h1>
        <p className="md-intro">
          Six things almost every newcomer has to sort out. Do them roughly in
          this order: each step makes the next one easier.
        </p>

        {loading && <p role="status" className="md-status">Loading…</p>}
        {error && <p role="alert" className="md-error">{error}</p>}

        <ol className="md-grid">
          {items.map((item, index) => {
            const theme = themeFor(item.slug);
            return (
              <li
                key={item.id}
                className="md-card"
                style={{ "--accent": theme.color, "--tint": theme.tint }}
              >
                <div className="md-card-top">
                  <span className="md-icon" aria-hidden="true">{theme.icon}</span>
                  <span className="md-step">Step {item.order ?? index + 1}</span>
                </div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <Link
                  to={`/must-do/${item.slug}`}
                  className="md-button"
                  aria-label={`View details: ${item.title}`}
                >
                  View details <span aria-hidden="true">→</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
      <Footer />
    </>
  );
}
