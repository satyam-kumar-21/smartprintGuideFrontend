import React from "react";
import { ShieldCheck, Leaf, Users, Sparkles } from "lucide-react";

const promises = [
  {
    icon: <Sparkles size={22} />,
    title: "Honest Guidance",
    description:
      "We provide clear product insights, compatibility details, and straightforward policies — so you can shop with full confidence.",
  },
  {
    icon: <Users size={22} />,
    title: "Customer First Approach",
    description:
      "Every customer matters. We listen, respond quickly, and aim to make your experience smooth from browsing to delivery.",
  },
  {
    icon: <Leaf size={22} />,
    title: "Reliable Quality",
    description:
      "We source products from trusted suppliers to ensure consistent performance and dependable printing results.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Experience",
    description:
      "Your personal and payment information is protected using secure, industry-standard technologies and trusted payment gateways.",
  },
];

const OurPromiseSection = () => {
  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            Our Promise at smartPrintGuide
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            We’re committed to delivering more than just printing supplies —
            we deliver trust, reliability, and confidence.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((promise, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg border border-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-blue-200/60 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-3 mb-4 text-blue-700">
                <div className="bg-blue-100 p-2 rounded-lg">
                  {promise.icon}
                </div>
                <h3 className="text-lg font-semibold text-blue-800">
                  {promise.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPromiseSection;
