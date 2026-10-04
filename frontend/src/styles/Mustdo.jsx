import { Link } from "react-router-dom";

function MustDo() {
  const checklist = [
    {
      number: "01",
      title: "DVV Registration",
      text: "Register your address and personal details with the Digital and Population Data Services Agency.",
      button: "View Details →",
    },
    {
      number: "02",
      title: "Residence Permit",
      text: "Complete identity verification or submit additional documents if required.",
      button: "View Details →",
    },
    {
      number: "03",
      title: "Bank Account",
      text: "Open a Finnish bank account for daily expenses and electronic identification.",
      button: "View Details →",
    },
    {
      number: "04",
      title: "Finnish ID",
      text: "Apply for the documents and identification you need for everyday life in Finland.",
      button: "View Details →",
    },
    {
      number: "05",
      title: "Public Transport",
      text: "Get familiar with HSL tickets, travel zones and public transport around Helsinki.",
      button: "View Details →",
    },
    {
      number: "06",
      title: "Health Services",
      text: "Learn how healthcare works and where to find the services available to you.",
      button: "View Details →",
    },
  ];

  return (
    <main className="must-do-page">

      {/* HERO */}

      <section className="must-do-hero">

        <div className="must-do-hero-content">

          <p className="must-do-label">
            YOUR CHECKLIST
          </p>

          <h1>
            Must Do in Finland
          </h1>

          <p>
            A step-by-step guide to help you settle in and take care
            of important things.
          </p>

        </div>

        <div className="must-do-decoration">
          Small Steps
          <br />
          <span>A Bigger Tomorrow</span>
          <div>♡</div>
        </div>

      </section>


      {/* CHECKLIST */}

      <section className="must-do-content">

        <div className="must-do-heading">

          <div>
            <p className="section-label">
              GET STARTED
            </p>

            <h2>
              Things to take care of
            </h2>
          </div>

          <Link
            to="/"
            className="must-do-back"
          >
            ← Back to home
          </Link>

        </div>


        <div className="must-do-grid">

          {checklist.map((item) => (

            <article
              className="must-do-card"
              key={item.number}
            >

              <div className="must-do-card-top">

                <span className="must-do-number">
                  {item.number}
                </span>

                <div className="must-do-icon">
                  ✓
                </div>

              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

              <button type="button">
                {item.button}
              </button>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}

export default MustDo;