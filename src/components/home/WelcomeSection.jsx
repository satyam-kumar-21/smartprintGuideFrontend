import React from "react";

const WelcomeSection = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-5 md:px-6 relative z-10">

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-14">

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-800 leading-tight text-left">
            Welcome to{" "}
            <span className="text-blue-600">smartPrintGuide</span>
          </h2>

          {/* Divider */}
          <div className="w-20 h-1 bg-blue-600 rounded-full mt-4 mb-8"></div>

          {/* Content */}
          <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed text-left">

            <p>
              smartPrintGuide is your trusted destination for printers,
              ink, toner, and everyday printing essentials. Our goal is to
              simplify your decisions by providing clear information and
              dependable recommendations.
            </p>

            <p>
              Whether you're printing at home, working remotely, or managing
              office tasks, we help you find solutions that are reliable,
              efficient, and easy to understand.
            </p>

            <p>
              From browsing to checkout, we focus on creating a smooth,
              transparent experience so you can shop with confidence
              and clarity.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WelcomeSection;
