import React from "react";
import { Link } from "react-router-dom";

const OrderHistory = ({ orders = [] }) => {
  // For now, orders is empty; in a real app, fetch from API or Redux
  const hasOrders = orders && orders.length > 0;

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-2 text-center">Order History</h1>
      <p className="text-gray-600 mb-8 text-center text-lg">View and track all your previous purchases</p>
      {hasOrders ? (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Render order list here */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-2xl shadow-xl">
          <div className="text-5xl mb-4 text-blue-200">🛒</div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">No orders found</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl hover:bg-blue-700 transition">
            Start Shopping
          </Link>
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
