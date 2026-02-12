import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/actions/userActions';
import AuthModal from "./AuthModel";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  const location = useLocation();

  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((acc, item) => acc + item.qty, 0)
  );
  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  const dispatch = useDispatch();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const logoutHandler = () => {
    dispatch(logout());
    setProfileDropdown(false);
    setMobileOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Printers",
      dropdown: [
        { name: "Home Printer", path: "/home-printer" },
        { name: "Office Printer", path: "/office-printer" },
        { name: "Laser Printer", path: "/product-category/laser-printers" },
        { name: "Inkjet Printer", path: "/product-category/inkjet-printers" },
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
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-blue-200 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-24 md:h-28">

            {/* LOGO */}
            <Link to="/" aria-label="Home">
              <img
                src="/spglogo.png"
                alt="SmartPrintGuide Logo"
                className="h-16 w-auto sm:h-20 md:h-24 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                style={{ maxWidth: "200px" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10 font-medium text-base md:text-lg lg:text-xl relative">
              {navLinks.map((item, index) =>
                item.dropdown ? (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(index)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 text-blue-700 hover:text-blue-900 transition font-bold bg-transparent border-none outline-none cursor-pointer"
                    >
                      {item.name}
                      <ChevronDown size={16} />
                    </button>

                    {dropdownOpen === index && (
                      <div className="absolute left-0 top-full w-64 bg-white rounded-2xl shadow-2xl border border-blue-100 p-4 transition-all duration-200">
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
                        ? "text-blue-900 font-extrabold scale-105 underline underline-offset-4"
                        : "text-blue-700 hover:text-blue-900 hover:scale-105 font-bold"
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
                {userInfo && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>


              {userInfo ? (
                <div className="hidden md:flex items-center relative">
                  <button
                    onClick={() => setProfileDropdown((open) => !open)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-2.5 rounded-full font-bold shadow-xl hover:scale-105 hover:shadow-blue-300 transition-all duration-300 border-2 border-blue-400 hover:border-blue-700"
                    style={{ boxShadow: '0 4px 24px 0 rgba(37, 99, 235, 0.15)' }}
                  >
                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg uppercase shadow-md shadow-blue-200">
                      {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                    </span>
                    <span className="hidden md:block text-base font-semibold tracking-wide">
                      {userInfo.firstName || userInfo.name}
                    </span>
                  </button>
                  {profileDropdown && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-blue-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 transition-colors"
                        onClick={() => setProfileDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-blue-50 mt-1"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Login / Signup
                </button>
              )}

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
          <div className="absolute top-0 left-0 w-full bg-white rounded-b-3xl shadow-2xl p-6">

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

              {userInfo ? (
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 px-6 rounded-2xl font-bold shadow-xl border-2 border-blue-400 hover:border-blue-700 transition-all duration-300"
                    style={{ boxShadow: '0 4px 24px 0 rgba(37, 99, 235, 0.15)' }}
                  >
                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg uppercase shadow-md shadow-blue-200">
                      {userInfo.firstName?.charAt(0) || userInfo.name?.charAt(0)}
                    </span>
                    <span className="text-base font-semibold tracking-wide">
                      {userInfo.firstName || userInfo.name}
                    </span>
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 bg-white rounded-xl hover:bg-red-50 transition-colors border border-blue-100 shadow-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setAuthOpen(true);
                  }}
                  className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg"
                >
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Header;
