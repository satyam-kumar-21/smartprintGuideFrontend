import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";

import Hero from "./Hero";
import WelcomeSection from "./WelcomeSection";
import Home from "./Home";
import LatestTips from "./LatestTips";
import Reviews from "./Reviews";
import StatsCircles from "./StatsCircles";
import WhyChooseSection from "./WhyChooseSection";
import OurPromiseSection from "./OurPromiseSection";
import ImportantInfoSection from "./ImportantInfoSection";
import ProductGrid from "../productsCategories/ProductGrid";

const HomeMain = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, products } = productList;

    useEffect(() => {
        if (searchQuery) {
            dispatch(listProducts(searchQuery));
        }
    }, [dispatch, searchQuery]);

    // ================= SEARCH PAGE =================
    if (searchQuery) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <div className="max-w-7xl mx-auto px-6 py-16">

                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10">
                            Search Results for{" "}
                            <span className="text-blue-600">"{searchQuery}"</span>
                        </h1>

                        {loading ? (
                            <div className="text-center py-12 text-lg text-gray-600">
                                Loading products...
                            </div>
                        ) : products && products.length > 0 ? (
                            <ProductGrid products={products} />
                        ) : (
                            <div className="text-center py-12 text-gray-600">
                                No products found for "{searchQuery}"
                            </div>
                        )}
                    </div>

                </div>
            </div>
        );
    }

    // ================= HOME PAGE =================
    return (
        <div className="overflow-hidden">

            <Hero />
            <WelcomeSection />
            <Home />
            <WhyChooseSection />
            <OurPromiseSection />
            <Reviews />
            <StatsCircles />
            <ImportantInfoSection />

        </div>
    );
};

export default HomeMain;
