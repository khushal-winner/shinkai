"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import QuizResult from "./QuizResult";

const QuizList = ({ assessments }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const router = useRouter();
  return (
    <div>
      <div className="h-full">
        <Card>
          <CardHeader className="container mx-auto ">
            <CardTitle className="mx-auto text-xl font-bold gradient-title gradient">
              Recent Quizzes
            </CardTitle>
            <CardDescription className="mx-auto text-muted-foreground">
              Review your most recent quizzes performace
            </CardDescription>
            <Button className="mx-auto mt-2">Start New Quiz</Button>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {assessments.map((assessment, index) => (
              <Card
                onClick={() => setSelectedQuiz(assessment)}
                key={index}
                className="h-full"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold gradient-title gradient">
                    Quiz {index + 1}
                  </CardTitle>

                  <CardDescription className="text-muted-foreground">
                    Score: {assessment.quizScore.toFixed(1)}%
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between items-center w-full">
                  <p className="text-muted-foreground">
                    {assessment.improvementTip}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Dialog
          open={!!selectedQuiz}
          onOpenChange={(open) => setSelectedQuiz(null)}
        >
          <DialogContent className="max-h-[60vh] w-[80vw] md:max-h-[90vh] overflow-y-scroll scrollbar-hide">
            <DialogHeader>
              <DialogDescription>
                <QuizResult
                  result={selectedQuiz}
                  onStartNew={() => router.push("/interview/mock")}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default QuizList;
