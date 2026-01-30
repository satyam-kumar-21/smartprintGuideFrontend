import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="w-full bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our online printer store.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">

          {/* Information Collection */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information you provide directly, such as name, email, shipping address, and payment details when you place an order. We also collect information automatically through your interactions with our website, like browsing behavior and preferences.
            </p>
          </div>

          {/* How We Use */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your information is used to process orders, improve our services, personalize your shopping experience, send updates and promotions (if you opt-in), and ensure website security.
            </p>
          </div>

          {/* Sharing Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              3. Sharing of Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell your personal information. We may share data with trusted partners for payment processing, shipping, and analytics. All partners comply with data protection standards.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              4. Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              5. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns regarding our privacy practices, feel free to contact us at <span className="font-medium text-indigo-600">support@yourprintersstore.com</span>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
