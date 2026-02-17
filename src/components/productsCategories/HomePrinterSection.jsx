import React from "react";
import ProductRouteHeading from "./ProductRouteHeading";
import CommonCategoryBar from "./CommonCategoryBar";
import HomePrinter from "./HomePrinter";
import FeaturesSection from "./FeaturesSection";

function HomePrinterSection() {
  return (
    <>
      <ProductRouteHeading
        breadcrumbs={[
          { label: "Home", link: "/" },
          { label: "Products", link: "/products" },
          { label: "Home Printers" },
        ]}
        title="Home Printers"
        description="Printers for home use."
      />
      <CommonCategoryBar />
      <HomePrinter />
      <FeaturesSection />
    </>
  );
}

export default HomePrinterSection;
