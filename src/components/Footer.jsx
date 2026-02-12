import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white pt-16 pb-8 relative overflow-hidden">

      {/* 3D Glow Effects */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">

        {/* Brand Section */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <div className="mb-4">
            <img 
              src="/smartPrintGuideLogo.png" 
              alt="smartPrintGuide" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <p className="text-blue-100 text-sm mb-4">
            smartPrintGuide is your trusted destination for printers,
            ink, toner, and expert printing guides. We focus on quality
            recommendations, secure shopping, and reliable support.
          </p>

          <div className="flex space-x-4 mt-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-blue-700 transition duration-300 shadow-md"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <h3 className="font-semibold text-lg mb-4 border-b border-blue-400 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link to="/track-order" className="hover:text-white hover:translate-x-1 transition inline-block">Track Order</Link></li>
            <li><Link to="/returns" className="hover:text-white hover:translate-x-1 transition inline-block">Returns & Exchanges</Link></li>
            <li><Link to="/contact" className="hover:text-white hover:translate-x-1 transition inline-block">Contact Support</Link></li>
            <li><Link to="/faq" className="hover:text-white hover:translate-x-1 transition inline-block">FAQ</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <h3 className="font-semibold text-lg mb-4 border-b border-blue-400 pb-2">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition">Shipping Policy</Link></li>
            <li><Link to="/return-policy" className="hover:text-white transition">Return Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <h3 className="font-semibold text-lg mb-4 border-b border-blue-400 pb-2">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li>
              Email:
              <br />
              <a
                href="mailto:support@smartprintguide.com"
                className="hover:text-white transition"
              >
                support@smartprintguide.com
              </a>
            </li>
            <li>
              Your Business Address Here<br />
              City, State ZIP<br />
              Country
            </li>
            <li>Support: Monday–Friday</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-16 border-t border-blue-500 pt-6 text-center text-blue-200 text-sm relative z-10">
        © {new Date().getFullYear()} smartPrintGuide. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
