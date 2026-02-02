//Mainlayout.jsx
import Header from "./Header";
import Footer from "./Footer"
import NewsMarquee from "../news/NewsMarquee";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <NewsMarquee />
      <main className="page-content">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
