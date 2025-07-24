import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "../_components/DashboardView";

const IndustryInsightsPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  const insights = await getIndustryInsights();
  console.log("insights from IndustryInsightsPage", insights);

  if (!isOnboarded) {
    redirect("/onboarding");
  }
  return (
    <div className="container mx-auto h-full">
      <DashboardView insights={insights} />
    </div>
  );
};

export default IndustryInsightsPage;
