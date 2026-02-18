import React from "react";
import { Link } from "react-router-dom";


const ResourceCenterCard = ({ title, category, duration, description, linkText, linkUrl }) => (
  <div className="bg-white rounded-2xl shadow-xl p-7 transition-transform hover:scale-105 border border-blue-100">
    <div className="flex items-center gap-2 mb-2">
      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">{category}</span>
      {duration && <span className="text-xs text-gray-400">{duration}</span>}
    </div>
    <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-700 text-base mb-4">{description}</p>
    <Link
      to={linkUrl}
      className="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
    >
      {linkText}
    </Link>
  </div>
);

export default ResourceCenterCard;
