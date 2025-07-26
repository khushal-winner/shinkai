"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import useFetch from "@/hooks/use-fetch";
import { getCoverLetter } from "@/actions/coverLetter";
import MDEditor from "@uiw/react-md-editor";
import { BarLoader } from "react-spinners";

const CoverLetter = () => {
  const [content, setContent] = useState("");
  const params = useParams(); // { id: 'some-id' }
  const id = params?.id;

  console.log("Client-side ID:", id);

  // Use useFetch to fetch cover letter by id
  const {
    data: coverLetter,
    loading: isFetching,
    error,
    fn: fetchCoverLetter,
  } = useFetch(getCoverLetter);

  useEffect(() => {
    if (id) fetchCoverLetter(id); // call on mount
  }, [id]);

  useEffect(() => {
    if (coverLetter?.content) {
      setContent(coverLetter.content);
    }
  }, [coverLetter]);

  return (
    <div className="h-full w-full space-y-4">
      {isFetching ? (
        <div className="mt-4">
          <h1 className="text-4xl md:text-6xl font-bold gradient-title gradient">
            Generating...
          </h1>
          <BarLoader color="gray" width={"100%"} className="mx-auto mt-4" />
        </div>
      ) : (
        <>
          <div>
            <Button asChild variant={"link"}>
              <Link href="/ai-cover-letter">
                <span>
                  <ArrowLeft className="h-4 w-4" />
                </span>
                Back to Cover Letters
              </Link>
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold gradient-title gradient">
              {coverLetter?.jobTitle} at {coverLetter?.companyName}
            </h1>
          </div>
          {/* markdown editor here */}
          <div className="border rounded-lg">
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || "")}
              height={800}
              preview="edit"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CoverLetter;
