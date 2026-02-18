import React from "react";
import { Link } from "react-router-dom";

const ResourceCenterGuideDetailsMPS = () => (
  <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
    <div className="absolute -top-16 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
    <div className="relative max-w-3xl mx-auto px-6 bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
        Managed Print Services: Reducing Costs by Up to 30%
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Cost Savings</span>
        <span className="text-xs text-gray-500">5 min read</span>
      </div>
      <p className="text-gray-700 text-lg mb-6">
        Managed Print Services (MPS) offer businesses a comprehensive approach to optimizing their printing infrastructure while reducing costs. This guide explores how MPS works, from initial assessment and fleet optimization to ongoing supply management and maintenance. Learn how organizations typically overspend on printing through hidden costs like excess inventory, inefficient equipment placement, and reactive maintenance. We explain the benefits of proactive monitoring, automatic toner replenishment, and consolidated billing. Case studies demonstrate how businesses across various industries have achieved significant cost reductions while improving document security and environmental sustainability.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-8">
        <li>What is Managed Print Services?</li>
        <li>How MPS reduces costs and waste</li>
        <li>Case studies and real-world examples</li>
        <li>How to get started with MPS</li>
      </ul>
      <Link to="/" className="inline-block mt-4">
        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition duration-300">
          Back to Resource Center
        </button>
      </Link>
    </div>
  </section>
);

export default ResourceCenterGuideDetailsMPS;
