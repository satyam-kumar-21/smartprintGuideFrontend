import React from "react";
import { Link } from "react-router-dom";

const ResourceCenterGuideDetailsSustainability = () => (
  <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
    <div className="absolute -top-16 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
    <div className="relative max-w-3xl mx-auto px-6 bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
        Sustainable Printing: Eco-Friendly Practices That Save Money
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Sustainability</span>
        <span className="text-xs text-gray-500">4 min read</span>
      </div>
      <p className="text-gray-700 text-lg mb-6">
        Environmental sustainability and cost reduction often go hand in hand when it comes to office printing. This guide explores practical strategies for reducing your printing environmental footprint while cutting costs. Topics include duplex (two-sided) printing defaults, EcoTank and supertank printers that dramatically reduce cartridge waste, recycled paper options, and energy-efficient devices with ENERGY STAR certification. Learn about manufacturer take-back programs for used cartridges, responsible e-waste disposal, and how to calculate your carbon footprint from printing activities. We provide actionable steps for implementing a green printing policy in your organization.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-8">
        <li>Duplex printing and EcoTank devices</li>
        <li>Recycled paper and ENERGY STAR equipment</li>
        <li>Manufacturer take-back and e-waste</li>
        <li>How to implement a green policy</li>
      </ul>
      <Link to="/" className="inline-block mt-4">
        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition duration-300">
          Back to Resource Center
        </button>
      </Link>
    </div>
  </section>
);

export default ResourceCenterGuideDetailsSustainability;
