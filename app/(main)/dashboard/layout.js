import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="px-3">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold gradient-title gradient">
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
