import React from "react";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      quote:
        "I have already saved a significant amount on refilling ink cartridges because the system is effective.",
      name: "Isabella Reed",
      location: "San Diego, USA",
      rating: 5,
    },
    {
      quote:
        "Surprisingly, the photo prints were bright and vibrant.",
      name: "Madison Walker",
      location: "Austin, USA",
      rating: 4,
    },
    {
      quote:
        "This is an easy-to-use printer that can handle the small office workload without becoming overwhelmed.",
      name: "Harry Walker",
      location: "Chicago, USA",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            Customer Stories from Across the USA
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Real experiences from customers who trust us for reliable printing solutions—straight from the United States.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative bg-white/80 backdrop-blur-lg border border-blue-100 rounded-3xl p-8 shadow-xl hover:shadow-blue-300/60 transition-all duration-500 hover:-translate-y-3 group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute -top-6 left-6 text-blue-200 text-6xl font-serif">
                “
              </div>

              {/* Stars */}
              <div className="flex mb-4 text-blue-600">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "opacity-100" : "opacity-20"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                {review.quote}
              </p>

              {/* Customer Info */}
              <div className="border-t border-blue-100 pt-4">
                <p className="font-semibold text-blue-800 text-lg">
                  {review.name}
                </p>
                <p className="text-gray-500 text-sm">{review.location}</p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-blue-200/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
