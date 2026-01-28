import React from "react";
import { EnvelopeIcon, ClockIcon, ChatBubbleLeftRightIcon, MapPinIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const CustomerService = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                Customer Service
            </h1>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Our goal is to make sure your experience is smooth, easy, and satisfying.
            </p>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column: Info */}
                <div className="space-y-8">
                    {/* Contact Options */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900">Contact Options</h2>

                        <div className="flex items-center space-x-3">
                            <ClockIcon className="w-6 h-6 text-indigo-600" />
                            <div>
                                <p className="font-medium">Office Time</p>
                                <p className="text-gray-600 text-sm">Mon–Sat, 8AM–7PM</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <EnvelopeIcon className="w-6 h-6 text-indigo-600" />
                            <div>
                                <p className="font-medium">Email Support</p>
                                <p className="text-gray-600 text-sm">info@satyamkumar.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <ChatBubbleLeftRightIcon className="w-6 h-6 text-indigo-600" />
                            <div>
                                <p className="font-medium">Live Chat</p>
                                <p className="text-gray-600 text-sm">Online</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <MapPinIcon className="w-6 h-6 text-indigo-600" />
                            <div>
                                <p className="font-medium">Visit Our Office</p>
                                <p className="text-gray-600 text-sm">
                                    9169 W State St #810 <br /> Garden City, ID 83714
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Support Hours */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900">Support Hours</h2>
                        <ul className="text-gray-600 space-y-1 text-sm">
                            <li>Monday - Friday: 8:00 AM - 8:00 PM</li>
                            <li>Saturday: 9:00 AM - 6:00 PM</li>
                            <li>Sunday: 10:00 AM - 4:00 PM</li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-2">
                        <h2 className="text-xl font-semibold text-gray-900">Quick Links</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2 text-indigo-600 hover:underline cursor-pointer">
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                <span>Track Your Order</span>
                            </li>
                            <li className="flex items-center space-x-2 text-indigo-600 hover:underline cursor-pointer">
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                <span>Returns & Exchanges</span>
                            </li>
                            <li className="flex items-center space-x-2 text-indigo-600 hover:underline cursor-pointer">
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                <span>Send us a Message</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Send us a Message</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Fill out the form below and we’ll get back to you as soon as possible.
                    </p>

                    <form className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                            <input
                                type="text"
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                            <input
                                type="email"
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order Number (if applicable)</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                            <select
                                required
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option>Select a subject</option>
                                <option>Order Inquiry</option>
                                <option>Returns & Exchanges</option>
                                <option>Technical Support</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                            <textarea
                                required
                                rows="5"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                        >
                            Submit
                        </button>

                        <p className="text-gray-500 text-xs mt-2">
                            * Required fields. We typically respond within 24 hours during business days.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerService;
