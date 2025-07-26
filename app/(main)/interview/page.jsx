import React from "react";
import OnboardingForm from "../_components/onboardingForm";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import StatsCards from "../_components/StatsCards";
import { getAssessments } from "@/actions/interview";
import PerformanceChart from "../_components/PerformanceChart";
import QuizList from "../_components/QuizList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GraduationCapIcon } from "lucide-react";

const InterviewPage = async () => {
  // check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const assessments = await getAssessments();

  return (
    <div className="space-y-4  w-full md:px-4 mb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold gradient-title gradient">
          Interview Prepration
        </h1>
        <Button asChild>
          <Link href="/interview/mock">
            <GraduationCapIcon className="mr-2 h-4 w-4" /> Start New Mock
          </Link>
        </Button>
      </div>

      <div className="space-y-4 ">
        {assessments.length === 0 ? (
          <div className="space-y-4 flex justify-between">
            <p className="text-muted-foreground">
              You have not taken any assessments yet. Let&apos;s get started!
            </p>
          </div>
        ) : (
          <>
            <StatsCards assessments={assessments} />
            <PerformanceChart assessments={assessments} />
            <QuizList assessments={assessments} />
          </>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
