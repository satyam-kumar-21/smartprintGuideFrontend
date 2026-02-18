import React, { useState } from "react";
import {
  EnvelopeIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

const CustomerService = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [subject, setSubject] = useState("Order Inquiry");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, {
        name,
        email,
        orderNumber,
        subject,
        message,
      });
      setSuccess(true);
      setName("");
      setEmail("");
      setOrderNumber("");
      setSubject("Order Inquiry");
      setMessage("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (



    <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen rounded-3xl shadow-[0_10px_40px_0_rgba(30,64,175,0.10)] bg-white">
      {/* Header Section */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 drop-shadow-lg flex items-center justify-center gap-2">
          <span role="img" aria-label="phone">📞</span> CONTACT SMART PRINT GUIDE
        </h1>
        <p className="text-black text-base sm:text-lg max-w-3xl mx-auto bg-blue-50 rounded-xl p-4 shadow-lg">
          <b>Contact Overview</b><br/>
          Smart Print Guide is committed to providing structured and responsive customer assistance for product inquiries, order-related questions, compatibility clarification, and general policy support.<br/>
          We operate exclusively as an online retail platform and offer multiple communication channels to ensure timely assistance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Form as a box in the grid */}
        <div className="bg-white/90 rounded-[2.5rem] shadow-3xl border border-blue-200 p-8 md:p-12 relative overflow-hidden backdrop-blur-md transition-all hover:scale-[1.01]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/60 rounded-bl-full -z-10 animate-pulse blur-sm"></div>
          <h2 className="text-2xl font-black mb-2 text-blue-900 uppercase tracking-tighter drop-shadow-[0_2px_8px_rgba(30,64,175,0.18)]">
            Submit a message
          </h2>
          <p className="text-blue-400 mb-10 text-[10px] font-black uppercase tracking-widest drop-shadow-sm">
            We usually respond within 24 hours.
          </p>
          {success && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-md">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">✓</div>
              Message sent successfully. We will respond soon.
            </div>
          )}
          {error && (
            <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-md">
              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">!</div>
              {error}
            </div>
          )}
          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-blue-800">Full name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all font-normal text-base shadow"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-blue-800">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all font-normal text-base shadow"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-blue-800">Order ID (optional)</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all font-normal text-base shadow"
                  placeholder="Order reference (if any)"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-blue-800">Subject</label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all font-normal text-base shadow appearance-none cursor-pointer"
                >
                  <option>Order inquiry</option>
                  <option>Returns & exchanges</option>
                  <option>Technical support</option>
                  <option>Hardware failure</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-800">Message</label>
              <textarea
                required
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all font-normal text-base resize-none shadow"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white font-semibold text-base py-3 px-4 rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Dispatch Message"}
            </button>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-blue-400 text-xs font-normal drop-shadow-sm">
                Your message is sent securely
              </p>
            </div>
          </form>
        </div>
        {/* Info Cards as boxes in the grid */}
        <div className="bg-blue-50 rounded-3xl shadow border border-blue-100 p-8 space-y-4">
          <h2 className="text-lg font-bold text-blue-900 uppercase tracking-tight mb-2">Response Time</h2>
          <p className="text-black">Our standard response timeframe is <b>within one (1) business day</b> (excluding weekends and U.S. federal holidays). During high-volume periods, response times may be slightly extended.</p>
        </div>
        <div className="bg-blue-50 rounded-3xl shadow border border-blue-100 p-8 space-y-4">
          <h2 className="text-lg font-bold text-blue-900 uppercase tracking-tight mb-2">Types of Assistance Provided</h2>
          <ul className="list-disc pl-5 text-black">
            <li><b>Product Information:</b> Clarification of specifications and compatibility details.</li>
            <li><b>Order Tracking:</b> Shipment confirmation and tracking information.</li>
            <li><b>Return Authorization (RMA Requests):</b> Guidance on eligible returns per our Return & Refund Policy.</li>
            <li><b>Shipping & Delivery:</b> Processing timelines and transit estimates.</li>
            <li><b>Policy Clarification:</b> Privacy, consumer rights, accessibility, and compliance inquiries.</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-3xl shadow border border-blue-100 p-8 space-y-4">
          <h2 className="text-lg font-bold text-blue-900 uppercase tracking-tight mb-2">Order Tracking Assistance</h2>
          <ul className="list-disc pl-5 text-black">
            <li>Review your shipping confirmation email.</li>
            <li>Use the carrier tracking link provided.</li>
            <li>Allow standard transit time for delivery.</li>
            <li>If further clarification is needed, our team will be happy to assist.</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-3xl shadow border border-blue-100 p-8 space-y-4">
          <h2 className="text-lg font-bold text-blue-900 uppercase tracking-tight mb-2">Communication Guidelines</h2>
          <ul className="list-disc pl-5 text-black">
            <li>Please avoid duplicate submissions for the same issue.</li>
            <li>Provide accurate order information.</li>
            <li>Allow reasonable response time before follow-up.</li>
            <li>Incomplete or unclear requests may delay resolution.</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-3xl shadow border border-blue-100 p-8 space-y-4">
          <h2 className="text-lg font-bold text-blue-900 uppercase tracking-tight mb-2">Security Notice</h2>
          <ul className="list-disc pl-5 text-black">
            <li>Smart Print Guide will never request full credit card numbers, online banking credentials, or account passwords.</li>
            <li>If you receive suspicious communication claiming to represent Smart Print Guide, please contact us directly.</li>
          </ul>
        </div>
        <div className="bg-blue-50 rounded-3xl shadow border border-blue-100 p-8 space-y-4">
          <h2 className="text-lg font-bold text-blue-900 uppercase tracking-tight mb-2">Independent Retailer Disclosure</h2>
          <p className="text-black">Smart Print Guide operates as an independent online retailer and is not affiliated with, endorsed by, or authorized by any printer manufacturer unless explicitly stated. Brand references are used solely for identification and compatibility purposes.</p>
        </div>
        <div className="bg-blue-50 rounded-3xl shadow border border-blue-100 p-8 space-y-4">
          <h2 className="text-lg font-bold text-blue-900 uppercase tracking-tight mb-2">Mailing Address for Correspondence</h2>
          <p className="text-black">Smart Print Guide<br />7181 Beacon Dr 15<br />Reno, NV 89506<br />United States</p>
        </div>
        {/* Website */}
        <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-200 p-8 space-y-4 backdrop-blur-md transition-all hover:scale-[1.02]">
          <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight">
            🌐 Website
          </h2>
          <p className="text-blue-900 font-medium">
            <span className="text-blue-600 underline font-bold">www.smartprintguide.com</span><br />Browse our selection of printers, ink, toner, and printing essentials anytime.
          </p>
        </div>
        {/* How We Can Help */}
        <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-200 p-8 space-y-4 backdrop-blur-md transition-all hover:scale-[1.02]">
          <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight">
            💬 How we can help
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-blue-900 font-medium">
            <li>Product availability inquiries</li>
            <li>Compatibility questions</li>
            <li>Order status updates</li>
            <li>Return and refund guidance</li>
            <li>General shopping support</li>
          </ul>
          <p className="text-sm text-rose-600 font-bold mt-2">
            Important: We do not provide printer setup, troubleshooting, diagnostics, or repair assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
