import React from "react";
import ProductRouteHeading from "./ProductRouteHeading";
import CategoryScrollSection from "./CategoryScrollSection";
import OfficePrinter from "./OfficePrinter";
import FeaturesSection from "./FeaturesSection";

function OfficePrinterSection() {
  return (
    <>
      <ProductRouteHeading
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Products", link: "/products" },
          { label: "Office Printers" },
        ]}
        title="Office Printers"
        description="Printers for office use."
      />
      <CategoryScrollSection />
      <OfficePrinter />
      <FeaturesSection />
    </>
  );
}

export default OfficePrinterSection;
