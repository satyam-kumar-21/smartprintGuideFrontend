import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductGrid from "./ProductGrid";


const CategoryProductList = ({ categoryName, heading, enableFlowLayout = false }) => {
    const dispatch = useDispatch();
    const [sort, setSort] = useState('');
    const [brand, setBrand] = useState('');

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts('', categoryName, 1, sort, brand));
    }, [dispatch, categoryName, sort, brand]);

    const loadMoreHandler = () => {
        if (page < pages) {
            dispatch(listProducts('', categoryName, page + 1, sort, brand));
        }
    };

    const handleFilterChange = (newSort, newBrand) => {
        setSort(newSort);
        setBrand(newBrand);
    };

    const safeProducts = Array.isArray(products) ? products : [];
    const formattedProducts = safeProducts.map(product => ({
        ...product,
        image: product.image 
            ? (product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.image}`)
            : (product.images && product.images.length > 0 
                ? (product.images[0].startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.images[0]}`) 
                : "/assets/printer.png"),
        link: `/product/${product.slug || product._id}`
    }));

    // if (loading && safeProducts.length === 0) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-[0.3em] text-slate-400 animate-pulse">Synchronizing Inventory...</div>;
    if (error) return <div className="py-20 text-center font-black uppercase text-[10px] tracking-[0.3em] text-red-500">{error}</div>;

    if (!loading && safeProducts.length === 0 && !sort && !brand) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">{heading || categoryName}</h2>
                <div className="py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                    <p className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-400">Products Coming Soon</p>
                    <p className="mt-4 text-slate-500 text-sm font-medium">We are currently stocking this category. Please check back later.</p>
                </div>
            </div>
        );
    }
    
    return (
         <div className="flex flex-col">
            <ProductGrid
                heading={heading || categoryName}
                products={formattedProducts}
                onFilterChange={handleFilterChange}
                enableFlowLayout={enableFlowLayout}
            />
            
            {loading && page >= 1 && (
                <div className="py-8 text-center font-black uppercase text-[10px] tracking-[0.3em] text-slate-400 animate-pulse">
                    Loading More Items...
                </div>
            )}

            {!loading && page < pages && (
                <div className="flex justify-center mb-16">
                    <button 
                        onClick={loadMoreHandler}
                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-colors shadow-lg"
                    >
                        See More Products
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoryProductList;
