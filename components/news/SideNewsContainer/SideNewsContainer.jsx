// SideNewsContainer.jsx
import NewsBlock from "./NewsBlock";
import RectAdBlock from "./RectAdBlock";
import { sideNewsData } from "./TempData";
import "./Stylings/SideNewsContainer.css";

export default function SideNewsContainer() {

  // sirf news nikali
  const newsItems = sideNewsData
    .filter(item => item.type === "news")
    .sort((a, b) => a.stackId - b.stackId); // ⭐ CORE LOGIC
 
  const adItem = sideNewsData.find(item => item.type === "ad");

  return (
    <div className="side-news-container">
      <div className="side-news-header">BREAKING NEWS</div>

      {newsItems.map(news => (
        <NewsBlock
          key={news.newsId}
          title={news.title}
          image={news.image}
          newsId={news.newsId}
        />
      ))}

      {adItem && <RectAdBlock
          image={adItem.image}
          link={adItem.link} // ✅ HERE
        />}
    </div>
  );
}
