import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import printer from "../../assets/printer.png";

const CategoryScrollSection = () => {
    const scrollRef = useRef(null);

    const categories = [
        { title: "All In One", count: 15, image: printer, link: "/product-category/all-in-one-printers" },
        { title: "Large Format", count: 7, image: printer, link: "/product-category/large-format-printers" },
        { title: "Inkjet", count: 10, image: printer, link: "/product-category/inkjet-printers" },
        { title: "Laser", count: 10, image: printer, link: "/product-category/laser-printers" },
        { title: "LED Printers", count: 6, image: printer, link: "/product-category/led-printers" },
        { title: "Ink & Toner", count: 6, image: printer, link: "/product-category/ink-toner" },
    ];

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left: direction === "left" ? -320 : 320,
            behavior: "smooth",
        });
    };

    return (
        <section className="relative max-w-7xl mx-auto px-4 py-12">

            {/* Left Arrow */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm
                   flex items-center justify-center shadow-md hover:bg-white/90 transition"
            >
                <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm
                   flex items-center justify-center shadow-md hover:bg-white/90 transition"
            >
                <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>

            {/* Scroll Area */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-2 sm:px-0 scrollbar-hide"
            >
                {categories.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className="
              flex-shrink-0
              w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] lg:w-[calc(25%-18px)]
              bg-white border rounded-xl p-5 text-center hover:shadow-lg transition
            "
                    >
                        {/* Image */}
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                        </div>

                        {/* Text */}
                        <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.count} items</p>
                    </Link>
                ))}
            </div>

            {/* Tailwind hide scrollbar for all browsers */}
            <style>
                {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
            </style>
        </section>
    );
};

export default CategoryScrollSection;
