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
        {/* <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <div className="mb-4 flex items-center gap-2">
            <img
              src="/spglogo.png"
              alt="smartPrintGuide Logo"
              className="h-16 w-auto sm:h-20 md:h-24 object-contain drop-shadow-md"
              style={{ maxWidth: '180px' }}
            />
            
          </div>
          <p className="text-blue-100 text-sm mb-4">
            smartPrintGuide is your trusted destination for printers,
            ink, toner, and expert printing guides. We focus on quality
            recommendations, secure shopping, and reliable support.
          </p>

          <div className="flex space-x-4 mt-4">
            <a href={import.meta.env.VITE_FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-blue-700 transition duration-300 shadow-md"><FaFacebookF /></a>
            <a href={import.meta.env.VITE_TWITTER_URL} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-blue-700 transition duration-300 shadow-md"><FaTwitter /></a>
            <a href={import.meta.env.VITE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-blue-700 transition duration-300 shadow-md"><FaInstagram /></a>
            <a href={import.meta.env.VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="bg-white/20 p-2 rounded-full hover:bg-white hover:text-blue-700 transition duration-300 shadow-md"><FaLinkedinIn /></a>
          </div>
        </div> */}

        {/* Quick Links */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <h3 className="font-semibold text-lg mb-4 border-b border-blue-400 pb-2">
            Account
          </h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link to="/profile" className="hover:text-white hover:translate-x-1 transition inline-block">My Account</Link></li>
            <li><Link to="/profile" className="hover:text-white hover:translate-x-1 transition inline-block">Order History</Link></li>
            <li><Link to="/track-order" className="hover:text-white hover:translate-x-1 transition inline-block">Track Order</Link></li>
            <li><Link to="/cart" className="hover:text-white hover:translate-x-1 transition inline-block">Shopping Cart</Link></li>
          </ul>
        </div>


        {/* Quick Links */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <h3 className="font-semibold text-lg mb-4 border-b border-blue-400 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link></li>

            <li><Link to="/return-exchange-policy" className="hover:text-white hover:translate-x-1 transition inline-block">Returns & Exchanges</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-white hover:translate-x-1 transition inline-block">Cookies Policy</Link></li>

            <li><Link to="/accessibility-statement" className="hover:text-white hover:translate-x-1 transition inline-block">Accessibility</Link></li>
            <li><Link to="/disclaimer" className="hover:text-white hover:translate-x-1 transition inline-block">Disclaimer</Link></li>
            <li><Link to="/consumer-rights" className="hover:text-white hover:translate-x-1 transition inline-block">Consumer Rights</Link></li>
            <li><Link to="/do-not-sell-or-share-my-personal-information" className="hover:text-white hover:translate-x-1 transition inline-block">Do Not Sell or Share My Info</Link></li>


          </ul>
        </div>

        {/* Company */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl hover:scale-105 transition duration-500">
          <h3 className="font-semibold text-lg mb-4 border-b border-blue-400 pb-2">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/customer-service" className="hover:text-white transition">Contact us</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link to="/help-center" className="hover:text-white hover:translate-x-1 transition inline-block">FAQ & Help Center</Link></li>
            <li><Link to="/printer-buying-guide" className="hover:text-white hover:translate-x-1 transition inline-block">Printer Buying Guide</Link></li>
            <li><Link to="/guides-resources" className="hover:text-white hover:translate-x-1 transition inline-block">Guides & Resources</Link></li>
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
              7181 Beacon Dr 15 <br />
              Reno, NV 89506 <br />
              United States
            </li>
            <li>Support: Monday–Friday, 9am–6pm ET</li>

          </ul>
        </div>

      </div>

      {/* Bottom with Logo and Company Info */}
      <div className="mt-16 border-t border-blue-500 pt-8 text-center text-blue-200 text-sm relative z-10 flex flex-col items-center gap-2">
        <img src="/spglogo.png" alt="smartPrintGuide Logo" className="h-12 w-auto mb-2 bg-white  border-blue-500 rounded-full" style={{ maxWidth: '120px' }} />
        <div className="font-bold text-blue-100">smartPrintGuide</div>
        <div className="text-blue-100 mb-4">All rights reserved.</div>
        {/* Legal/Disclaimer Content */}
        <div className="w-full max-w-5xl mx-auto px-4 text-xs text-blue-100 text-center leading-relaxed">

          <div className="mb-2">
            <span className="font-semibold text-blue-200">Disclaimer:</span> smartPrintGuide is an independent retailer based in Safety Harbor, Florida and is not affiliated with, endorsed by, or sponsored by HP Inc., Canon Inc., Epson America Inc., Brother Industries Ltd., Fujitsu Limited, TP-Link Technologies Co., ASUSTeK Computer Inc., DJI Technology Co., or any other manufacturer. All product images, logos, and trademarks are the property of their respective owners. Product images are used for informational purposes only under fair use guidelines.
          </div>
          <div className="mb-2">
            HP, LaserJet, ScanJet, OfficeJet, and related trademarks are registered trademarks of HP Inc. Canon, PIXMA, and imageCLASS are trademarks of Canon Inc. Epson and EcoTank are trademarks of Seiko Epson Corporation. Brother is a trademark of Brother Industries Ltd. TP-Link and Archer are trademarks of TP-Link Technologies Co. ASUS and ROG are trademarks of ASUSTeK Computer Inc. DJI, Mavic, Mini, Air, and Avata are trademarks of DJI Technology Co. All other trademarks are the property of their respective owners.
          </div>
          <div className="mb-2">
            All product information, specifications, pricing, and availability are subject to change without notice. We make every effort to ensure accuracy but cannot guarantee that all information is complete or error-free. Manufacturer warranties apply per brand terms. Please verify product details with the manufacturer before making a purchase decision. For questions, contact us at <a href="mailto:support@smartprintguide.com" className="underline text-blue-200 hover:text-white">support@smartprintguide.com</a>.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
