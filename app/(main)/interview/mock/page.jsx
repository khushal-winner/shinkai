import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../../_components/Quiz";

const MockInterviewPage = () => {
  return (
    <div className="space-y-4 mt-4">
      <div>
        <Link href="/interview">
          <Button variant={"link"} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Prepration
          </Button>
        </Link>

        <div>
          <h1 className="text-4xl font-bold gradient-title gradient">
            Mock Interview
          </h1>
          <p className="text-muted-foreground">
            Test yor knowledge with industry-specific questions
          </p>
        </div>
      </div>

      <Quiz />
    </div>
  );
};

export default MockInterviewPage;
