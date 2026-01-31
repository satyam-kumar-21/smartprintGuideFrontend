import React from "react";
import heroImage from "../../assets/printer.png"; // Main image for all sections

const AboutContent = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header with Image */}
       <div className="mb-16">
  <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto gap-8">
    
    {/* Image Section */}
    <div className="md:w-1/2 flex justify-center md:justify-start">
      <img
        src={heroImage}
        alt="Smart ePrinting Team"
        className="w-full max-w-2xl h-64 object-cover rounded-xl shadow-lg"
      />
    </div>

    {/* Text Section */}
    <div className="md:w-1/2 text-center md:text-left">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        About Us – Smart ePrinting
      </h2>
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Your Trusted Online Store for Printing Essentials
      </h3>
      <p className="text-gray-600 text-base sm:text-lg">
        Welcome to Smart ePrinting — an independent online retailer dedicated to making it easy for individuals, families, and businesses to shop for reliable printers, ink, toner, and essential printing supplies. Our mission is simple: to provide a clear, honest, and customer-friendly shopping experience where you can confidently choose products that match your everyday printing needs.
      </p>
    </div>

  </div>
</div>


        {/* Who We Are - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Who We Are
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Smart ePrinting was created with the goal of helping customers understand and find the right printing products without confusion. In a world where technology and options continue to grow, we wanted to build a space that feels simple, transparent, and human-centered.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We operate independently and are not affiliated with or endorsed by any printer manufacturer. Our selections come from trusted suppliers, and every brand name or trademark used on our website belongs to its respective owner and is used strictly for identification purposes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              At Smart ePrinting, we combine accurate product information, clear communication, and dependable service to support customers in making informed decisions every day.
            </p>
          </div>
          <div>
            <img
              src={heroImage}
              alt="Our Story"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* What We Offer - Three Column Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            What We Offer
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={heroImage}
                alt="Printers"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="text-green-600 mr-2">✔</span> Printers for Home & Office
                </h4>
                <p className="text-gray-600">
                  A curated selection of printers designed for personal use, schoolwork, small business environments, and everyday printing tasks.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={heroImage}
                alt="Ink & Toner"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="text-green-600 mr-2">✔</span> Ink & Toner Cartridges
                </h4>
                <p className="text-gray-600">
                  A wide variety of genuine-quality ink and toner supplies with detailed compatibility information so you can choose the right fit with confidence.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={heroImage}
                alt="Printing Accessories"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="text-green-600 mr-2">✔</span> Printing Accessories
                </h4>
                <p className="text-gray-600">
                  Paper, specialty supplies, and everyday essentials that support your home or office printing setup.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitment to Customers - Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Our Commitment to Customers
          </h3>
          <p className="text-gray-600 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            At Smart ePrinting, we believe trust is built through clarity, consistency, and respect. That's why we focus on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Transparency</h4>
              <p className="text-gray-600 text-sm">Clear product details, honest descriptions, and straightforward communication without complexity.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Customer Respect</h4>
              <p className="text-gray-600 text-sm">Every question matters. Our support team is here to help with product inquiries, order updates, and general shopping assistance.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Security & Safety</h4>
              <p className="text-gray-600 text-sm">We use secure checkout processes and industry-standard systems to protect your information.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Quality Choices</h4>
              <p className="text-gray-600 text-sm">We offer products sourced through reliable channels so you can enjoy a dependable shopping experience.</p>
            </div>
          </div>
        </div>

        {/* Independent Retailer Statement - Highlighted */}
        <div className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border-l-4 border-blue-500">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Independent Retailer Statement
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Smart ePrinting operates as an independent online retailer. We are not affiliated with, sponsored by, or endorsed by any printer or technology manufacturer.
          </p>
          <p className="text-gray-600 leading-relaxed">
            All trademarks, brand names, product images, and labels belong to their respective owners and are used solely to help customers identify and select compatible products. Our role is to make shopping easier — not to represent or replace official brand support.
          </p>
        </div>

        {/* Why Customers Choose Smart ePrinting - Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Why Customers Choose Smart ePrinting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-green-600 mr-2">✔</span> Simple & Easy Shopping
              </h4>
              <p className="text-gray-600">A clean, intuitive website that helps you browse and compare products quickly.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-green-600 mr-2">✔</span> Professional & Responsive Support
              </h4>
              <p className="text-gray-600">We provide assistance with product-related questions, order status updates, and general shopping needs.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-green-600 mr-2">✔</span> Accurate Product Information
              </h4>
              <p className="text-gray-600">Each product page includes clear specifications and compatibility details to support well-informed decisions.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-green-600 mr-2">✔</span> Dependable Customer Experience
              </h4>
              <p className="text-gray-600">Safe checkout, reliable delivery partners, and respectful communication every step of the way.</p>
            </div>
          </div>
        </div>

        {/* Our Vision - Hero Style */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6">
              Our Vision
            </h3>
            <p className="leading-relaxed mb-4">
              To be a trusted and customer-focused retailer that helps people shop for printing essentials confidently and comfortably. We continuously improve our platform with better transparency, clearer navigation, and a more helpful shopping experience.
            </p>
            <p className="leading-relaxed">
              As printing needs evolve, our commitment to honesty, reliability, and customer care remains the foundation of everything we do.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutContent;
