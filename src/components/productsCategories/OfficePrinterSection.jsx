import React from "react";
import ProductRouteHeading from "./ProductRouteHeading";
import CommonCategoryBar from "./CommonCategoryBar";
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
      <CommonCategoryBar />
      <OfficePrinter />
      <FeaturesSection />
    </>
  );
}

export default OfficePrinterSection;
