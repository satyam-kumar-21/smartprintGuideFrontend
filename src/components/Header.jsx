import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModel";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  const location = useLocation();

  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + item.qty, 0)
  );

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Printers",
      dropdown: [
        { name: "All In One", path: "/product-category/all-in-one-printers" },
        { name: "Inkjet", path: "/product-category/inkjet-printers" },
        { name: "Laser", path: "/product-category/laser-printers" },
      ],
    },
    { name: "Ink & Toner", path: "/product-category/ink-toner" },
    { name: "Blogs", path: "/blogs" },
    { name: "Support", path: "/customer-service" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-blue-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">

            {/* TEXT LOGO */}
            <Link to="/" className="group">
              <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent drop-shadow-md group-hover:scale-105 transition-transform duration-300">
                SmartPrintGuide
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10 font-medium relative">

              {navLinks.map((item, index) =>
                item.dropdown ? (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(index)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button
                      className="flex items-center gap-1 text-blue-700 hover:text-blue-900 transition font-semibold"
                    >
                      {item.name}
                      <ChevronDown size={16} />
                    </button>

                    {dropdownOpen === index && (
                      <div className="absolute left-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-blue-100 p-4 transform transition-all duration-300 hover:scale-[1.02]">

                        {item.dropdown.map((sub, i) => (
                          <Link
                            key={i}
                            to={sub.path}
                            className="block px-4 py-2 rounded-lg text-blue-700 hover:bg-blue-100 hover:translate-x-1 transition-all duration-200"
                          >
                            {sub.name}
                          </Link>
                        ))}

                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className={`transition duration-300 ${
                      isActive(item.path)
                        ? "text-blue-900 font-bold scale-105"
                        : "text-blue-700 hover:text-blue-900 hover:scale-105"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-6">

              <Link
                to="/cart"
                className="relative text-blue-700 hover:scale-110 transition-transform"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setAuthOpen(true)}
                className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Login / Signup
              </button>

              {/* Mobile Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-blue-800"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-50">

          <div className="absolute top-0 left-0 w-full bg-white rounded-b-3xl shadow-2xl p-6 animate-slideDown">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-blue-700">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {navLinks.map((item, index) =>
                item.dropdown ? (
                  <div key={index}>
                    <button
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === index ? null : index
                        )
                      }
                      className="w-full flex justify-between items-center text-blue-700 font-semibold py-2"
                    >
                      {item.name}
                      <ChevronDown size={18} />
                    </button>

                    {dropdownOpen === index && (
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {item.dropdown.map((sub, i) => (
                          <Link
                            key={i}
                            to={sub.path}
                            onClick={() => setMobileOpen(false)}
                            className="text-blue-600"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-blue-700 font-semibold"
                  >
                    {item.name}
                  </Link>
                )
              )}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  setAuthOpen(true);
                }}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg"
              >
                Login / Signup
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Header;
