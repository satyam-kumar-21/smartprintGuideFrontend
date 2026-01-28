import React from "react";
import printerImg from "../../../assets/printer.png"; // placeholder image
import ProductGrid from "../ProductGrid";

const LaserPrintersProductList = () => {
    const products = [
        {
            category: "Laser Printers",
            title: "HP OfficeJet Pro 9125e Wireless All-in-One Color Inkjet Printer",
            description: "Print, scan, copy, fax, duplex, best for office, 3-mo free Instant Ink, AI-enabled",
            price: "209.99",
            originalPrice: "309.99",
            image: printerImg,
            link: "/product/9125e",
        },
        {
            category: "Laser Printers",
            title: "HP Envy 6155e Wireless All-in-One Color Inkjet Printer",
            description: "Prints, scans, copies, duplex, great for home, 3-mo free Instant Ink, AI-enabled",
            price: "119.99",
            originalPrice: "159.99",
            image: printerImg,
            link: "/product/6155e",
        },
        {
            category: "Laser Printers",
            title: "HP OfficeJet Pro 8139e Wireless All-in-One Color Inkjet Printer",
            description: "Print, scan, copy, best for home, with 1 year of Instant Ink included, AI-enabled",
            price: "179.99",
            originalPrice: "279.99",
            image: printerImg,
            link: "/product/8139e",
        },
        {
            category: "Laser Printers",
            title: "HP Smart Tank 6001 Wireless All-in-One Ink Tank Printer",
            description: "Up to 2 years of ink included, AI-enabled (2H0B9A)",
            price: "269.99",
            originalPrice: "369.99",
            image: printerImg,
            link: "/product/6001",
        },
        {
            category: "Laser Printers",
            title: "HP Smart Tank 7602 Wireless All-in-One Ink Tank Printer",
            description: "Up to 2 years of ink included, AI-enabled (28B98A)",
            price: "349.99",
            originalPrice: "469.99",
            image: printerImg,
            link: "/product/7602",
        },
        {
            category: "Laser Printers",
            title: "HP Smart Tank 5101 Wireless All-in-One Ink Tank Printer",
            description: "Up to 2 years of ink included, AI-enabled (1F3Y0A)",
            price: "189.99",
            originalPrice: "259.99",
            image: printerImg,
            link: "/product/5101",
        },
        {
            category: "Laser Printers",
            title: "HP OfficeJet 200 Portable Wireless Inkjet Color Printer",
            description: "",
            price: "349.99",
            originalPrice: "419.99",
            image: printerImg,
            link: "/product/200",
        },
    ];

    const dropdownOptions = ["Best Selling", "Top Rated", "New Arrivals"];

    return (
        <div>

            <ProductGrid
                heading="Best Selling"
                products={products}
                dropdownOptions={dropdownOptions}
            />
        </div>
    );
};

export default LaserPrintersProductList;
