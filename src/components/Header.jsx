import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, ChevronDown, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/actions/userActions';
import AuthModal from "./AuthModel";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const debounceRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  // Fetch suggestions as user types
  useEffect(() => {
    if (!searchOpen) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (searchTerm.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products?search=${encodeURIComponent(searchTerm.trim())}&limit=5`);
        const data = await res.json();
        setSuggestions(Array.isArray(data.products) ? data.products : []);
      } catch {
        setSuggestions([]);
      }
      setLoadingSuggestions(false);
    }, 300);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [searchTerm, searchOpen]);

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
              {/* Search Icon */}
              <button
                className="text-blue-700 hover:scale-110 transition-transform relative"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
              >
                <Search size={24} />
              </button>
      {/* Search Modal/Dropdown */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30">
          <form
            onSubmit={handleSearchSubmit}
            className="mt-32 bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4 w-full max-w-md border border-blue-200 relative"
          >
            <div className="flex items-center gap-2">
              <Search size={22} className="text-blue-700" />
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search products by title, description, brand..."
                className="flex-1 px-4 py-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                type="button"
                className="ml-2 text-gray-400 hover:text-blue-700"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={22} />
              </button>
            </div>
            {/* Suggestions Dropdown */}
            {searchTerm.trim().length > 1 && (
              <div className="absolute left-0 right-0 top-20 bg-white border border-blue-100 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
                {loadingSuggestions ? (
                  <div className="p-4 text-blue-600 text-center">Searching...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((product) => (
                    <div
                      key={product._id || product.slug}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${product.slug || product._id}`);
                        setSearchOpen(false);
                        setSearchTerm("");
                        setSuggestions([]);
                      }}
                    >
                      <img src={product.image || (product.images && product.images[0]) || "/printer.png"} alt={product.title} className="w-10 h-10 object-contain rounded" />
                      <div className="flex-1">
                        <div className="font-semibold text-blue-900 text-sm line-clamp-1">{product.title}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{product.brand}</div>
                      </div>
                      <span className="text-blue-700 font-bold">${product.price}</span>
                    </div>
                  ))
                ) : searchTerm.trim().length > 1 ? (
                  <div className="p-4 text-gray-400 text-center">No products found</div>
                ) : null}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition mt-2"
            >
              Search
            </button>
          </form>
        </div>
      )}

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
