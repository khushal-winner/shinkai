import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex mb-10">
      <SignUp
        appearance={{
          elements: {
            card: "shadow-lg rounded-xl", // Size control
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;
