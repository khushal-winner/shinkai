"use client";
import { deleteCoverLetter, getCoverLetters } from "@/actions/coverLetter";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Delete,
  DeleteIcon,
  Eye,
  Loader2,
  PlusCircle,
  Trash,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function formatCreatedAt(date) {
  return `Created ${format(new Date(date), "MMMM do, yyyy")}`;
}

const CoverLetterList = () => {
  const [deletingId, setDeletingId] = useState(null);
  const [redirectingId, setRedirectingId] = useState(null);
  const [redirectingNew, setRedirectingNew] = useState(false);
  const router = useRouter();
  const {
    data: coverLetters,
    loading: isFetching,
    error,
    fn: fetchCoverLetters,
  } = useFetch(getCoverLetters);

  useEffect(() => {
    fetchCoverLetters();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteCoverLetter(id);
      await fetchCoverLetters();
    } catch (error) {
      console.log("Error in handleDelete", error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="h-full w-full space-y-4">
      <div className="w-full space-y-4 flex justify-between items-center">
        <h1 className="text-6xl font-bold gradient-title gradient">
          My Cover Letters
        </h1>
        <div>
          <Button
            onClick={() => {
              setRedirectingNew(true);
              router.push("/ai-cover-letter/new");
            }}
          >
            {redirectingNew ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Redirecting...
              </>
            ) : (
              <>
                <PlusCircle className="h-6 w-6 mr-2" />
                Create New
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="w-full space-y-4 ">
        {isFetching ? (
          <div className="mt-4">
            <BarLoader color="gray" width={"100%"} className="mx-auto mt-4" />
          </div>
        ) : (
          Array.isArray(coverLetters) &&
          coverLetters.length > 0 &&
          coverLetters.map((coverLetter) => (
            <div
              key={coverLetter.id}
              className="w-full space-y-2 rounded-xl border p-4"
            >
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">
                  {coverLetter.jobTitle} at {coverLetter.companyName}
                </h1>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRedirectingId(coverLetter.id);
                      router.push(`/ai-cover-letter/${coverLetter.id}`);
                    }}
                  >
                    {redirectingId === coverLetter.id ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </Button>

                  <Button
                    onClick={() => handleDelete(coverLetter.id)}
                    variant="outline"
                  >
                    {deletingId === coverLetter.id ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Trash2 className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCreatedAt(coverLetter.createdAt)}
              </p>
              <p className="text-muted-foreground">
                {coverLetter.jobDescription}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoverLetterList;
