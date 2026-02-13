import React from "react";

const AboutHero = () => {
  return (
    <section className="w-full bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-6 drop-shadow">About Us</h1>
        {/* Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-blue-700 leading-relaxed">
          Welcome to Smart Print Guide — your trusted online destination for printers, ink, toner, and printing essentials. We focus on performance, security, and a great customer experience.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
