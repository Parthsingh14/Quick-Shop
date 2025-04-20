import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Create from "./components/Create";
import Details from "./components/Details";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import EditProduct from "./components/EditProduct";
import DeleteProduct from "./components/DeleteProduct";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function Breadcrumbs() {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    const crumbItems = paths.map((path, i) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: `/${paths.slice(0, i + 1).join("/")}`,
    }));
    setCrumbs(crumbItems);
  }, [location]);

  return crumbs.length > 0 ? (
    <div className="flex items-center text-sm mb-4 px-4 sm:px-6">
      <Link
        to="/"
        className="text-[#B9937B] hover:text-[#714329] transition-colors"
      >
        Home
      </Link>
      {crumbs.map((crumb, i) => (
        <div key={i} className="flex items-center">
          <FiChevronRight className="mx-2 text-[#B5A192]" />
          <Link
            to={crumb.path}
            className={`${
              i === crumbs.length - 1
                ? "text-[#714329] font-medium"
                : "text-[#B9937B] hover:text-[#714329]"
            } transition-colors`}
          >
            {crumb.name}
          </Link>
        </div>
      ))}
    </div>
  ) : null;
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#714329] to-[#B08463] text-white py-8 px-4 sm:px-6 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-medium mb-4">Quick Shop</h3>
          <p className="text-[#D0B9A7]">
            Your one-stop destination for quality products with elegant
            aesthetics.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-[#D0B9A7]">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/create" className="hover:text-white transition-colors">
                Add Product
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Connect</h4>
          <div className="flex space-x-4">
            {["twitter", "facebook", "instagram"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-[#B9937B] hover:bg-[#714329] flex items-center justify-center transition-colors"
                aria-label={social}
              >
                <span className="sr-only">{social}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#B9937B] mt-8 pt-6 text-center text-[#D0B9A7] text-sm">
        © {new Date().getFullYear()} Quick Shop. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F9F5F0] to-[#F0E6DD] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-[#714329] text-white p-4 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-[#5A3722] transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Link to="/" className="text-xl font-medium">
          Quick Shop
        </Link>
        <div className="w-6"></div> {/* Spacer */}
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 fixed md:static inset-y-0 left-0 z-20 w-64 bg-[#714329] text-white 
        transition-transform duration-300 ease-in-out shadow-xl md:shadow-none`}
      >
        <Navbar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto min-h-screen flex flex-col">
        <div className="flex-1 p-4 sm:p-6 max-w-[1800px] mx-auto w-full">
          <Breadcrumbs />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/delete/:id" element={<DeleteProduct />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
