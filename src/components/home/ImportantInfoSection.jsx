import React from "react";
import { Info } from "lucide-react";

const ImportantInfoSection = () => {
  return (
    <section className="relative w-full py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* Soft Background Glow */}
      <div className="absolute -top-16 right-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full shadow-md">
              <Info className="text-blue-700" size={28} />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            Important Information
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Transparency and clarity are core values at smartPrintGuide.
            Please review the following important details before placing your order.
          </p>
        </div>

        {/* 3D Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-8 md:p-10 transition-all duration-500 hover:shadow-blue-200/60">

          <ul className="space-y-5 text-gray-700 text-base md:text-lg">

            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              Product availability, pricing, and specifications may be updated
              periodically to reflect market changes and supplier updates.
            </li>

            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              Shipping and delivery timelines depend on your location,
              carrier services, and current order volume.
            </li>

            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              Manufacturer warranties apply where eligible and are governed
              by the respective brand’s terms and policies.
            </li>

            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              smartPrintGuide operates as an independent online retailer and
              is not affiliated with or endorsed by any printer manufacturer.
            </li>

            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">•</span>
              We encourage customers to verify compatibility and product
              specifications before completing their purchase.
            </li>

          </ul>

        </div>
      </div>
    </section>
  );
};

export default ImportantInfoSection;
