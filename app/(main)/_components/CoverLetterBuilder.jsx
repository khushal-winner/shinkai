"use client";
import { generateCoverLetter } from "@/actions/coverLetter";
import { coverLetterSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

const CoverLetterBuilder = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobDescription: "",
    },
  });

  // Wrap the API call using useFetch
  const {
    fn: submitCoverLetter,
    loading: isSaving,
    error,
  } = useFetch(async (values) => {
    const result = await generateCoverLetter(values);

    toast.success("Cover letter saved successfully!");
    console.log("Cover letter saved successfully!", result.id);

    if (result?.id) {
      router.push(`/ai-cover-letter/${result.id}`);
    } else {
      toast.error("Failed to generate cover letter.");
    }

    return result;
  });

  const onSubmit = (values) => {
    submitCoverLetter(values);
  };

  return (
    <div className="h-full w-full space-y-4">
      <div>
        <Button asChild variant={"link"}>
          <Link href="/ai-cover-letter">
            <span>
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to Cover Letters
          </Link>
        </Button>
        <h1 className="text-6xl font-bold gradient-title gradient">
          Create Cover Letter
        </h1>
        <p className="text-muted-foreground">
          Generate a Tailored Cover Letter for Your Next Job Application
        </p>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-2">
            <h1 className="text-lg font-bold">Job Details</h1>
            <p className="text-muted-foreground">
              Provide information about the position you are applying for
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-4 p-4">
                <label className="text-sm font-bold">Company Name</label>
                <Input
                  {...register("companyName")}
                  type="text"
                  placeholder="e.g. Google"
                  className="mt-2"
                />

                {errors.companyName && (
                  <p className="text-red-500">{errors.companyName.message}</p>
                )}
              </div>
              <div className="space-y-4 p-4">
                <label className="text-sm font-bold">Job Title</label>
                <Input
                  {...register("jobTitle")}
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  errors={errors.jobTitle}
                  className="mt-2"
                />

                {errors.jobTitle && (
                  <p className="text-red-500">{errors.jobTitle.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 w-full px-4">
              <h1 className="text-sm font-bold">Job Description</h1>
              <div className="w-full  space-y-4">
                <Textarea
                  {...register("jobDescription")}
                  placeholder="Paste the job description here..."
                  errors={errors.jobDescription}
                  className="mt-2 h-[200px] resize-none"
                />
              </div>

              {errors.jobDescription && (
                <p className="text-red-500">{errors.jobDescription.message}</p>
              )}
            </div>
            <div className="flex justify-end px-2">
              <Button disabled={isSaving} type="submit">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
