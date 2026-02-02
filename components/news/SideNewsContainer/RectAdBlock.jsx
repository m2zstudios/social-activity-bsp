// RectAdBlock.jsx
import "./Stylings/RectAdBlock.css";

export default function RectAdBlock({ image, link }) {
  return (
    <a
      href={link}
      className="rect-ad-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="rect-ad-block">
        <div className="ad-label">Advertisement</div>

        {image ? (
          <img src={image} alt="Advertisement" />
        ) : (
          <div className="ad-placeholder">Advertisement</div>
        )}
      </div>
    </a>
  );
}
