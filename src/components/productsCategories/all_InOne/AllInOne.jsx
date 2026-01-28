import React from 'react'
import ProductRouteHeading from '../ProductRouteHeading'
import CategoryScrollSection from '../CategoryScrollSection'
import AllInOneProductList from './AllInOneProductList'
import FeaturesSection from '../FeaturesSection'

function AllInOne() {
    return (
        <>
            <ProductRouteHeading
                breadcrumbs={[
                    { label: "Home", link: "/" },
                    { label: "Products", link: "/products" },
                    { label: "All In One Printers" },
                ]}
                title="All In One Printers"
                description="Print, scan, copy and fax all in one convenient portable device."
            />
            <CategoryScrollSection />
            <AllInOneProductList />
            <FeaturesSection />
        </>
    )
}

export default AllInOne