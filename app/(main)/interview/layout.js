import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const layout = ({ children }) => {
  return (
    <div className="px-3 h-full w-full -mb-72">
      <Suspense
        fallback={
          <BarLoader color="gray" width={"100%"} className="mx-auto  mt-4" />
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default layout;
