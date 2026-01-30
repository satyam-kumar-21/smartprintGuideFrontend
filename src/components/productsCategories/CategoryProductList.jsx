import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductGrid from "./ProductGrid";
import printerImg from "../../assets/printer.png";

const CategoryProductList = ({ categoryName, heading }) => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts('', categoryName));
    }, [dispatch, categoryName]);

    // Format products for ProductGrid (ensure links are correct and images are handled)
    const formattedProducts = products ? products.map(product => ({
        ...product,
        image: product.image 
            ? (product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`)
            : (product.images && product.images.length > 0 
                ? (product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000${product.images[0]}`) 
                : printerImg),
        link: `/product/${product.slug || product._id}`
    })) : [];

    const dropdownOptions = ["Best Selling", "Top Rated", "New Arrivals"];

    if (loading) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-[0.3em] text-slate-400 animate-pulse">Synchronizing Inventory...</div>;
    if (error) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-[0.3em] text-red-500">{error}</div>;

    return (
        <ProductGrid
            heading={heading || categoryName}
            products={formattedProducts}
            dropdownOptions={dropdownOptions}
        />
    );
};

export default CategoryProductList;
