import React from "react";
import { ShieldCheck, Truck, Info, Users, BadgeCheck } from "lucide-react";

const WhyImage = "/assets/about.jpg";

const choosePoints = [
  {
    id: 1,
    icon: <Info size={22} />,
    title: "Clear & Accurate Product Information",
    description:
      "Every product page includes detailed specifications and compatibility insights to help you make confident decisions.",
  },
  {
    id: 2,
    icon: <Users size={22} />,
    title: "Customer-Focused Support",
    description:
      "Our team is ready to assist with product questions, order tracking, and general shopping guidance.",
  },
  {
    id: 3,
    icon: <ShieldCheck size={22} />,
    title: "Secure & Safe Checkout",
    description:
      "We use trusted payment systems and secure encryption to ensure a smooth and protected shopping experience.",
  },
  {
    id: 4,
    icon: <Truck size={22} />,
    title: "Reliable Shipping",
    description:
      "We work with established carriers to support safe and timely delivery based on your location.",
  },
  {
    id: 5,
    icon: <BadgeCheck size={22} />,
    title: "Independent Retailer",
    description:
      "smartPrintGuide operates independently and is not affiliated with printer manufacturers. All trademarks belong to their respective owners.",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">

      {/* Soft Glow Background */}
      <div className="absolute -left-24 top-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -right-24 bottom-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            <span className="text-blue-600">Why Choose smartPrintGuide?</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Experience a smarter way to shop for printers, ink, and toner —
            built on clarity, trust, and reliability.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Side - Points */}
          <div className="grid sm:grid-cols-2 gap-6">

            {choosePoints.map((point) => (
              <div
                key={point.id}
                className="bg-white/80 backdrop-blur-xl border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-blue-200/60 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3 text-blue-700">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {point.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">
                    {point.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}

          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-200/30 rounded-3xl blur-2xl"></div>

            <img
              src={WhyImage}
              alt="Why Choose smartPrintGuide"
              className="relative w-full h-full object-cover rounded-3xl shadow-2xl border border-blue-100"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
