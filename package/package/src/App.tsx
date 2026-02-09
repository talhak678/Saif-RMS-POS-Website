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
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Home2 from "./pages/Home2";
import Footer2 from "./components/Footer2";
import ScrollTop from "./constent/ScrollTop";
import Home3 from "./pages/Home3";
import Footer3 from "./components/Footer3";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import Footer4 from "./components/Footer4";
import Team from "./pages/Team";
import TeamDetail from "./pages/TeamDetail";
import Testimonial from "./pages/Testimonial";
import Services from "./pages/Services";
import { Context } from "./context/AppContext";
import ServiceDetail from "./pages/ServiceDetail";
import Error404 from "./pages/Error404";
import ComingSoon from "./pages/ComingSoon";
import UnderMaintenance from "./pages/UnderMaintenance";
import MenuStyle1 from "./pages/MenuStyle1";
import MenuStyle2 from "./pages/MenuStyle2";
import MenuStyle3 from "./pages/MenuStyle3";
import MenuStyle4 from "./pages/MenuStyle4";
import MenuStyle5 from "./pages/MenuStyle5";
import ShopStyle1 from "./pages/ShopStyle1";
import ShopStyle2 from "./pages/ShopStyle2";
import ShopCart from "./pages/ShopCart";
import ShopWishlist from "./pages/ShopWishlist";
import ShopCheckout from "./pages/ShopCheckout";
import ProductDetail from "./pages/ProductDetail";
import BlogGrid2 from "./pages/BlogGrid2";
import BlogGrid3 from "./pages/BlogGrid3";
import BlogGridLeftSideba from "./pages/BlogGridLeftSideba";
import BlogGridRightSidebar from "./pages/BlogGridRightSidebar";
import BlogList from "./pages/BlogList";
import BlogListLeftSidebar from "./pages/BlogListLeftSidebar";
import BlogListRightSidebar from "./pages/BlogListRightSidebar";
import BlogBothSidebar from "./pages/BlogBothSidebar";
import BlogDetail from "./pages/BlogDetail";
import Header4 from "./components/Header4";
import BlogGutenberg from "./pages/BlogGutenberg";
import BlogDetailLeftSidebar from "./pages/BlogDetailLeftSidebar";
import BlogDetailRightSidebar from "./pages/BlogDetailRightSidebar";
import BlogGrid3Masonary from "./pages/BlogGrid3Masonary";
import BlogGrid4Masonary from "./pages/BlogGrid4Masonary";
import BlogWideListSidebar from "./pages/BlogWideListSidebar";
import BlogWideGridSidebar from "./pages/BlogWideGridSidebar";
import ContactUs from "./pages/ContactUs";
import Header2 from "./components/Header2";
import Header3 from "./components/Header3";
import SignIn from "./elements/SignIn";

const Layout1 = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
const Layout2 = () => (
  <>
    <Header2 />
    <Outlet />
    <Footer2 />
  </>
);
const Layout3 = () => (
  <>
    <Header3 />
    <Outlet />
    <Footer3 />
  </>
);
const Layout4 = () => {
  const { setHeaderClass } = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeaderClass(true), []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer4 />
    </>
  );
};
const Layout5 = () => {
  const { setHeaderClass } = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeaderClass(true), []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
const Layout6 = () => {
  const { setHeaderClass } = useContext(Context);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setHeaderClass(false), []);
  return (
    <>
      <Header4 />
      <Outlet />
      <Footer4 />
    </>
  );
};

function App() {
  return (
    <>
      <div className="page-wraper">
        <Router>
          <SignIn />
          <ScrollTop />
          <Routes>
            <Route element={<Layout1 />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<Layout2 />}>
              <Route path="/home-2" element={<Home2 />} />
            </Route>
            <Route element={<Layout3 />}>
              <Route path="/home-3" element={<Home3 />} />
            </Route>
            <Route element={<Layout4 />}>
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team-detail" element={<TeamDetail />} />
              <Route path="/testimonial" element={<Testimonial />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-detail" element={<ServiceDetail />} />
              <Route path="/our-menu-1" element={<MenuStyle1 />} />
              <Route path="/our-menu-2" element={<MenuStyle2 />} />
              <Route path="/our-menu-3" element={<MenuStyle3 />} />
              <Route path="/our-menu-4" element={<MenuStyle4 />} />
              <Route path="/our-menu-5" element={<MenuStyle5 />} />
              <Route path="/shop-style-1" element={<ShopStyle1 />} />
              <Route path="/shop-style-2" element={<ShopStyle2 />} />
              <Route path="/shop-cart" element={<ShopCart />} />
              <Route path="/shop-wishlist" element={<ShopWishlist />} />
              <Route path="/shop-checkout" element={<ShopCheckout />} />
              <Route path="/product-detail" element={<ProductDetail />} />
              <Route path="/blog-grid-2" element={<BlogGrid2 />} />
              <Route path="/blog-grid-3" element={<BlogGrid3 />} />
              <Route
                path="/blog-grid-left-sidebar"
                element={<BlogGridLeftSideba />}
              />
              <Route
                path="/blog-grid-right-sidebar"
                element={<BlogGridRightSidebar />}
              />
              <Route path="/blog-list" element={<BlogList />} />
              <Route
                path="/blog-list-left-sidebar"
                element={<BlogListLeftSidebar />}
              />
              <Route
                path="/blog-list-right-sidebar"
                element={<BlogListRightSidebar />}
              />
              <Route path="/blog-both-sidebar" element={<BlogBothSidebar />} />
              <Route
                path="/blog-grid-3-masonary"
                element={<BlogGrid3Masonary />}
              />
              <Route
                path="/blog-grid-4-masonary"
                element={<BlogGrid4Masonary />}
              />
              <Route
                path="/blog-wide-list-sidebar"
                element={<BlogWideListSidebar />}
              />
              <Route
                path="/blog-wide-grid-sidebar"
                element={<BlogWideGridSidebar />}
              />
              <Route path="/contact-us" element={<ContactUs />} />
            </Route>

            <Route element={<Layout5 />}>
              <Route path="/error-404" element={<Error404 />} />
            </Route>
            <Route element={<Layout6 />}>
              <Route path="/blog-standard" element={<BlogDetail />} />
              <Route path="/blog-open-gutenberg" element={<BlogGutenberg />} />
              <Route
                path="/blog-detail-left-sidebar"
                element={<BlogDetailLeftSidebar />}
              />
              <Route
                path="/blog-detail-right-sidebar"
                element={<BlogDetailRightSidebar />}
              />
            </Route>
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/under-maintenance" element={<UnderMaintenance />} />
          </Routes>
          {/* <Switcher />// */}
        </Router>
      </div>
    </>
  );
}

export default App;
