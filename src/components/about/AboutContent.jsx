
import React from "react";

const AboutContent = () => (
  <section className="w-full bg-gradient-to-b from-blue-50 to-white py-0">
    {/* Hero Section */}
    <div className="w-full bg-blue-900 py-12 px-4 sm:px-8 flex flex-col items-center text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">About Smart Print Guide</h1>
      <p className="text-lg sm:text-xl text-white max-w-2xl mb-8">Your independent online destination for printers, multifunction devices, and printing solutions across the United States.</p>
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
        alt="Office printers overview"
        className="rounded-2xl shadow-2xl w-full max-w-3xl h-48 sm:h-64 md:h-80 object-cover border-4 border-white"
      />
    </div>

    {/* Main Content Container */}
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 grid gap-12">
      {/* Company Overview */}
      <section className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-500 mb-3">Company Overview</h2>
          <p className="text-black mb-2">
            Smart Print Guide is an independent online retail platform specializing in printers, multifunction devices, and related printing technology solutions for customers throughout the United States.
          </p>
          <p className="text-black mb-2">
            Our e-commerce platform, <a href="https://www.smartprintguide.com" className="text-blue-600 underline">www.smartprintguide.com</a>, is designed to provide structured product information, clearly defined purchasing policies, and secure transaction processes. We operate exclusively online and serve individuals, remote professionals, and small business customers nationwide.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
            alt="Printer supplies"
            className="rounded-xl shadow-lg w-full max-w-xs h-40 sm:h-56 object-cover"
          />
        </div>
      </section>

      {/* Purpose & Mission */}
      <section className="bg-blue-50 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Our Purpose & Mission</h2>
        <p className="text-black mb-2">
          The primary objective of Smart Print Guide is to simplify the process of selecting and purchasing printing equipment.
        </p>
        <ul className="list-disc list-inside text-black mb-2 pl-4">
          <li className="font-bold text-blue-500">Provide transparent and organized product specifications</li>
          <li className="font-bold text-blue-500">Offer structured guidance for printer selection</li>
          <li className="font-bold text-blue-500">Maintain clear and accessible consumer policies</li>
          <li className="font-bold text-blue-500">Process transactions through secure systems</li>
          <li className="font-bold text-blue-500">Support customers with defined service procedures</li>
        </ul>
        <p className="text-black">
          Printing technology can be complex, particularly when evaluating compatibility, cost-per-page, duty cycle, and wireless functionality. Our platform is structured to present relevant information clearly so customers can make informed purchasing decisions.
        </p>
      </section>

      {/* What We Offer */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <>
            <ul className="list-disc list-inside text-black mb-2 pl-4">
              <li><span className="font-bold text-blue-500">Inkjet Printers</span><br/>Suitable for color-intensive tasks, personal printing, and moderate-volume use.</li>
              <li><span className="font-bold text-blue-500">Laser Printers</span><br/>Designed for document-heavy environments and higher monthly output requirements.</li>
              <li><span className="font-bold text-blue-500">Multifunction Devices</span><br/>Integrated systems offering printing, scanning, copying, and fax capabilities for home offices and business settings.</li>
              <li><span className="font-bold text-blue-500">Printing Supplies & Accessories</span><br/>Compatible consumables, connectivity accessories, and operational components designed to support supported devices.</li>
            </ul>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
                alt="Printing accessories"
                className="rounded-xl shadow-md w-full max-w-xs h-40 sm:h-56 object-cover"
              />
            </div>
          </>
        </div>
        <p className="text-black mt-4">
          All products are sourced through authorized distributors and established supply channels. Availability is subject to supplier inventory.
        </p>
      </section>

      {/* Who We Serve */}
      <section className="bg-blue-50 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Who We Serve</h2>
        <ul className="list-disc list-inside text-black mb-2 pl-4">
          <li><span className="font-bold text-blue-500">Individual & Household Users</span><br/>Customers seeking dependable and cost-conscious printing solutions for everyday needs.</li>
          <li><span className="font-bold text-blue-500">Remote Professionals</span><br/>Users operating from home offices who require wireless connectivity, compact design, and multifunction capability.</li>
          <li><span className="font-bold text-blue-500">Small & Growing Businesses</span><br/>Organizations seeking efficient, cost-per-page optimized solutions with higher output capacity.</li>
        </ul>
        <p className="text-black">
          We strive to support customers at varying levels of technical familiarity by presenting product information in a structured and accessible format.
        </p>
      </section>

      {/* Operational Transparency */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Operational Transparency</h2>
        <ul className="list-disc list-inside text-black mb-2 pl-4">
          <li className="font-bold text-blue-500">Accept orders through secure digital checkout systems</li>
          <li className="font-bold text-blue-500">Coordinate fulfillment through distribution networks</li>
          <li className="font-bold text-blue-500">Provide shipment tracking information</li>
          <li className="font-bold text-blue-500">Maintain a structured return authorization process (RMA)</li>
          <li className="font-bold text-blue-500">Respond to customer inquiries via email-based support</li>
        </ul>
        <p className="text-black">
          Customers are encouraged to review our published policies prior to purchase to understand shipping timelines, return eligibility, and refund procedures.
        </p>
      </section>

      {/* Independent Retailer Disclosure */}
      <section className="bg-blue-50 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Independent Retailer Disclosure</h2>
        <p className="text-black mb-2">
          Smart Print Guide operates as an independent online retailer.<br/>
          We are not affiliated with, endorsed by, sponsored by, or authorized by any printer manufacturer unless explicitly stated.<br/>
          All brand names, logos, product names, and trademarks displayed on this Website remain the property of their respective owners and are used solely for identification and compatibility purposes.<br/>
          The use of brand references does not imply manufacturer partnership or official authorization.
        </p>
      </section>

      {/* Commitment to Compliance & Consumer Protection */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Commitment to Compliance & Consumer Protection</h2>
        <ul className="list-disc list-inside text-black mb-2 pl-4">
          <li className="font-bold text-blue-500">Privacy & Data Protection</li>
          <li className="font-bold text-blue-500">Terms & Conditions</li>
          <li className="font-bold text-blue-500">Shipping & Delivery Procedures</li>
          <li className="font-bold text-blue-500">Return & Refund Requirements</li>
          <li className="font-bold text-blue-500">Consumer Rights</li>
          <li className="font-bold text-blue-500">Accessibility Standards</li>
          <li className="font-bold text-blue-500">Cookie & Data Use Transparency</li>
        </ul>
        <p className="text-black">
          We operate in accordance with applicable U.S. consumer protection and privacy regulations and are committed to maintaining transparency in our retail operations.
        </p>
      </section>

      {/* Customer Support Commitment */}
      <section className="bg-blue-50 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Customer Support Commitment</h2>
        <p className="text-black mb-2">
          We provide structured email-based assistance for:
        </p>
        <ul className="list-disc list-inside text-black mb-2 pl-4">
          <li className="font-bold text-blue-500">Product inquiries</li>
          <li className="font-bold text-blue-500">Compatibility clarification</li>
          <li className="font-bold text-blue-500">Order status requests</li>
          <li className="font-bold text-blue-500">Return authorization</li>
          <li className="font-bold text-blue-500">General policy questions</li>
        </ul>
        <p className="text-black">
          To contact us:<br/>
          <a href="mailto:support@smartprintguide.com" className="text-blue-600 underline">support@smartprintguide.com</a><br/>
          We aim to respond within one business day.
        </p>
      </section>

      {/* Continuous Improvement */}
      <section className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Continuous Improvement</h2>
        <ul className="list-disc list-inside text-black mb-2 pl-4">
          <li className="font-bold text-blue-500">Product listings</li>
          <li className="font-bold text-blue-500">Supplier performance</li>
          <li className="font-bold text-blue-500">Policy clarity</li>
          <li className="font-bold text-blue-500">Customer feedback</li>
          <li className="font-bold text-blue-500">Website accessibility</li>
        </ul>
        <p className="text-black">
          We are committed to improving operational efficiency and maintaining accurate product representation.
        </p>
      </section>

      {/* Contact Information */}
      <section className="bg-blue-50 rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-3">Contact Information</h2>
        <p className="text-black">
          <span className="font-bold text-blue-500">Smart Print Guide</span><br/>
          7181 Beacon Dr 15<br/>
          Reno, NV 89506<br/>
          United States<br/>
          Email: <a href="mailto:support@smartprintguide.com" className="text-blue-600 underline">support@smartprintguide.com</a><br/>
          Website: <a href="https://www.smartprintguide.com" className="text-blue-600 underline">www.smartprintguide.com</a>
        </p>
      </section>
    </div>
  </section>
);

export default AboutContent;
