import React from "react";


const ShippingPolicy = () => (
  <section className="w-full bg-gray-50 min-h-screen py-16">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800">SHIPPING POLICY</h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">Effective Date: February 18, 2026</p>
        <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">This Shipping Policy explains how Smart Print Guide (“Company,” “we,” “our,” or “us”) processes, ships, and delivers orders placed through: www.smartprintguide.com (“Website”).<br/>By placing an order, you agree to the terms described in this Policy.</p>
      </div>
      <div className="space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">1. Company Information</h2>
          <p className="text-gray-600 leading-relaxed">
            Smart Print Guide<br />
            7181 Beacon Dr 15<br />
            Reno, NV 89506<br />
            United States<br />
            Email: <a href="mailto:support@smartprintguide.com" className="text-blue-700 underline">support@smartprintguide.com</a><br />
            Website: <a href="https://www.smartprintguide.com" className="text-blue-700 underline">www.smartprintguide.com</a><br />
            Smart Print Guide operates exclusively as an online retail platform.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">2. Order Processing</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>All orders are subject to product availability and payment verification.</li>
            <li>Orders are typically processed within one (1) to two (2) business days, excluding:
              <ul className="list-disc pl-6">
                <li>Weekends</li>
                <li>U.S. federal holidays</li>
                <li>Periods of unusually high order volume</li>
              </ul>
            </li>
            <li>Orders placed after business hours may be processed on the next business day.</li>
            <li>Processing time is separate from shipping transit time.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">3. Shipping Methods & Carriers</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Smart Print Guide partners with established national shipping carriers.</li>
            <li>Available shipping options may include:
              <ul className="list-disc pl-6">
                <li>Standard Shipping</li>
                <li>Expedited Shipping (if selected at checkout)</li>
              </ul>
            </li>
            <li>Carrier selection is determined based on order size, weight, and delivery destination.</li>
            <li>We reserve the right to use an alternative carrier when operationally necessary.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">4. Estimated Delivery Timeframes</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Estimated delivery timelines after order processing:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Standard Shipping: 3–7 business days</li>
              <li>Expedited Shipping (if selected): 1–3 business days</li>
            </ul>
            <li>Delivery estimates are not guarantees and may vary due to:
              <ul className="list-disc pl-6">
                <li>Weather conditions</li>
                <li>Carrier disruptions</li>
                <li>Regional delays</li>
                <li>High shipping volume periods</li>
                <li>Supply chain interruptions</li>
              </ul>
            </li>
            <li>Smart Print Guide is not liable for delays caused by third-party carriers.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">5. Shipping Costs</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Shipping costs are calculated at checkout based on:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Destination</li>
              <li>Package weight</li>
              <li>Selected shipping method</li>
            </ul>
            <li>Promotional free shipping offers may apply to qualifying orders.</li>
            <li>Shipping charges are non-refundable unless required by law or in cases of Company error.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">6. Order Tracking</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Once an order is shipped, customers will receive a confirmation email containing:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Carrier name</li>
              <li>Tracking number</li>
              <li>Tracking link</li>
            </ul>
            <li>Tracking information may require up to 24 hours to update within the carrier’s system.</li>
            <li>Customers are responsible for monitoring delivery progress through the carrier’s tracking platform.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">7. Risk of Loss & Title Transfer</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Title and risk of loss transfer to the customer once the shipment is delivered to the designated carrier.</li>
            <li>After transfer to the carrier:
              <ul className="list-disc pl-6">
                <li>The carrier assumes responsibility for delivery</li>
                <li>Delivery timelines are subject to carrier control</li>
                <li>Smart Print Guide is not responsible for delays, loss, or damage occurring during transit, except where required by law.</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">8. Incorrect Shipping Information</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Customers are responsible for providing accurate and complete shipping information.</li>
            <li>If incorrect address details are provided:
              <ul className="list-disc pl-6">
                <li>Orders may be delayed or returned</li>
                <li>Additional carrier fees may apply</li>
                <li>Reshipment costs may be the responsibility of the customer</li>
              </ul>
            </li>
            <li>We are not liable for delivery failures resulting from inaccurate address information.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">9. Lost or Stolen Packages</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>If tracking indicates “Delivered” but the package cannot be located:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Customers should:</li>
              <ul className="list-disc pl-14 text-gray-600">
                <li>Verify the delivery address</li>
                <li>Check with neighbors or property management</li>
                <li>Contact the shipping carrier directly</li>
              </ul>
            </ul>
            <li>Smart Print Guide is not liable for lost or stolen packages after confirmed delivery.</li>
            <li>We may assist in filing a carrier claim when appropriate.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">10. Damaged Shipments</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>If your order arrives visibly damaged:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Notify us within 48 hours of delivery</li>
              <li>Provide clear photos of the packaging and product</li>
              <li>Include your order number</li>
            </ul>
            <li>Failure to report damage within 48 hours may limit eligibility for replacement or refund.</li>
            <li>Resolution may include: Replacement shipment, Refund, Carrier damage claim submission</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">11. Partial Shipments</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Orders containing multiple items may ship separately due to:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Warehouse availability</li>
              <li>Inventory distribution</li>
              <li>Packaging logistics</li>
            </ul>
            <li>Each shipment will include separate tracking information.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">12. Delivery Refusal or Failed Delivery</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>If a shipment is refused, unclaimed, or returned due to:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Incorrect address</li>
              <li>Delivery refusal</li>
              <li>Failure to retrieve package</li>
            </ul>
            <li>The customer may be responsible for: Return shipping costs, Reshipment fees, Applicable restocking fees</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">13. Force Majeure</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Smart Print Guide shall not be liable for failure or delay in shipment due to circumstances beyond our reasonable control, including but not limited to:</li>
            <ul className="list-disc pl-10 text-gray-600">
              <li>Natural disasters</li>
              <li>Government actions</li>
              <li>Supply chain disruptions</li>
              <li>Public emergencies</li>
              <li>Carrier interruptions</li>
            </ul>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">14. International Shipping</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>At this time, Smart Print Guide primarily ships within the United States unless otherwise stated at checkout.</li>
            <li>International shipping availability, if offered, may be subject to additional customs duties, taxes, or import regulations, which are the responsibility of the recipient.</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">15. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">This Shipping Policy shall be governed by the laws of the State of Nevada, without regard to conflict of law principles.</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">16. Policy Updates</h2>
          <p className="text-gray-600 leading-relaxed">We reserve the right to update this Shipping Policy at any time. Changes become effective upon posting to the Website. Continued use of the Website constitutes acceptance of updated terms.</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">17. Independent Retailer Disclosure</h2>
          <p className="text-gray-600 leading-relaxed">Smart Print Guide operates as an independent online retailer and is not affiliated with printer manufacturers unless explicitly stated. All trademarks remain the property of their respective owners.</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">18. Contact Information</h2>
          <p className="text-gray-600 leading-relaxed">
            For shipping-related inquiries:<br />
            Smart Print Guide<br />
            Shipping Department<br />
            7181 Beacon Dr 15<br />
            Reno, NV 89506<br />
            United States<br />
            Email: <a href="mailto:support@smartprintguide.com" className="text-blue-700 underline">support@smartprintguide.com</a><br />
            Website: <a href="https://www.smartprintguide.com" className="text-blue-700 underline">www.smartprintguide.com</a>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ShippingPolicy;
