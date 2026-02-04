import React from "react";
import CategoryProductList from "../productsCategories/CategoryProductList";

const HomeProductList = () => {
    // categoryName="" means fetch all
    return <CategoryProductList categoryName="" heading="Our Latest Products" />;
};

export default HomeProductList;
