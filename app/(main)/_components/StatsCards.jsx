"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartPie } from "lucide-react";
import React from "react";

const StatsCards = ({ assessments }) => {
  const getAverageScore = () => {
    if (!assessments.length) return 0;
    const totalScore = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );

    return (totalScore / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      <div className="h-full">
        <Card className="flex flex-col justify-between h-full">
          <CardHeader className="flex justify-between items-center w-full">
            <CardTitle className="flex w-full text-xl font-bold gradient-title gradient">
              Average Score
            </CardTitle>
            <ChartPie className={`h-6 w-6 -translate-y-1.5 `} />
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{getAverageScore()}%</h1>
              <p className="text-muted-foreground">Across all assessments</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-full">
        <Card className="flex flex-col justify-between h-full">
          <CardHeader className="flex justify-between items-center w-full">
            <CardTitle className="flex w-full text-xl font-bold gradient-title gradient">
              Question Practiced
            </CardTitle>
            <ChartPie className={`h-6 w-6 -translate-y-1.5 `} />
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{getTotalQuestions()}</h1>
              <p className="text-muted-foreground">TotalQuestions</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="h-full">
        <Card className="flex flex-col justify-between h-full">
          <CardHeader className="flex justify-between items-center w-full">
            <CardTitle className="flex w-full text-xl font-bold gradient-title gradient">
              Latest Score
            </CardTitle>
            <ChartPie className={`h-6 w-6 -translate-y-1.5 `} />
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div>
              <h1 className="text-2xl font-bold">
                {getLatestAssessment().quizScore}%
              </h1>
              <p className="text-muted-foreground">Most Recent Quiz</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsCards;
