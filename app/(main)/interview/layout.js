import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="md:px-3 h-full w-full -mb-72">
      <Suspense
        fallback={
          <div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-title gradient">
              Loading...
            </h1>

            <BarLoader color="gray" width={"100%"} className="mx-auto  mt-4" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default layout;
