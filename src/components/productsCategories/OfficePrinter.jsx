
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductGrid from "./ProductGrid";

const OfficePrinter = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // Fetch all products (no category filter, but with sort/brand)
    dispatch(listProducts("", "", 1, sort, brand));
  }, [dispatch, sort, brand]);

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Filter: printers only, price >= 300, exclude ink/toner
  const filteredProducts = safeProducts.filter((product) => {
    let categoryName = "";
    if (typeof product.category === "object" && product.category?.name) {
      categoryName = product.category.name.toLowerCase();
    } else if (typeof product.category === "string") {
      categoryName = product.category.toLowerCase();
    }
    const isInkToner = categoryName.includes("ink") || categoryName.includes("toner");

    const priceNumber =
      typeof product.price === "string"
        ? Number(product.price.replace(/[^0-9.]/g, ""))
        : Number(product.price);

    return !isInkToner && priceNumber >= 300;
  });

  // Handler for ProductGrid filter changes
  const handleFilterChange = (newSort, newBrand) => {
    setSort(newSort);
    setBrand(newBrand);
  };

  return (
    <ProductGrid
      heading="Office Printers"
      products={filteredProducts}
      onFilterChange={handleFilterChange}
      sort={sort}
      brand={brand}
    />
  );
};

export default OfficePrinter;


