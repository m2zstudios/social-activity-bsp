import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../admin/appwrite/auth";
import { getProfileByUserId } from "../../services/userService";
import { createComment, listCommentsForPost } from "../../services/commentService";
import "./Stylings/CommentsSection.css";

const CommentsSection = ({ postId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [accountUser, setAccountUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadComments = async () => {
      try {
        const data = await listCommentsForPost(postId);
        if (isMounted) {
          setComments(data);
        }
      } catch (err) {
        console.error("❌ Failed to load comments", err);
        if (isMounted) {
          setError("Unable to load comments.");
        }
      } finally {
        if (isMounted) {
          setLoadingComments(false);
        }
      }
    };

    const loadProfile = async () => {
      try {
        const current = await account.get();
        const userProfile = await getProfileByUserId(current.$id);
        if (isMounted) {
          setAccountUser(current);
          setProfile(userProfile);
        }
      } catch {
        if (isMounted) {
          setAccountUser(null);
          setProfile(null);
        }
      }
    };

    loadComments();
    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const accessState = useMemo(() => {
    if (!profile) return { canComment: false, reason: "" };
    if (profile.role === "admin") return { canComment: true, reason: "" };
    if (profile.status === "blocked") {
      return { canComment: false, reason: "blocked" };
    }
    if (profile.status === "readonly") {
      return { canComment: false, reason: "readonly" };
    }
    if (profile.status === "active") {
      return { canComment: true, reason: "" };
    }

    return { canComment: false, reason: "" };
  }, [profile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!accountUser) {
      setError("Please sign in to comment.");
      return;
    }

    if (!profile) {
      setError("Your profile could not be loaded.");
      return;
    }

    if (!accessState.canComment) {
      if (accessState.reason === "blocked") {
        navigate("/contact", { replace: true });
        return;
      }
      setError("Your account is not allowed to comment.");
      return;
    }

    if (!commentText.trim()) {
      setError("Please enter a comment.");
      return;
    }

    setSubmitting(true);

    try {
      const newComment = await createComment({
        comment: commentText.trim(),
        postId,
        userId: profile.userId,
        userName: profile.name || profile.username,
      });

      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error("❌ Failed to submit comment", err);
      setError("Unable to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="comments-section">
      <div className="comments-header">
        <h3>Comments</h3>
        {profile && (
          <span className="comments-status">
            Signed in as {profile.name || profile.username}
          </span>
        )}
      </div>

      {accountUser ? (
        <form className="comments-form" onSubmit={handleSubmit}>
          <textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Share your thoughts..."
            disabled={!accessState.canComment || submitting}
          />

          {accessState.reason === "blocked" && (
            <p className="comments-warning">
              Your account is blocked. Please contact support to regain access.
            </p>
          )}
          {accessState.reason === "readonly" && (
            <p className="comments-warning">
              Your account is in read-only mode and cannot comment.
            </p>
          )}

          {error && <p className="comments-error">{error}</p>}

          <button
            type="submit"
            disabled={!accessState.canComment || submitting}
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="comments-signin">
          <Link to="/auth">Sign in</Link> to join the conversation.
        </p>
      )}

      {loadingComments ? (
        <p className="comments-loading">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="comments-empty">Be the first to comment.</p>
      ) : (
        <ul className="comments-list">
          {comments.map((item) => (
            <li key={item.$id} className="comment-item">
              <div className="comment-meta">
                <strong>{item.userName || "Anonymous"}</strong>
                <span>
                  {new Date(item.$createdAt).toLocaleString()}
                </span>
              </div>
              <p>{item.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CommentsSection;
