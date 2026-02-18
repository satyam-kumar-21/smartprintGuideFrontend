import React from "react";
import { Link } from "react-router-dom";

const ResourceCenterGuideDetailsWiFi6 = () => (
  <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
    <div className="absolute -top-16 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
    <div className="relative max-w-3xl mx-auto px-6 bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
        WiFi 6 vs WiFi 5: Is It Time to Upgrade Your Network?
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Technology</span>
        <span className="text-xs text-gray-500">6 min read</span>
      </div>
      <p className="text-gray-700 text-lg mb-6">
        WiFi 6 (802.11ax) represents a significant leap forward in wireless networking technology. This guide explains the technical improvements over WiFi 5, including faster data rates, better performance in congested environments, and improved battery life for connected devices through Target Wake Time (TWT). We discuss practical scenarios where upgrading makes sense, such as offices with many simultaneous users, environments with IoT devices, or locations requiring better coverage. Learn about backward compatibility, mesh networking options, and how to evaluate whether your current infrastructure can support WiFi 6. Includes recommendations for business-grade routers and access points from top manufacturers like TP-Link and ASUS.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-8">
        <li>Key differences between WiFi 5 and WiFi 6</li>
        <li>Benefits for business and home users</li>
        <li>How to assess your upgrade needs</li>
        <li>Recommended routers and access points</li>
      </ul>
      <Link to="/" className="inline-block mt-4">
        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition duration-300">
          Back to Resource Center
        </button>
      </Link>
    </div>
  </section>
);

export default ResourceCenterGuideDetailsWiFi6;
