import { useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./auth.css";

export default function AuthLayout() {
  const [mode, setMode] = useState("signin");

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* LEFT: AUTH FORM */}
        <div className="auth-form">
          {mode === "signin" ? (
            <>
              <SignInForm />

              <p className="switch-text">
                Don’t have an account?{" "}
                <span onClick={() => setMode("signup")}>
                  Create one
                </span>
              </p>

              {/* BACK TO HOME */}
              <p className="back-home">
                Or{" "}
                <Link to="/">
                  Back To Home
                </Link>
              </p>
            </>
          ) : (
            <>
              <SignUpForm />

              <p className="switch-text">
                Already have an account?{" "}
                <span onClick={() => setMode("signin")}>
                  Sign in
                </span>
              </p>

              {/* BACK TO HOME */}
              <p className="back-home">
                Or{" "}
                <Link to="/">
                  Back To Home
                </Link>
              </p>
            </>
          )}
        </div>

        {/* RIGHT: MINIMAL BRAND PANEL */}
        <div className="auth-panel brand-panel minimal-brand">
          <img
            src="/logo-square.png"
            alt="Social Activity BSP"
            className="brand-logo large"
          />

          <h2 className="brand-title">
            Social Activity BSP
          </h2>

          <p className="brand-slogan">
            Voice of Society, Power of Truth.
          </p>
        </div>
      </div>
    </div>
  );
}
