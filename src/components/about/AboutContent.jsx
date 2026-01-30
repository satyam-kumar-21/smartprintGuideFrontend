import React from "react";

const AboutContent = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg">
            Your one-stop destination for printers, cartridges, and printing
            accessories at the best prices.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h3>

            <p className="text-gray-600 leading-relaxed mb-4">
              We are an online platform dedicated to providing high-quality
            printers and printing accessories for homes, offices, and
            businesses. Our website offers a wide selection of inkjet, laser,
            and multifunction printers, along with genuine cartridges, toners,
            and accessories.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We focus on making printer shopping easy, secure,
            and affordable with trusted brands, fast delivery, and reliable
            customer support.
            </p>
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              What Makes Us Different
            </h3>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                <p className="text-gray-600">
                  Wide range of branded printers & accessories
                </p>
              </li>

              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                <p className="text-gray-600">
                  100% genuine cartridges & toners
                </p>
              </li>

              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                <p className="text-gray-600">
                  Secure payments & easy checkout
                </p>
              </li>

              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">✓</span>
                <p className="text-gray-600">
                  Fast shipping & dedicated support
                </p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContent;
