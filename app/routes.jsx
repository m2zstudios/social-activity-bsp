import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewsDetails from "../pages/NewsDetails";
import Category from "../pages/Category";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import NotFound from "../pages/NotFound";


// admin
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/Dashboard";
import CreatePost from "../admin/CreatePost";
import ManagePosts from "../admin/ManagePosts";
import AuthLayout from "../admin/Auth/AuthLayout";
import NewsPreviewPage from "../admin/NewsPreviewPage";

function RoutesConfig() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/news/:identifier" element={<NewsDetails />} />
      <Route path="/category/:name" element={<Category />} />
      {/* Auth */}
      <Route path="/auth" element={<AuthLayout />} />
      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="manage" element={<ManagePosts />} />
</Route>

{/* Create Post – standalone page */}
<Route path="/admin/create" element={<CreatePost />} />
<Route path="/admin/preview" element={<NewsPreviewPage />} />



{/* 🚨 404 – ALWAYS LAST */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
