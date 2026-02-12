import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductGrid from "../productsCategories/ProductGrid";

const HomeFilteredPrinterList = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts("", "all-in-one-printers", 1));
  }, [dispatch]);

  // Filter for price < 150
  const filtered = Array.isArray(products)
    ? products.filter(
        (p) => (p.categorySlug === "all-in-one-printers" || p.category === "All In One") && Number(p.price) < 150
      )
    : [];

  return (
    <ProductGrid heading="Home Printers (All-in-One, Under $150)" products={filtered} />
  );
};

export default HomeFilteredPrinterList;
