import React from "react";
import {
  TruckIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

const FeaturesSection = () => {
  const features = [
    {
      icon: TruckIcon,
      title: "Fast & Reliable Delivery",
      description:
        "Carefully packed and shipped through trusted carriers to ensure safe arrival.",
    },
    {
      icon: ArrowPathIcon,
      title: "Simple Return Process",
      description:
        "Clear return guidelines designed to make your experience smooth and stress-free.",
    },
    {
      icon: ChatBubbleBottomCenterTextIcon,
      title: "Dedicated Support",
      description:
        "Our team is available to assist you with product and order-related questions.",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800">
            <span className="text-blue-600">Why Choose smartPrintGuide?</span>
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Experience reliability, clarity, and support designed around your printing needs.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl border border-green-100 rounded-3xl p-8 shadow-xl hover:shadow-green-300/50 transition-all duration-500 hover:-translate-y-3"
            >
              {/* Icon Circle */}
              <div className="relative mb-6 flex justify-center">
                <div className="absolute w-20 h-20 bg-green-200/40 rounded-full blur-2xl group-hover:scale-110 transition"></div>
                <div className="relative w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                  <feature.icon className="h-8 w-8" />
                </div>
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-blue-900 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-green-300 transition duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
