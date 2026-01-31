import React, { useState } from "react";

const ReturnExchangeForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    orderNumber: "",
    orderDate: "",
    deliveryDate: "",
    productName: "",
    
    reason: "",
    itemCondition: "",
    resolution: "",
    additionalDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission (e.g., send email or API call)
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <form
      className="bg-white border border-gray-200 rounded p-6 space-y-6"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="orderNumber"
          placeholder="Order Number"
          value={formData.orderNumber}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="date"
          name="orderDate"
          placeholder="Order Date"
          value={formData.orderDate}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="date"
          name="deliveryDate"
          placeholder="Delivery Date"
          value={formData.deliveryDate}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="productName"
          placeholder="Product Name / Model"
          value={formData.productName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        
      </div>

      <h3 className="text-lg font-semibold text-gray-900">Reason for Return</h3>
      <select
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-3 py-2 w-full"
      >
        <option value="">Select Reason</option>
        <option value="wrongItem">Received the wrong item</option>
        <option value="damaged">Item arrived damaged</option>
        <option value="defective">Item is defective / not functioning</option>
        <option value="missingParts">Missing parts or accessories</option>
        <option value="orderedByMistake">Ordered by mistake</option>
        <option value="noLongerNeeded">No longer needed</option>
        <option value="other">Other</option>
      </select>

      <h3 className="text-lg font-semibold text-gray-900">Item Condition</h3>
      <select
        name="itemCondition"
        value={formData.itemCondition}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-3 py-2 w-full"
      >
        <option value="">Select Condition</option>
        <option value="unopened">Unopened / sealed</option>
        <option value="openedUnused">Opened but unused</option>
        <option value="used">Used</option>
        <option value="damaged">Damaged</option>
      </select>

      <h3 className="text-lg font-semibold text-gray-900">Preferred Resolution</h3>
      <select
        name="resolution"
        value={formData.resolution}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-3 py-2 w-full"
      >
        <option value="">Select Resolution</option>
        <option value="refund">Refund</option>
        <option value="replacement">Replacement (only for defective/incorrect items)</option>
        <option value="storeCredit">Store Credit</option>
      </select>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Additional Details (optional)</label>
        <textarea
          name="additionalDetails"
          value={formData.additionalDetails}
          onChange={handleChange}
          placeholder="Additional details..."
          className="border border-gray-300 rounded px-3 py-2 w-full"
          rows="4"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit Return Request
      </button>
    </form>
  );
};

export default ReturnExchangeForm;
