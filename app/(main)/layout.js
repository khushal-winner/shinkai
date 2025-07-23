import React from "react";

const MainLayout = ({ children }) => {
  //  redirect to onboarding page
  return (
    <div className="flex h-screen px-4 justify-center items-center mx-auto mt-20">
      {children}
    </div>
  );
};

export default MainLayout;
