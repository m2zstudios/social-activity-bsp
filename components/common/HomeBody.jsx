import BreakingMain from "../news/BreakingMain";
import "./Stylings/HomeBody.css";
import SideNewsContainer from "../news/SideNewsContainer/SideNewsContainer";
import HomeNewsCategory2 from "../news/HomeNewsCategory2";

const HomeBody = () => {
  return (
    
    <div className="home-body">
      {/* ================= BREAKING NEWS SECTION ================= */}
      <section className="breaking-section">

  <BreakingMain />
       <SideNewsContainer />

      </section>

      {/* ================= CATEGORY 1 ================= */}
      
      <HomeNewsCategory2 categoryName="Politics" />

      {/* ================= CATEGORY 2 ================= */}
      <HomeNewsCategory2 categoryName="Sports" />

      {/* ================= CATEGORY 3 ================= */}
      <HomeNewsCategory2 categoryName="Tech" />

      {/* ================= CATEGORY 4 ================= */}
      <HomeNewsCategory2 categoryName="Entertainment" />

    </div>
  );
};

export default HomeBody;
