import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "./Stylings/Contact.css";

const Contact = () => {
  return (
    <div className="page-container">
      <Header />

      <section className="contact-page">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have a news tip, correction request, advertisement query or general
            feedback? We’d love to hear from you.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Get in Touch</h2>

            <div className="info-item">
              <span>📧</span>
              <div>
                <h4>Email</h4>
                <p>socialactivitybsp@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <span>📞</span>
              <div>
                <h4>Phone</h4>
                <p>+91-6266160350</p>
              </div>
            </div>

            <div className="info-item">
              <span>🏢</span>
              <div>
                <h4>Office Address</h4>
                <p>
                  Social Activity BSP News <br />
                  Chhattisgarh, India
                </p>
              </div>
            </div>

            <div className="info-note">
              <p>
                We follow responsible journalism. All concerns, corrections and
                complaints are reviewed seriously and resolved after proper
                verification.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>

            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Write your message here..." rows="5" required />

              <button type="submit">Send Message</button>
            </form>

            {/* Optional disclaimer */}
            <p className="form-note">
              <strong>Note:</strong> Do not send abusive or false information.
              Such messages will be ignored.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
