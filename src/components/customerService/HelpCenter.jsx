import React from "react";

const faqs = [
  {
    category: "Orders & Purchasing",
    icon: "📦",
    questions: [
      {
        q: "How do I place an order?",
        a: `Orders may be placed directly through our secure checkout system on www.smartprintguide.com. After adding items to your cart, proceed to checkout and complete payment using one of our accepted payment methods.\nYou will receive an order confirmation email once your purchase is successfully processed.`
      },
      {
        q: "When will my order be processed?",
        a: `Orders are typically processed within 1–2 business days, excluding weekends and U.S. federal holidays.\nProcessing time may vary during high-volume periods.`
      },
      {
        q: "Can I cancel or modify my order?",
        a: `Orders may only be canceled or modified if they have not yet been processed or shipped.\nIf your order has already entered fulfillment, it must follow our standard Return & Refund Policy.\nContact support immediately for cancellation requests.`
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    icon: "🚚",
    questions: [
      {
        q: "How long does shipping take?",
        a: `Estimated delivery timelines:\nStandard Shipping: 3–7 business days\nExpedited Shipping (if selected): 1–3 business days\nDelivery estimates begin after processing is complete.\nTransit times are not guaranteed and may vary based on carrier conditions.`
      },
      {
        q: "How can I track my order?",
        a: `Once shipped, you will receive a tracking confirmation email containing:\nCarrier name\nTracking number\nTracking link\nCustomers are responsible for monitoring shipment progress through the carrier’s system.`
      },
      {
        q: "What if my package is delayed?",
        a: `Shipping carriers may experience delays due to weather, holidays, or operational disruptions.\nIf tracking shows unusual delay, please contact the carrier first. If additional clarification is needed, contact our support team.`
      }
    ]
  },
  {
    category: "Returns & Refunds",
    icon: "🔁",
    questions: [
      {
        q: "What is your return window?",
        a: `We accept eligible returns within 30 days of delivery.\nItems must be:\n• Unused\n• In original packaging\n• Accompanied by proof of purchase\nCertain items, including opened consumables, may not be eligible for return.\nPlease review our Return & Refund Policy for full eligibility requirements.`
      },
      {
        q: "How do I request a return?",
        a: `To initiate a return:\nEmail support@smartprintguide.com\nInclude your order number\nProvide reason for return\nAttach photos if applicable\nIf approved, you will receive return authorization instructions.\nReturns sent without authorization may be refused.`
      },
      {
        q: "When will I receive my refund?",
        a: `After inspection of the returned item:\nRefunds are processed within 5–7 business days to the original payment method.\nBank processing times may vary.`
      }
    ]
  },
  {
    category: "Product & Compatibility",
    icon: "🖨",
    questions: [
      {
        q: "How do I confirm printer compatibility?",
        a: `Customers are responsible for verifying product compatibility prior to purchase.\nWe recommend:\n• Checking your exact printer model number\n• Reviewing cartridge or toner codes\n• Contacting support for clarification before ordering\nSmart Print Guide is not responsible for compatibility errors caused by incorrect model selection.`
      },
      {
        q: "Do products include manufacturer warranties?",
        a: `Some products may be covered by manufacturer warranties.\nWarranty terms are determined by the manufacturer and vary by product.\nSmart Print Guide does not provide independent warranties beyond what is offered by the manufacturer unless explicitly stated.`
      }
    ]
  },
  {
    category: "Live Chat & Customer Support",
    icon: "💬",
    questions: [
      {
        q: "How can I contact customer support?",
        a: `You may contact us through:\nLive Chat (available on our website during support hours)\nEmail: support@smartprintguide.com\nOur standard response timeframe is within one business day.`
      }
    ]
  },
  {
    category: "Security & Privacy",
    icon: "🔐",
    questions: [
      {
        q: "Is my payment information secure?",
        a: `Yes. All transactions are processed through encrypted third-party payment gateways.\nWe do not store full credit card numbers on our servers.`
      },
      {
        q: "Do you sell my personal information?",
        a: `No. Smart Print Guide does not sell personal information.\nFor full details, please review our Privacy Policy and Do Not Sell page.`
      }
    ]
  },
  {
    category: "Consumer Rights",
    icon: "⚖",
    questions: [
      {
        q: "What are my consumer rights?",
        a: `Customers are entitled to:\n• Transparent pricing\n• Clearly defined policies\n• Secure checkout\n• Fair return procedures\nIf you believe your issue has not been resolved, please contact us for review.`
      }
    ]
  }
];

export default function HelpCenter() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 text-center">Smart Print Guide Help Center</h1>
      <p className="text-base text-black mb-8 text-center">
        Welcome to the Smart Print Guide Help Center.<br />
        This page is designed to provide structured answers to common customer questions regarding product selection, order processing, shipping, returns, and general policies.<br />
        If you require further assistance, our Live Chat and Email Support channels are available.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Business Information</h2>
        <p className="text-black">
          Smart Print Guide<br />
          7181 Beacon Dr 15<br />
          Reno, NV 89506<br />
          United States<br />
          Email: <a href="mailto:support@smartprintguide.com" className="text-blue-600 underline">support@smartprintguide.com</a><br />
          Website: <a href="https://www.smartprintguide.com" className="text-blue-600 underline">www.smartprintguide.com</a><br />
          <span className="text-xs text-gray-500">Smart Print Guide operates exclusively as an online retail platform.</span>
        </p>
      </div>
      {faqs.map((section, idx) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
            <span>{section.icon}</span> {section.category}
          </h2>
          <div className="space-y-4">
            {section.questions.map((faq, i) => (
              <div key={faq.q} className="bg-blue-50 rounded-lg p-4 shadow-sm">
                <div className="font-semibold text-blue-900 mb-1">{idx + 1}.{i + 1} {faq.q}</div>
                <div className="text-black whitespace-pre-line text-sm">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="bg-blue-100 rounded-xl p-6 mt-10">
        <h2 className="text-lg font-bold text-blue-700 mb-2">Still Need Help?</h2>
        <p className="text-black mb-1">If your question is not answered here, please contact:</p>
        <ul className="list-disc list-inside text-black mb-2 pl-4">
          <li>Email: <a href="mailto:support@smartprintguide.com" className="text-blue-600 underline">support@smartprintguide.com</a></li>
          <li>Live Chat: Use the chat feature on our website</li>
        </ul>
        <p className="text-xs text-gray-500">We are committed to providing structured and professional assistance.</p>
      </div>
      <div className="text-xs text-gray-400 mt-8 text-center">
        <b>Independent Retailer Disclosure:</b> Smart Print Guide operates as an independent online retailer. We are not affiliated with, endorsed by, or authorized by any printer manufacturer unless explicitly stated. All brand names and trademarks remain the property of their respective owners.
      </div>
    </div>
  );
}
