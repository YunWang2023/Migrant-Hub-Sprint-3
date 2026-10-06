import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { themeFor } from "../data/mustDoTheme";
import useApi from "../hooks/useApi.js";
import "../styles/mustdo.css";

export default function MustDoDetail() {
  const { slug } = useParams();
  const { data: item, loading, error, request } = useApi();

  useEffect(() => {
    request(`/mustdo/${slug}`).catch(() => {});
  }, [request, slug]);

  const theme = themeFor(slug);

  return (
    <>
      <main
        className="must-do-page"
        style={{ "--accent": theme.color, "--tint": theme.tint }}
      >
        <Link to="/must-do" className="md-back">← Back to checklist</Link>

        {loading && <p role="status" className="md-status">Loading…</p>}
        {error && (
          <p role="alert" className="md-error">
            {error === "Not found" ? "This Must Do item does not exist." : error}
          </p>
        )}

        {item && (
          <article className="md-detail">
            <header className="md-detail-header">
              <span className="md-icon md-icon-large" aria-hidden="true">{theme.icon}</span>
              <div>
                <p className="md-step">Step {item.order}</p>
                <h1>{item.title}</h1>
                <p className="md-detail-summary">{item.summary}</p>
              </div>
            </header>

            <div className="md-detail-body">
              <section className="md-section">
                <h2>What is it?</h2>
                <p>{item.whatIsIt}</p>
              </section>

              <section className="md-section">
                <h2>Who needs it?</h2>
                <p>{item.whoNeedsIt}</p>
              </section>

              <section className="md-section">
                <h2>Documents you need</h2>
                <ul className="md-docs">
                  {(item.documents ?? []).map((doc) => <li key={doc}>{doc}</li>)}
                </ul>
              </section>

              <section className="md-section">
                <h2>How long it takes</h2>
                <p>{item.howLong}</p>
              </section>
            </div>

            <footer className="md-detail-footer">
              <a
                href={item.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="md-button"
              >
                {item.officialLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
                <span aria-hidden="true"> ↗</span>
              </a>
              <small>Information checked on {item.checkedOn}</small>
            </footer>
          </article>
        )}
      </main>
    </>
  );
}
