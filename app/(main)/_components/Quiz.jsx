"use client";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import QuizResult from "./QuizResult";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);
  const {
    loading: savingResult,
    fn: savingResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  console.log("quizData", resultData);
  useEffect(() => {
    if (quizData) {
      setAnswer(new Array(quizData.length).fill(null));
      setCurrentQuestion(0);
      setShowExplanation(false);
    }
  }, [quizData]);

  const handleAnswer = (selectedValue) => {
    setAnswer((prevAnswer) => {
      const newAnswer = [...prevAnswer];
      newAnswer[currentQuestion] = selectedValue;
      return newAnswer;
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await savingResultFn(quizData, answer, score);
      toast.success("Quiz Completed!");
    } catch (error) {
      console.error("Error saving quiz result:", error);
      toast.error(error.message || "Error saving quiz result");
    }
  };

  const calculateScore = () => {
    let score = 0;
    answer.forEach((userAnswer, index) => {
      if (userAnswer === quizData[index].correctAnswer) {
        score += 1;
      }
    });
    return (score / quizData.length) * 100;
  };

  const startNewQuiz = () => {
    setResultData(null); // clear previous result
    generateQuizFn(); // generate a new quiz
  };

  // show result if quiz is completed
  if (resultData) {
    return (
      <div className=" h-screen">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  if (generatingQuiz) {
    return <BarLoader color="gray" width={"100%"} className="mx-auto mt-4" />;
  }
  if (!quizData)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  const question = quizData[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-2 font-medium">{question.question}</p>
        <RadioGroup
          className="space-y-2"
          value={answer[currentQuestion]}
          onValueChange={handleAnswer}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </RadioGroup>
        {showExplanation && (
          <div className="bg-muted/50 p-4 mt-4 rounded-lg">
            <p>Explanation: </p>
            <p className="mt-4 text-muted-foreground">
              {quizData[currentQuestion].explanation}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setShowExplanation((prev) => !prev)}
          disabled={!answer[currentQuestion]}
        >
          {showExplanation ? "Hide Explanation" : "Show Explanation"}
        </Button>

        <Button
          disabled={!answer[currentQuestion] || savingResult}
          className="ml-auto"
          onClick={handleNext}
        >
          {currentQuestion < quizData.length - 1 ? (
            "Next Question"
          ) : savingResult ? (
            <>
              <Loader2 className=" h-4 w-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            "Finish Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
