import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "./Stylings/About.css";

const About = () => {
  return (
    <div className="page-container">
      <Header />

      <section className="about-page">
        <div className="about-header">
          <h1>About Us</h1>
          <p>
            Trusted digital journalism with responsibility, transparency and
            public interest at its core.
          </p>
        </div>

        <div className="about-content">
          <p className="about-intro">
            <strong>Social Activity BSP News</strong> is an independent digital
            news platform committed to delivering accurate, unbiased and
            verified news from across India. Our focus is on truth, public
            welfare and responsible reporting.
          </p>

          <div className="about-grid">
            <div className="about-card">
              <h2>Our Mission</h2>
              <p>
                To inform, educate and empower citizens by providing reliable
                news while maintaining the highest standards of journalistic
                ethics and accountability.
              </p>
            </div>

            <div className="about-card">
              <h2>What We Cover</h2>
              <p>
                National & regional news, social issues, politics, education,
                government schemes, public welfare programs and community
                developments.
              </p>
            </div>

            <div className="about-card">
              <h2>Editorial Policy</h2>
              <p>
                Every piece of content is reviewed before publication. We do
                not support fake news, misleading narratives or unverified
                claims.
              </p>
            </div>

            <div className="about-card">
              <h2>Corrections & Feedback</h2>
              <p>
                Reader feedback matters to us. Any error or objectionable
                content is reviewed promptly and corrected after verification.
              </p>
            </div>
          </div>

          <div className="about-note">
            <p>
              <strong>Disclaimer:</strong> Opinions expressed in articles are
              those of the respective authors and do not necessarily reflect
              the views of Social Activity BSP News.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
