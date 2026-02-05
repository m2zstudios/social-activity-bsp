import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { account } from "../../admin/appwrite/auth";
import { createUserProfile, isUsernameAvailable } from "../../services/userService";
import "./Stylings/SignUpForm.css";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const available = await isUsernameAvailable(username.trim());
      if (!available) {
        setError("That username is already taken.");
        return;
      }

      const createdAccount = await account.create(
        ID.unique(),
        email.trim(),
        password,
        name.trim()
      );

      await account.createEmailPasswordSession(email.trim(), password);

      await createUserProfile({
        userId: createdAccount.$id,
        name: name.trim(),
        username: username.trim(),
        avatar: avatar.trim(),
      });

      navigate("/profile");
    } catch (err) {
      console.error("❌ Sign up failed", err);
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignUp}>
      <h2>Create Account</h2>

      <div className="signup-email-field">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="signup-email-field">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="signup-email-field">
        <input
          type="url"
          placeholder="Avatar URL (optional)"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>

      <div className="signup-email-field">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="signup-password-field">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="button"
          className="signup-toggle-password"
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <p className="signup-error-text">{error}</p>}

      <button className="signup-primary-btn" disabled={loading}>
        {loading ? "Creating..." : "SIGN UP"}
      </button>
    </form>
  );
}
