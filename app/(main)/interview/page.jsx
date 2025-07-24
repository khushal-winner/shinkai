import React from "react";
import OnboardingForm from "../_components/onboardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";

const InterviewPage = async () => {
  // check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return <div className="w-full ">InterviewPage</div>;
};

export default InterviewPage;
