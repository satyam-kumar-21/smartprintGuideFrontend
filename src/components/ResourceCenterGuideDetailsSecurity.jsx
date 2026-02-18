import React from "react";
import { Link } from "react-router-dom";

const ResourceCenterGuideDetailsSecurity = () => (
  <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4">
    <div className="absolute -top-16 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
    <div className="relative max-w-3xl mx-auto px-6 bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
        Document Security Best Practices for Modern Offices
      </h1>
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Security</span>
        <span className="text-xs text-gray-500">7 min read</span>
      </div>
      <p className="text-gray-700 text-lg mb-6">
        In an era of increasing data breaches and regulatory requirements, document security is more important than ever. This guide covers essential security measures for protecting sensitive documents throughout their lifecycle. Learn about secure print release (pull printing), user authentication at devices, encryption for stored documents, and audit trail capabilities. We discuss compliance considerations for industries like healthcare (HIPAA), finance (SOX), and government (FISMA). The guide also addresses network security for connected devices, firmware updates, and end-of-life data sanitization. Practical recommendations help you evaluate security features when purchasing new equipment.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-8">
        <li>Secure print release and user authentication</li>
        <li>Encryption and audit trails</li>
        <li>Compliance for regulated industries</li>
        <li>Network and device security tips</li>
      </ul>
      <Link to="/" className="inline-block mt-4">
        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition duration-300">
          Back to Resource Center
        </button>
      </Link>
    </div>
  </section>
);

export default ResourceCenterGuideDetailsSecurity;
