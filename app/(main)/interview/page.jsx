import React from "react";
import OnboardingForm from "../_components/onboardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import StatsCards from "../_components/StatsCards";
import { getAssessments } from "@/actions/interview";
import PerformanceChart from "../_components/PerformanceChart";
import QuizList from "../_components/QuizList";

const InterviewPage = async () => {
  // check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const assessments = await getAssessments();

  return (
    <div className="space-y-4  w-full px-4 mb-12">
      <h1 className="text-5xl font-bold gradient-title gradient">
        Interview Prepration
      </h1>

      <div className="space-y-4 ">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
};

export default InterviewPage;
