import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="w-full bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            Please read these terms and conditions carefully before using our online printers store. By accessing or using our website, you agree to be bound by these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">

          {/* 1. Use of Website */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Use of Website
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the website. Prohibited behavior includes harassing or causing distress to others, transmitting harmful content, or attempting to access unauthorized areas.
            </p>
          </div>

          {/* 2. Product Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. Product Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We make every effort to display accurate information about printers, cartridges, and accessories. However, we do not guarantee that product descriptions, pricing, or availability are error-free. All orders are subject to product availability.
            </p>
          </div>

          {/* 3. Orders and Payments */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Orders and Payments
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By placing an order, you agree to provide accurate and complete payment information. Payments are processed securely. We reserve the right to cancel any order in case of payment issues, incorrect information, or suspected fraudulent activity.
            </p>
          </div>

          {/* 4. Shipping and Delivery */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Shipping and Delivery
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We aim to ship all products promptly. Delivery times may vary based on location and availability. While we strive for on-time delivery, we are not responsible for delays caused by carriers or external factors.
            </p>
          </div>

          {/* 5. Returns and Refunds */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Returns and Refunds
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Returns and refunds are subject to our return policy. Products must be returned in their original condition and packaging. Refunds will be processed after verification. For details, please contact our support team.
            </p>
          </div>

          {/* 6. Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our website or products. Our maximum liability is limited to the purchase price of the product(s) purchased.
            </p>
          </div>

          {/* 7. Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              7. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions regarding our terms, feel free to contact us at <span className="font-medium text-indigo-600">support@yourprintersstore.com</span>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
