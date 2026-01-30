import React from "react";

const Careers = () => {
  return (
    <section className="w-full bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Careers
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Join our team and help us provide high-quality printers, cartridges,
            and accessories to homes and businesses online. We value innovation,
            dedication, and teamwork.
          </p>
        </div>

        {/* Open Positions */}
        <div className="space-y-12">

          {/* Example Position */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Frontend Developer
            </h2>
            <p className="text-gray-600 mb-4">
              We are looking for a skilled frontend developer to build responsive
              and user-friendly web applications for our online printer store.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Experience with React and Tailwind CSS</li>
              <li>Strong understanding of responsive design</li>
              <li>Knowledge of APIs and state management</li>
            </ul>
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
              Apply Now
            </button>
          </div>

          {/* Another Position */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Customer Support Executive
            </h2>
            <p className="text-gray-600 mb-4">
              Provide exceptional customer support to our clients, helping with
              orders, returns, and product inquiries.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Excellent communication skills</li>
              <li>Problem-solving attitude</li>
              <li>Experience in e-commerce support is a plus</li>
            </ul>
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
              Apply Now
            </button>
          </div>

        </div>

        {/* Why Work With Us */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Work With Us
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            We offer a collaborative and flexible work environment, opportunities
            for learning and growth, and a chance to be part of a company that
            is transforming the online printing industry.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Careers;
