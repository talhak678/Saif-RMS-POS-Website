import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css";
import "react-modal-video/css/modal-video.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./assets/css/common.css";
import "rsuite/dist/rsuite.min.css";
import "./assets/other/switcher/switcher.css";
import "./assets/css/style.css";

import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Header2 from "./components/Header2";
import Footer2 from "./components/Footer2";
import Home2 from "./pages/Home2";
import ScrollTop from "./constent/ScrollTop";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
// import Team from "./pages/Team";
// import TeamDetail from "./pages/TeamDetail";
// import Testimonial from "./pages/Testimonial";
// import Services from "./pages/Services";
import { Context } from "./context/AppContext";
// import ServiceDetail from "./pages/ServiceDetail";
import Error404 from "./pages/Error404";
import ComingSoon from "./pages/ComingSoon";
import UnderMaintenance from "./pages/UnderMaintenance";
import MenuStyle1 from "./pages/MenuStyle1";
import MenuStyle2 from "./pages/MenuStyle2";
import MenuStyle3 from "./pages/MenuStyle3";
import MenuStyle4 from "./pages/MenuStyle4";
import MenuStyle5 from "./pages/MenuStyle5";
// import ShopStyle1 from "./pages/ShopStyle1";
// import ShopStyle2 from "./pages/ShopStyle2";
import ShopCart from "./pages/ShopCart";
// import ShopWishlist from "./pages/ShopWishlist";
// import ShopCheckout from "./pages/ShopCheckout";
// import ProductDetail from "./pages/ProductDetail";
// import BlogGrid2 from "./pages/BlogGrid2";
// import BlogGrid3 from "./pages/BlogGrid3";
// import BlogGridLeftSideba from "./pages/BlogGridLeftSideba";
// import BlogGridRightSidebar from "./pages/BlogGridRightSidebar";
import BlogList from "./pages/BlogList";
// import BlogListLeftSidebar from "./pages/BlogListLeftSidebar";
// import BlogListRightSidebar from "./pages/BlogListRightSidebar";
// import BlogBothSidebar from "./pages/BlogBothSidebar";
import BlogDetail from "./pages/BlogDetail";
import BlogGutenberg from "./pages/BlogGutenberg";
import BlogDetailLeftSidebar from "./pages/BlogDetailLeftSidebar";
import BlogDetailRightSidebar from "./pages/BlogDetailRightSidebar";
// import BlogGrid3Masonary from "./pages/BlogGrid3Masonary";
// import BlogGrid4Masonary from "./pages/BlogGrid4Masonary";
// import BlogWideListSidebar from "./pages/BlogWideListSidebar";
// import BlogWideGridSidebar from "./pages/BlogWideGridSidebar";
import ContactUs from "./pages/ContactUs";
import SignIn from "./elements/SignIn";
import OrderTypeModal from "./elements/OrderTypeModal";

const Layout2 = () => {
  const { setHeaderClass } = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeaderClass(false), []);
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer2 />
    </>
  );
};
const Layout4 = () => {
  const { setHeaderClass } = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeaderClass(true), []);
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer2 />
    </>
  );
};
const Layout5 = () => {
  const { setHeaderClass } = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeaderClass(true), []);
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer2 />
    </>
  );
};
const Layout6 = () => {
  const { setHeaderClass } = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeaderClass(false), []);
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer2 />
    </>
  );
};


const CmsProtectedRoute = ({ pageKey, children }: { pageKey: string, children: React.ReactNode }) => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  if (cmsLoading) return null; // Or a loader

  const isEnabled = cmsConfig?.config?.configJson?.[pageKey]?.enabled !== false;

  if (!isEnabled) {
    return <Error404 />; // Or Navigate to "/"
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <div className="page-wraper">
        <Router>
          <OrderTypeModal />
          <SignIn />
          <ScrollTop />
          <Routes>
            <Route element={<Layout2 />}>
              <Route path="/" element={<Home2 />} />
            </Route>

            <Route element={<Layout4 />}>
              <Route path="/about-us" element={
                <CmsProtectedRoute pageKey="about">
                  <AboutUs />
                </CmsProtectedRoute>
              } />
              <Route path="/faq" element={
                <CmsProtectedRoute pageKey="faq">
                  <Faq />
                </CmsProtectedRoute>
              } />
              <Route path="/our-menu-1" element={
                <CmsProtectedRoute pageKey="menu">
                  <MenuStyle1 />
                </CmsProtectedRoute>
              } />
              <Route path="/our-menu-2" element={<MenuStyle2 />} />
              <Route path="/our-menu-3" element={<MenuStyle3 />} />
              <Route path="/our-menu-4" element={<MenuStyle4 />} />
              <Route path="/our-menu-5" element={<MenuStyle5 />} />

              <Route path="/shop-cart" element={<ShopCart />} />

              <Route path="/blog-list" element={
                <CmsProtectedRoute pageKey="blogs">
                  <BlogList />
                </CmsProtectedRoute>
              } />

              <Route path="/contact-us" element={
                <CmsProtectedRoute pageKey="contact">
                  <ContactUs />
                </CmsProtectedRoute>
              } />
            </Route>

            <Route element={<Layout5 />}>
              <Route path="/error-404" element={<Error404 />} />
            </Route>
            <Route element={<Layout6 />}>
              <Route path="/blog-standard" element={
                <CmsProtectedRoute pageKey="blogs">
                  <BlogDetail />
                </CmsProtectedRoute>
              } />
              <Route path="/blog-open-gutenberg" element={
                <CmsProtectedRoute pageKey="blogs">
                  <BlogGutenberg />
                </CmsProtectedRoute>
              } />
              <Route
                path="/blog-detail-left-sidebar"
                element={
                  <CmsProtectedRoute pageKey="blogs">
                    <BlogDetailLeftSidebar />
                  </CmsProtectedRoute>
                }
              />
              <Route
                path="/blog-detail-right-sidebar"
                element={
                  <CmsProtectedRoute pageKey="blogs">
                    <BlogDetailRightSidebar />
                  </CmsProtectedRoute>
                }
              />
            </Route>
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/under-maintenance" element={<UnderMaintenance />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
