import { Link } from "react-router-dom";
import "./Stylings/NewsBlock.css";

export default function NewsBlock({ title, image, slug, isLoading }) {
  const content = (
    <>
      <div className="side-news-image">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
          />
        ) : (
          <div className="image-placeholder">No Image</div>
        )}
      </div>

      <div className="side-news-title">{title}</div>
    </>
  );

  if (isLoading) {
    return <div className="side-news-block is-loading">{content}</div>;
  }

  return (
    <Link className="side-news-block" to={`/news/${slug}`}>
      {content}
    </Link>
  );
}
