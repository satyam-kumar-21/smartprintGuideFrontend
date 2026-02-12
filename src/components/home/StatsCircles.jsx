import React from "react";

const StatsCircles = () => {
  const stats = [
    {
      number: "10K+",
      label: "Orders Successfully Delivered",
    },
    {
      number: "10K+",
      label: "Happy Customers Worldwide",
    },
    {
      number: "2K+",
      label: "Verified 5-Star Reviews",
    },
    {
      number: "100%",
      label: "Secure & Protected Payments",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            smartPrintGuide in Numbers
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Trusted by thousands for reliable printing solutions and seamless online shopping.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-8 text-center shadow-xl hover:shadow-blue-300/60 transition-all duration-500 hover:-translate-y-3"
            >
              {/* Number Circle */}
              <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg group-hover:scale-110 transition duration-500">
                {stat.number}
              </div>

              {/* Label */}
              <p className="text-gray-700 font-medium text-lg">
                {stat.label}
              </p>

              {/* Soft Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-blue-200/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCircles;
