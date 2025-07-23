import React from "react";

const MainLayout = ({ children }) => {
  //  redirect to onboarding page
  return (
    <div className="flex justify-center container mx-auto mt-20">
      {children}
    </div>
  );
};

export default MainLayout;
