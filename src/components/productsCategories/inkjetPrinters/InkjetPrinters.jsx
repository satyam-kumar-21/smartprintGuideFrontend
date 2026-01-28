import React from 'react'
import ProductRouteHeading from '../ProductRouteHeading'
import CategoryScrollSection from '../CategoryScrollSection'
import InjectPrintersProductList from './InjectPrintersProductList'
import FeaturesSection from '../FeaturesSection'

function InkjetPrinters() {
    return (
        <>
            <ProductRouteHeading
                breadcrumbs={[
                    { label: "Home", link: "/" },
                    { label: "Products", link: "/products" },
                    { label: "Inkjet Printers" },
                ]}
                title="Inkjet Printers"
                description="Ideal in quality color photographs and general printing of documents."
            />
            <CategoryScrollSection />
            <InjectPrintersProductList />
            <FeaturesSection />
        </>
    )
}

export default InkjetPrinters