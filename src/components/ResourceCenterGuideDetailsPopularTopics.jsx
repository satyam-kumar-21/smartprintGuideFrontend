import React from "react";
import { Link } from "react-router-dom";

const ResourceCenterGuideDetailsPopularTopics = () => (
  <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
    <div className="absolute -top-16 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
    <div className="relative max-w-3xl mx-auto px-6 bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
        Popular Topics: Quick Solutions & Tips
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Popular Topics</span>
      </div>
      <p className="text-gray-700 text-lg mb-6">
        Explore our most popular troubleshooting and setup topics for printers, scanners, and network devices. Get step-by-step solutions and expert tips for common issues.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-8">
        <li>Laser Printer Setup: Unboxing, driver installation, and first print</li>
        <li>Network Troubleshooting: Fixing connectivity and offline errors</li>
        <li>Ink Cartridge Compatibility: Choosing and installing the right cartridges</li>
        <li>Scanner Configuration: Setting up scan-to-email, PDF, and cloud</li>
        <li>Drone Regulations: Legal tips for business drone use</li>
        <li>Print Quality Issues: Diagnosing and fixing faded or streaky prints</li>
        <li>WiFi Range Extension: Improving coverage with mesh and repeaters</li>
        <li>Firmware Updates: Keeping devices secure and up to date</li>
      </ul>
      <Link to="/" className="inline-block mt-4">
        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition duration-300">
          Back to Resource Center
        </button>
      </Link>
    </div>
  </section>
);

export default ResourceCenterGuideDetailsPopularTopics;
