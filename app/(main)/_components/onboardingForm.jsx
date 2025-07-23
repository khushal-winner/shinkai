"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { onboardingSchema } from "@/app/lib/schema";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
    setData,
  } = useFetch(updateUser);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });
  const watchIndustry = watch("industry");

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("User updated successfully");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });

      console.log("Form submitted");
      toast.success("Form submitted successfully");

      console.log("Ye values jati hai as data", values);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Error submitting form");
      throw new Error("Failed to submit form");
    }
  };
  return (
    <div className="max-w-2xl mx-auto ">
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 w-full ">
              <div className="space-y-2 w-full ">
                <Label className="font-semibold" htmlFor="industry">
                  Industry
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("industry", value);
                    setSelectedIndustry(
                      industries.find((industry) => industry.id === value)
                    );
                    setValue("subIndustry", "");
                  }}
                >
                  <SelectTrigger id="industry" className="w-full">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem
                        className="flex justify-center"
                        key={industry.id}
                        value={industry.id}
                        onClick={() => setSelectedIndustry(industry)}
                      >
                        {industry.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <span className="text-red-500">
                    {errors.industry.message}
                  </span>
                )}
              </div>

              {watchIndustry && (
                <div className="space-y-2">
                  <Label className="font-semibold" htmlFor="subIndustry">
                    Sub Industry
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setValue("subIndustry", value);
                    }}
                  >
                    <SelectTrigger id="subIndustry" className="w-full">
                      <SelectValue placeholder="Select a sub industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedIndustry?.subIndustries.map((subIndustry) => {
                        return (
                          <SelectItem
                            className="flex justify-center"
                            key={subIndustry}
                            value={subIndustry}
                          >
                            {subIndustry}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.subIndustry && (
                    <span className="text-red-500">
                      {errors.subIndustry.message}
                    </span>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label className="font-semibold" htmlFor="experience">
                  Years of Experience
                </Label>
                <Input
                  type="number"
                  id="experience"
                  min="0"
                  max="50"
                  placeholder="Enter years of experience (0-50)"
                  {...register("experience")}
                />
                {errors.experience && (
                  <span className="text-red-500">
                    {errors.experience.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="font-semibold" htmlFor="skills">
                  Skills{"  "}
                  <span className="text-muted-foreground text-sm">
                    (Enter comma separated skills)
                  </span>
                </Label>

                <Input
                  id="skills"
                  placeholder="eg. HTML, CSS, JavaScript"
                  {...register("skills")}
                />

                {errors.skills && (
                  <span className="text-red-500">{errors.skills.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label className="font-semibold" htmlFor="bio">
                  Professional Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Enter your professional background"
                  className="h-32 resize-none"
                  {...register("bio")}
                />
                {errors.bio && (
                  <span className="text-red-500">{errors.bio.message}</span>
                )}
              </div>

              <Button
                className="w-full mt-2"
                type="submit"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
