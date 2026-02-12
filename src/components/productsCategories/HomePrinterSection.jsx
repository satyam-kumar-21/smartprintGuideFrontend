import React from "react";
import ProductRouteHeading from "./ProductRouteHeading";
import CategoryScrollSection from "./CategoryScrollSection";
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
      <CategoryScrollSection />
      <HomePrinter />
      <FeaturesSection />
    </>
  );
}

export default HomePrinterSection;
