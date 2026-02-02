import "./Stylings/NewsBlock.css";


export default function NewsBlock({ title, image, newsId }) {
  return (
    <div className="side-news-block">
      <div className="side-news-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="image-placeholder">
            No Image
          </div>
        )}
      </div>

      <div className="side-news-title">
        {title}
      </div>
    </div>
  );
}
