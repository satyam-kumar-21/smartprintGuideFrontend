import React from "react";
import CategoryProductList from "../productsCategories/CategoryProductList";

const HomeProductList = ({ enableFlowLayout = false }) => {
    // categoryName="" means fetch all
    return (
        <div className="m-0 p-0 w-full">
            <CategoryProductList categoryName="" heading="Our Latest Products" enableFlowLayout={enableFlowLayout} />
        </div>
    );
};

export default HomeProductList;
