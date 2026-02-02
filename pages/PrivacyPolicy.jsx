import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "./Stylings/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <Header />

      <div className="policy-page">
        <h1>Privacy Policy</h1>
        <p className="last-updated">
          Last updated: 9/1/2026
        </p>

        <p>
          At <strong>Social Activity BSP News</strong>, we respect the privacy of
          our users and are committed to protecting any personal information
          shared with us through our website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect basic information such as name, email address, or other
          details when users contact us voluntarily via email or contact forms.
          We do not collect sensitive personal data without user consent.
        </p>

        <h2>How We Use Information</h2>
        <p>
          The information collected is used only to respond to user queries,
          improve website content, and enhance user experience. We do not sell,
          trade, or rent users’ personal information to third parties.
        </p>

        <h2>Cookies</h2>
        <p>
          Social Activity BSP News may use cookies to improve browsing
          experience. Cookies help us understand user behavior and improve our
          website performance. Users can disable cookies through their browser
          settings if they prefer.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use third-party services such as Google Analytics or advertising
          partners that may collect information through cookies or similar
          technologies. These third-party services have their own privacy
          policies, and we do not control their data practices.
        </p>

        <h2>External Links</h2>
        <p>
          Our website may contain links to external websites. We are not
          responsible for the privacy practices or content of those external
          sites.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable steps to protect user information from unauthorized
          access, alteration, or disclosure. However, no method of data
          transmission over the internet is 100% secure.
        </p>

        <h2>User Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy, you may
          contact us at:
          <br />
          <strong>Email:</strong> socialactivitybsp@gmail.com
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
