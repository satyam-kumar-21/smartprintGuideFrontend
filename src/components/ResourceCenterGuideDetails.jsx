import React from "react";
import { Link } from "react-router-dom";

const GuideDetails = () => (
  <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
    {/* Soft Background Glow */}
    <div className="absolute -top-16 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
    <div className="relative max-w-3xl mx-auto px-6 bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
        How to Choose the Right Printer for Your Business
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Buying Guide</span>
        <span className="text-xs text-gray-500">8 min read</span>
      </div>
      <p className="text-gray-700 text-lg mb-6">
        Selecting the right printer is crucial for business productivity and cost management. This comprehensive guide walks you through the key factors to consider when purchasing a printer for your office environment. We cover the differences between laser and inkjet technology, help you estimate your monthly print volume, and explain connectivity options like WiFi, Ethernet, and USB. Learn about total cost of ownership calculations that factor in ink or toner costs, energy consumption, and maintenance requirements. Whether you need a compact desktop printer for a home office or a high-volume multifunction device for a busy corporate environment, this guide provides the insights you need to make an informed decision.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-8">
        <li>Laser vs Inkjet: Pros, cons, and best use cases</li>
        <li>How to estimate your monthly print volume</li>
        <li>Connectivity: WiFi, Ethernet, USB, and mobile printing</li>
        <li>Total cost of ownership: Ink/toner, energy, maintenance</li>
        <li>Choosing between desktop and multifunction printers</li>
      </ul>
      <Link to="/" className="inline-block mt-4">
        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition duration-300">
          Back to Resource Center
        </button>
      </Link>
    </div>
  </section>
);

export default GuideDetails;
