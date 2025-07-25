import { CardContent } from "@/components/ui/card";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const QuizResult = ({ result, hideStartNew = false, onStartNew }) => {
  if (!result) {
    return null;
  }
  return (
    <>
      <div className=" h-full space-y-4 overflow-y-scroll scrollbar-hide overflow-hidden">
        <div className="flex space-x-4">
          <Trophy className="text-yellow-600 h-8 w-8" />
          <h2 className="text-4xl font-extrabold mb-4 -translate-y-1 gradient-title gradient">
            Quiz Results!
          </h2>
        </div>

        <CardContent>
          {/* score overview */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">
              Your Score : {result.quizScore.toFixed(1)} / 100
            </h1>
            <Progress value={result.quizScore} />
          </div>

          {/* improvement tip */}
          {result.improvementTip && (
            <div className="bg-muted rounded-lg p-4 my-4">
              <h1 className="font-medium">Improvement Tip</h1>
              <p className="text-muted-foreground">{result.improvementTip}</p>
            </div>
          )}

          <div className="space-y-4 ">
            <h3 className="font-medium text-3xl">Question Review</h3>
            {result.questions.map((question, index) => (
              <div key={index} className="space-y-4 border rounded-2xl p-2 ">
                <div className="flex justify-between">
                  <h4 className="font-bold">
                    Que {index + 1} : {question.question}
                  </h4>
                  <div>
                    {question.isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 mt-2 sm:mt-0 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 mt-2 sm:mt-0 text-red-600" />
                    )}
                  </div>
                </div>

                <div>
                  <p className="font-medium">
                    Your Answer : {question.userAnswer}
                  </p>
                  {!question.isCorrect && (
                    <p className="font-medium">
                      Correct Answer : {question.answer}
                    </p>
                  )}
                </div>

                <div className="space-y-2 bg-muted rounded p-2">
                  <p className="font-medium">Explanation :</p>
                  <p>{question.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
      <div className="px-4 w-full">
        {!hideStartNew && (
          <Button className="btn btn-primary w-full  mt-4" onClick={onStartNew}>
            Start New Quiz
          </Button>
        )}
      </div>
    </>
  );
};

export default QuizResult;
