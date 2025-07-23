import React from "react";
import OnboardingForm from "../_components/onboardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";

const OnboardingPage = async () => {
  // check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full ">
      <OnboardingForm industries={industries} />
    </div>
  );
};

export default OnboardingPage;
