import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/common/MainLayout";
import { getCurrentUserProfile } from "../services/userService";
import "./Stylings/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const { profile: userProfile } = await getCurrentUserProfile();
        if (isMounted) {
          setProfile(userProfile);
        }
      } catch (err) {
        console.error("❌ Failed to load profile", err);
        if (isMounted) {
          setError("Please sign in to view your profile.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (profile?.role !== "admin" && profile?.status === "blocked") {
      navigate("/contact", { replace: true });
    }
  }, [navigate, profile]);

  return (
    <MainLayout>
      <div className="profile-page">
        <h1>Your Profile</h1>

        {loading && <p>Loading profile...</p>}

        {!loading && error && (
          <p className="profile-error">
            {error} <Link to="/auth">Go to sign in</Link>.
          </p>
        )}

        {!loading && profile && (
          <div className="profile-card">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.name || profile.username}
                className="profile-avatar"
              />
            )}

            <div className="profile-info">
              <p>
                <strong>Name:</strong> {profile.name || "—"}
              </p>
              <p>
                <strong>Username:</strong> {profile.username}
              </p>
              <p>
                <strong>Account Role:</strong>{" "}
                {profile.role === "admin" ? "Admin" : "User"}
              </p>
              <p>
                <strong>Status:</strong> {profile.status}
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
