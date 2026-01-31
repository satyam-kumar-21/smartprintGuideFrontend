import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* 1. Brand + description + social */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Smart ePrinting
          </h1>
          <p className="text-gray-600 text-sm mb-4">
            Smart ePrinting is your trusted online destination for printers,
            ink, toner, and office printing supplies. We focus on quality
            products, secure shopping, and reliable customer support.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-900 transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-gray-900 transition">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-900 transition">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-gray-900 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/track-order" className="hover:text-gray-900">
                Track Your Order
              </Link>
            </li>
            <li>
              <Link to="/return-exchange-policy" className="hover:text-gray-900">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link to="/customer-service" className="hover:text-gray-900">
                Contact Support
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-gray-900">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Company & Legal */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link to="/about" className="hover:text-gray-900">About Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-gray-900">Terms & Conditions</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-gray-900">Shipping Policy</Link></li>
            <li><Link to="/return-exchange-policy" className="hover:text-gray-900">Return & Exchange Policy</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-gray-900">Cookie Policy</Link></li>
            <li><Link to="/ccpa-privacy-policy" className="hover:text-gray-900">CCPA / CPRA</Link></li>
            <li><Link to="/accessibility-statement" className="hover:text-gray-900">Accessibility</Link></li>
            <li><Link to="/disclaimer" className="hover:text-gray-900">Disclaimer</Link></li>
          </ul>
        </div>

        {/* 4. Contact Details */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@smarteprinting.com"
                className="hover:text-gray-900"
              >
                support@smarteprinting.com
              </a>
            </li>
            {/* <li>Phone: Available via email support</li> */}
            <li>
              Address:
              17807 Lakecrest View Drive, #1205<br />
              Cypress, TX 77433<br />
              United States
            </li>
            <li>Support Hours: Monday–Friday</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Smart ePrinting. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
