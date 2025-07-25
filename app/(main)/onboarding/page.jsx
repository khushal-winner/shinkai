export const dynamic = "force-dynamic";
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
      <div className="space-y-2 mb-4 containter px-4">
        <h1 className="text-5xl font-bold gradient-title gradient">
          Onboarding Form
        </h1>
        <p className="text-muted-foreground">
          Please tell us about your professional background and what drives you.
        </p>
      </div>

      <OnboardingForm industries={industries} />
    </div>
  );
};

export default OnboardingPage;
