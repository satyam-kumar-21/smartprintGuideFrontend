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
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 min-h-screen rounded-3xl shadow-[0_10px_40px_0_rgba(30,64,175,0.15)] bg-transparent">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 drop-shadow-lg">
          Contact Us – Smart ePrinting
        </h1>
        <p className="text-blue-700 text-base sm:text-lg max-w-3xl mx-auto bg-white/60 rounded-xl p-4 shadow-lg backdrop-blur-md">
          We’re here to help with product inquiries, order updates, and general shopping questions. At Smart ePrinting, we aim to provide clear communication and a supportive customer experience from start to finish. If you have a question about your order or need help choosing the right printing supplies, feel free to reach out using the information or form below.
        </p>
      </div>

      {/* Info Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Static Info */}
        <div className="space-y-8">
          {/* Mailing Address */}
          <div className="bg-white/90 rounded-3xl shadow-[0_8px_32px_0_rgba(30,64,175,0.18)] border border-slate-200 p-8 space-y-6 backdrop-blur-md transition-all hover:scale-[1.04] hover:shadow-[0_16px_48px_0_rgba(30,64,175,0.22)]">
            <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight">
              📍 Mailing Address
            </h2>
            <p className="text-blue-900 font-medium">
              Smart ePrinting<br />17807 Lakecrest View Drive, #1205<br />Cypress, TX 77433<br />United States
            </p>
          </div>

          {/* Email Support */}
          <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-200 p-8 space-y-6 backdrop-blur-md transition-all hover:scale-[1.02]">
            <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight">
              📧 Email Support
            </h2>
            <p className="text-blue-900 font-medium">
              For all inquiries, contact us at:{" "}
              <a href="mailto:support@smarteprinting.com" className="text-blue-600 underline font-bold">support@smarteprinting.com</a><br />Our team will respond as promptly as possible during standard business hours.
            </p>
          </div>

          {/* Website */}
          <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-200 p-8 space-y-6 backdrop-blur-md transition-all hover:scale-[1.02]">
            <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight">
              🌐 Website
            </h2>
            <p className="text-blue-900 font-medium">
              <a href="https://www.smarteprinting.com" className="text-blue-600 underline font-bold" target="_blank" rel="noopener noreferrer">www.smarteprinting.com</a><br />Browse our selection of printers, ink, toner, and printing essentials anytime.
            </p>
          </div>

          {/* How We Can Help */}
          <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-200 p-8 space-y-4 backdrop-blur-md transition-all hover:scale-[1.02]">
            <h2 className="text-xl font-black text-blue-900 uppercase tracking-tight">
              💬 How We Can Help
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

        {/* Right Column: Response Time + Form */}
        <div className="space-y-6">
          {/* Response Time Info */}
          <div className="bg-blue-100 rounded-2xl p-6 text-blue-900 font-medium shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-widest mb-2">
              🕒 Response Time
            </h3>
            <p className="text-xs sm:text-sm">
              Most messages are answered within a reasonable timeframe during business hours.<br />Response time may vary during weekends or holidays.
            </p>
          </div>

          <div className="bg-white/90 rounded-[2.5rem] shadow-3xl border border-blue-200 p-8 md:p-12 relative overflow-hidden backdrop-blur-md transition-all hover:scale-[1.01]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/60 rounded-bl-full -z-10 animate-pulse blur-sm"></div>
            <h2 className="text-2xl font-black mb-2 text-blue-900 uppercase tracking-tighter drop-shadow-[0_2px_8px_rgba(30,64,175,0.18)]">
              Submit Transmission
            </h2>
            <p className="text-blue-400 mb-10 text-[10px] font-black uppercase tracking-widest drop-shadow-sm">
              Dispatch your parameters for immediate analysis.
            </p>

            {success && (
              <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-md">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">✓</div>
                Transmission Successful. We will respond within 24 hours.
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none transition-all font-medium text-sm shadow-md"
                    placeholder="Identify yourself"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none transition-all font-medium text-sm shadow-md"
                    placeholder="Communication endpoint"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Order ID (Opt)
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none transition-all font-medium text-sm shadow-md"
                    placeholder="TRANSACTION_REF"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                    Transmission Subject
                  </label>
                  <select
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none transition-all font-black text-[10px] uppercase tracking-widest appearance-none cursor-pointer shadow-md"
                  >
                    <option>Order Inquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Technical Support</option>
                    <option>Hardware Failure</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  Message Content
                </label>
                <textarea
                  required
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-200 rounded-[2rem] px-6 py-5 focus:bg-white focus:ring-4 focus:ring-blue-200 outline-none transition-all font-medium text-sm resize-none shadow-md"
                  placeholder="Detail your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white font-black uppercase text-[11px] tracking-[0.3em] py-5 px-4 rounded-[2rem] hover:bg-blue-800 transition-all shadow-2xl shadow-blue-200 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : "Dispatch Message"}
              </button>

              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-blue-300 text-[9px] font-bold uppercase tracking-[0.2em] drop-shadow-sm">
                  Verified secure transmission tunnel
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
