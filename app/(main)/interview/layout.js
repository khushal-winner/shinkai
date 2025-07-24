import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="px-3 h-full w-full mt-4 -mb-72">
      <Suspense
        fallback={<BarLoader color="gray" className="mx-auto w-full mt-4" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default layout;
