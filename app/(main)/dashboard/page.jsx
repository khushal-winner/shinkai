import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboardView from "../_components/DashboardView";

const IndustryInsightsPage = async () => {
  try {
    // Check onboarding status first
    const { isOnboarded } = await getUserOnboardingStatus();

    if (!isOnboarded) {
      redirect("/onboarding");
      return null; // Explicit return after redirect
    }

    // Get insights only if user is onboarded
    const insights = await getIndustryInsights();
    console.log("insights from IndustryInsightsPage", insights);

    // Ensure insights exist before rendering
    if (!insights) {
      return (
        <div className="container mx-auto h-full">
          <div className="text-center mt-8">
            <p>No insights available at the moment.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto h-full">
        <DashboardView insights={insights} />
      </div>
    );
  } catch (error) {
    console.error("Error in IndustryInsightsPage:", error);
    {
      redirect("/onboarding");
    }
    return (
      <div className="container mx-auto h-full">
        <div className="text-center mt-8">
          <p>Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default IndustryInsightsPage;
