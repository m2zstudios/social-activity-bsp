import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../admin/components/Stylings/LeftPreview.css";

import waIcon from "/images/social-icons/waicon.png";
import igIcon from "/images/social-icons/igicon.png";
import fbIcon from "/images/social-icons/fbicon.png";
import xIcon from "/images/social-icons/xicon.png";

/**
 * NewsPreviewPage
 * - Static preview only
 * - Loads blocks + styles from DB
 * - NO editor logic
 */
const NewsPreviewPage = ({ news }) => {
  const { newsId } = useParams();
  const location = useLocation();
  const [blocks, setBlocks] = useState([]);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);

  const previewState = useMemo(() => {
    if (news) {
      return {
        blocks: news.blocks || [],
        theme: news.theme || "light",
      };
    }

    if (location.state) {
      return {
        blocks: location.state.blocks || [],
        theme: location.state.theme || "light",
      };
    }

    return null;
  }, [location.state, news]);

  /* -------------------------------
     🔹 Fetch news from DB
  -------------------------------- */
  useEffect(() => {
    if (previewState) {
      setBlocks(previewState.blocks || []);
      setTheme(previewState.theme || "light");
      setLoading(false);
      return;
    }

    if (!newsId) {
      setLoading(false);
      return;
    }

    const loadNews = async () => {
      try {
        const res = await fetch(`/api/news/${newsId}`);
        const data = await res.json();
        setBlocks(data.blocks || []);
        setTheme(data.theme || "light");
      } catch (err) {
        console.error("❌ Failed to load news", err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [newsId, previewState]);

  /* -------------------------------
     🔹 Helpers
  -------------------------------- */
  const getTextColor = (block, theme) => {
    if (block.styles?.isCustomColor) return block.styles.color;
    return theme === "light" ? "#020617" : "#e5e7eb";
  };

  const withLink = (block, content) => {
    if (!block.link?.url) return content;

    return (
      <a
        href={block.link.url}
        target={block.link.target || "_self"}
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {content}
      </a>
    );
  };

  const renderRichText = (richText = []) =>
    richText.map((node, i) => {
      let content = node.text;

      if (node.marks?.includes("bold")) content = <strong>{content}</strong>;
      if (node.marks?.includes("italic")) content = <em>{content}</em>;
      if (node.marks?.includes("underline")) content = <u>{content}</u>;
      if (node.marks?.includes("strike")) content = <s>{content}</s>;
      if (node.marks?.includes("highlight")) {
        content = <span style={{ background: "#fde047" }}>{content}</span>;
      }
      if (node.marks?.includes("link")) {
        content = (
          <a href={node.attrs?.href} target="_blank" rel="noreferrer">
            {content}
          </a>
        );
      }

      return <span key={node.id || `rt-${i}`}>{content}</span>;
    });

  /* -------------------------------
     🔹 Social Icons
  -------------------------------- */
  const SOCIAL_ICON_URLS = {
    whatsapp: waIcon,
    instagram: igIcon,
    facebook: fbIcon,
    twitter: xIcon,
  };

  const AuthorSocialIcons = ({ socials, position, showText = true }) => {
    if (!socials) return null;

    return (
      <div className={`author-socials ${position}`}>
        {showText && <span className="follow-text">Follow Me On</span>}

        {Object.entries(socials).map(([key, url]) =>
          url ? (
            <a key={key} href={url} target="_blank" rel="noreferrer">
              <img
                src={SOCIAL_ICON_URLS[key]}
                className={`social-icon ${key}`}
                alt={`${key} social icon`}
              />
            </a>
          ) : null
        )}
      </div>
    );
  };

  /* -------------------------------
     🔹 STATIC renderBlock
  -------------------------------- */
  const renderBlock = (block) => {
    if (!block || typeof block !== "object") return null;

    switch (block.type) {
      case "paragraph":
        return withLink(
          block,
          <p
            className={`lp-paragraph ${block.variant}`}
            style={{
              fontSize: block.styles?.fontSize,
              color: getTextColor(block, theme),
              fontWeight: block.styles?.fontWeight,
              lineHeight: block.styles?.lineHeight,
              textAlign: block.styles?.textAlign,
              letterSpacing: block.styles?.letterSpacing,
              background: block.styles?.background,
              padding: block.styles?.padding,
              margin: block.styles?.margin,
              borderLeft: block.styles?.borderLeft,
              whiteSpace: "pre-wrap",
            }}
          >
            {renderRichText(block.richText || [{ text: block.text || "" }])}
          </p>
        );

      case "subheading":
        return withLink(
          block,
          <div style={{ margin: block.styles?.margin }}>
            <h3
              className="lp-subheading"
              style={{
                fontSize: block.styles?.fontSize,
                fontWeight: block.styles?.fontWeight,
                color: getTextColor(block, theme),
                textAlign: block.styles?.textAlign,
                textTransform: block.styles?.textTransform,
              }}
            >
              {block.text}
            </h3>

            {block.styles?.divider && (
              <div
                style={{
                  height: 2,
                  width: "40px",
                  background: "#3b82f6",
                  margin:
                    block.styles.textAlign === "center"
                      ? "8px auto 0"
                      : "8px 0 0",
                }}
              />
            )}
          </div>
        );

      case "image":
        return withLink(
          block,
          <div className="lp-image">
            <div
              className="lp-image-inner"
              style={{
                justifyContent:
                  block.align === "left"
                    ? "flex-start"
                    : block.align === "right"
                    ? "flex-end"
                    : "center",
              }}
            >
              <img
                src={block.src}
                alt={block.alt || ""}
                className={`lp-image-${block.size}`}
                style={{
                  borderRadius: block.radius,
                  boxShadow:
                    block.shadow === "soft"
                      ? "0 10px 25px rgba(0,0,0,.15)"
                      : block.shadow === "strong"
                      ? "0 20px 40px rgba(0,0,0,.35)"
                      : "none",
                  background: block.background,
                  cursor: block.lightbox ? "zoom-in" : "default",
                }}
              />
            </div>
            {block.caption && (
              <div className="lp-image-caption">{block.caption}</div>
            )}
            {block.credit && (
              <div className="lp-image-credit">Source: {block.credit}</div>
            )}
          </div>
        );

      case "gallery":
        if ((block.images || []).length === 0) {
          return null;
        }

        return (
          <div
            className="lp-gallery"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${block.columns || 3}, 1fr)`,
              gap: 12,
            }}
          >
            {(block.images || []).map((img, i) => {
              const imageEl = (
                <img
                  src={img.src}
                  alt={img.alt || ""}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    cursor: img.link?.url ? "pointer" : "default",
                  }}
                />
              );

              return (
                <figure
                  key={img.id || img.url || `img-${i}`}
                  style={{ textAlign: "center" }}
                >
                  {img.link?.url ? (
                    <a
                      href={img.link.url}
                      target={img.link.target || "_self"}
                      rel="noopener noreferrer"
                    >
                      {imageEl}
                    </a>
                  ) : (
                    imageEl
                  )}

                  {img.caption && (
                    <figcaption className="lp-gallery-caption">
                      {img.caption}
                    </figcaption>
                  )}

                  {img.credit && (
                    <div className="lp-image-credit">
                      Source: {img.credit}
                    </div>
                  )}
                </figure>
              );
            })}
          </div>
        );

      case "author":
        if (!block.author) {
          return null;
        }

        const bg =
          block.backgroundImage &&
          (block.style === "cover" || block.applyBgToAll)
            ? `url(${block.backgroundImage})`
            : undefined;

        if ((block.style || "default") === "default") {
          return (
            <div className="lp-author default">
              <img
                src={block.author.image}
                style={{
                  backgroundImage: bg,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div>
                <h4>{block.author.name}</h4>
                <p className="role">{block.author.role}</p>
                <p>{block.author.about}</p>
              </div>
            </div>
          );
        }

        if (block.style === "centered-social") {
          const socials = block.socials || {};

          return (
            <div
              className="lp-author cover centered centered-social"
              style={{
                backgroundImage: block.backgroundImage
                  ? `url(${block.backgroundImage})`
                  : undefined,
              }}
            >
              <div className="centered-social-layout">
                <AuthorSocialIcons
                  socials={{
                    whatsapp: socials.whatsapp,
                    instagram: socials.instagram,
                  }}
                  position="row"
                  showText={false}
                />

                <div className="author-overlay-box">
                  <div className="author-center">
                    <img src={block.author.image} />
                    <h4>{block.author.name}</h4>
                    <p className="role">{block.author.role}</p>
                    <p>{block.author.about}</p>
                  </div>
                </div>

                <AuthorSocialIcons
                  socials={{
                    facebook: socials.facebook,
                    twitter: socials.twitter,
                  }}
                  position="row"
                  showText={false}
                />
              </div>
            </div>
          );
        }

        if (block.style === "default-social") {
          return (
            <div className="lp-author default" style={{ backgroundImage: bg }}>
              <img src={block.author.image} />
              <div>
                <h4>{block.author.name}</h4>
                <p className="role">{block.author.role}</p>
                <p>{block.author.about}</p>
                <AuthorSocialIcons
                  socials={block.socials}
                  position="bottom-right"
                  showText={true}
                />
              </div>
            </div>
          );
        }

        if (block.style === "cover") {
          return (
            <div
              className="lp-author cover"
              style={{
                backgroundImage: `url(${block.backgroundImage})`,
              }}
            >
              <div className="overlay">
                <img src={block.author.image} />
                <h4>{block.author.name}</h4>
                <p className="role">{block.author.role}</p>
                <p>{block.author.about}</p>
              </div>
            </div>
          );
        }

        return null;

      case "quote":
        return (
          <blockquote
            className="lp-quote"
            style={{
              color: getTextColor(block, theme),
              borderLeftColor: "#3b82f6",
            }}
          >
            “{block.text}”
          </blockquote>
        );

      case "list":
        return (
          <ul
            className="lp-list"
            style={{
              color: getTextColor(block, theme),
            }}
          >
            {(block.items || [])
              .filter((item) => item.trim() !== "")
              .map((item, i) => (
                <li key={`${block.id}-item-${i}`}>{item}</li>
              ))}
          </ul>
        );

      case "ad":
        return <div className="lp-ad">Advertisement – {block.variant}</div>;

      default:
        return null;
    }
  };

  /* -------------------------------
     🔹 Render
  -------------------------------- */
  if (loading) return <div className="left-preview">Loading…</div>;
  if (blocks.length === 0) {
    return <div className="left-preview">No preview content available.</div>;
  }

  return (
    <div className="left-preview">
      {blocks.map((block, index) => (
        <div key={block.id || `preview-${index}`} className="preview-block">
          <div className="preview-content">{renderBlock(block)}</div>
        </div>
      ))}
    </div>
  );
};

export default NewsPreviewPage;
