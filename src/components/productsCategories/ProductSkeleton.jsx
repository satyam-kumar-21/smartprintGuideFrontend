import React from "react";

const ProductSkeleton = () => (
  <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-xl flex flex-col h-full overflow-hidden min-h-[160px] sm:min-h-[260px] w-full max-w-[98vw] mx-auto animate-pulse">
    <div className="bg-blue-100 h-44 flex items-center justify-center">
      <div className="w-24 h-24 bg-blue-200 rounded-full" />
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-1">
      <div className="h-4 bg-blue-100 rounded w-1/3 mb-2" />
      <div className="h-6 bg-blue-200 rounded w-2/3 mb-3" />
      <div className="h-3 bg-blue-100 rounded w-1/2 mb-4" />
      <div className="h-8 bg-blue-200 rounded w-full mb-2" />
      <div className="h-8 bg-blue-100 rounded w-full" />
    </div>
  </div>
);

export default ProductSkeleton;
