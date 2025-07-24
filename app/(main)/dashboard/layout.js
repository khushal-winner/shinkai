import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="px-3 h-full w-full mt-4 mb-56 sm:mb-24">
      <div className="flex justify-between mb-3">
        <h1 className="text-4xl font-bold gradient-title gradient">
          Industry Insights
        </h1>
      </div>
      <Suspense
        fallback={<BarLoader color="gray" className="mx-auto w-full mt-4" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default layout;
