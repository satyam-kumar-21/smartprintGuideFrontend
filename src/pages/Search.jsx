import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { listProducts } from "../redux/actions/productActions";
import ProductGrid from "../components/productsCategories/ProductGrid";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const searchTerm = query.get("query") || "";

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    if (searchTerm) {
      dispatch(listProducts(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[60vh]">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">
        Search Results for: <span className="text-blue-600">{searchTerm}</span>
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && (
        <ProductGrid products={products || []} heading="Results" />
      )}
    </div>
  );
};

export default Search;
