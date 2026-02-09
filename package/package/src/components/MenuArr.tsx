export const MenuArr = [
  {
    menu: "Home",
    className: "sub-menu-down",
    ulClassName: "sub-menu",
    submenu: [
      { child: "Home 01", to: "/" },
      { child: "Home 02", to: "/home-2" },
      { child: "Home 03", to: "/home-3" },
    ],
  },
  {
    menu: "Pages",
    className: "has-mega-menu",
    ulClassName: "mega-menu",
    submenu: [
      {
        child: "Pages",
        subchild: [
          { children: "About Us", to: "/about-us" },
          { children: "FAQ", to: "/faq" },
          { children: "Team", to: "/team" },
          { children: "Team Detail", to: "/team-detail" },
          { children: "Testimonial", to: "/testimonial" },
        ],
      },
      {
        child: "Pages",
        subchild: [
          { children: "Services", to: "/services" },
          { children: "Service Detail", to: "/service-detail" },
          { children: "Error 404", to: "/error-404" },
          { children: "Coming Soon", to: "/coming-soon" },
          { children: "Under Maintenance", to: "/under-maintenance" },
        ],
      },
      {
        child: "Our Menus",
        subchild: [
          { children: "Menu Style 1", to: "/our-menu-1" },
          { children: "Menu Style 2", to: "/our-menu-2" },
          { children: "Menu Style 3", to: "/our-menu-3" },
          { children: "Menu Style 4", to: "/our-menu-4" },
          { children: "Menu Style 5", to: "/our-menu-5" },
        ],
      },
    ],
  },
  {
    menu: "Shop",
    className: "sub-menu-down",
    ulClassName: "sub-menu",
    submenu: [
      { child: "Shop Style 1", to: "/shop-style-1" },
      { child: "Shop Style 2", to: "/shop-style-2" },
      { child: "Shop Cart", to: "/shop-cart" },
      { child: "Shop Wishlist", to: "/shop-wishlist" },
      { child: "Shop Checkout", to: "/shop-checkout" },
      { child: "Product Detail", to: "/product-detail" },
    ],
  },
  {
    menu: "Blogs",
    className: "has-mega-menu",
    ulClassName: "mega-menu",
    submenu: [
      {
        child: "Blog Grid",
        subchild: [
          { children: "Blog Grid 2", to: "/blog-grid-2" },
          { children: "Blog Grid 3", to: "/blog-grid-3" },
          { children: "Blog Grid Left Sidebar", to: "/blog-grid-left-sidebar" },
          {
            children: "Blog Grid Right Sidebar",
            to: "/blog-grid-right-sidebar",
          },
        ],
      },
      {
        child: "Blog List",
        subchild: [
          { children: "Blog List", to: "/blog-list" },
          {
            children: "Blog List Left Sidebar ",
            to: "/blog-list-left-sidebar",
          },
          {
            children: "Blog List Right Sidebar",
            to: "/blog-list-right-sidebar",
          },
          { children: "Blog Both Sidebar", to: "/blog-both-sidebar" },
        ],
      },
      {
        child: "Blog Single",
        subchild: [
          { children: "Blog Detail", to: "/blog-standard" },
          { children: "Blog Open Gutenberg", to: "/blog-open-gutenberg" },
          {
            children: "Blog Details Left Sidebar",
            to: "/blog-detail-left-sidebar",
          },
          {
            children: "Blog Details Right Sidebar",
            to: "/blog-detail-right-sidebar",
          },
        ],
      },
      {
        child: "Blog Masonry",
        subchild: [
          { children: "Blog Grid 3 Masonry", to: "/blog-grid-3-masonary" },
          { children: "Blog Grid 4 Masonry", to: "/blog-grid-4-masonary" },
          { children: "Blog Wide List Sidebar", to: "/blog-wide-list-sidebar" },
          { children: "Blog Wide Grid Sidebar", to: "/blog-wide-grid-sidebar" },
        ],
      },
    ],
  },
  { menu: "Contact Us", to: "/contact-us" },
];
