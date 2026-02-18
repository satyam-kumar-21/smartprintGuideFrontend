import React from "react";
import { Link } from "react-router-dom";
import ResourceCenterCard from "./ResourceCenterCard";

const ResourceCenter = () => (
  <section className="py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div className="max-w-4xl mx-auto text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">Guides & Resources</h2>
      <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
        Buying guides and practical tips to help you make informed technology decisions for your home or business.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <ResourceCenterCard
        category="Buying Guide"
        title="How to Choose the Right Printer for Your Business"
        duration="8 min read"
        description="A comprehensive guide covering laser vs inkjet, print volume considerations, connectivity options, and total cost of ownership calculations for office printers."
        linkText="Read Guide"
        linkUrl="/resource-center/choose-right-printer"
      />
      <ResourceCenterCard
        category="Technology"
        title="WiFi 6 vs WiFi 5: Is It Time to Upgrade Your Network?"
        duration="6 min read"
        description="Understanding the benefits of WiFi 6 technology including faster speeds, better capacity for multiple devices, and improved security features for business networks."
        linkText="Read"
        linkUrl="/resource-center/wifi-6-vs-wifi-5"
      />
      <ResourceCenterCard
        category="Cost Savings"
        title="Managed Print Services: Reducing Costs by Up to 30%"
        duration="5 min read"
        description="Learn how managed print services can optimize your printing infrastructure, reduce waste, automate supply ordering, and provide predictable monthly costs."
        linkText="Read"
        linkUrl="/resource-center/managed-print-services"
      />
      <ResourceCenterCard
        category="Security"
        title="Document Security Best Practices for Modern Offices"
        duration="7 min read"
        description="Essential security measures for protecting sensitive documents including secure printing, encryption, access controls, and compliance with data protection regulations."
        linkText="Read"
        linkUrl="/resource-center/document-security"
      />
      <ResourceCenterCard
        category="Sustainability"
        title="Sustainable Printing: Eco-Friendly Practices That Save Money"
        duration="4 min read"
        description="Discover how duplex printing, EcoTank printers, recycled paper, and energy-efficient devices can reduce your environmental impact while cutting costs."
        linkText="Read"
        linkUrl="/resource-center/sustainable-printing"
      />
      <ResourceCenterCard
        category="Popular Topics"
        title="Popular Topics: Quick Solutions & Tips"
        duration=""
        description="Laser Printer Setup, Network Troubleshooting, Ink Cartridge Compatibility, Scanner Configuration, Drone Regulations, Print Quality Issues, WiFi Range Extension, Firmware Updates."
        linkText="Read"
        linkUrl="/resource-center/popular-topics"
      />
    </div>
  </section>
);

export default ResourceCenter;
