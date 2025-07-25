"use client";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { resumeSchema } from "@/app/lib/schema";
import { Textarea } from "@/components/ui/textarea";
import EntryForm from "./EntryForm";

const ResumeBuilder = ({ initialContent }) => {
  const [activeTab, setActiveTab] = useState("edit");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-bold gradient-title gradient">
          Resume Builder
        </h1>
        <div className="flex space-x-4">
          <Button variant={"destructive"}>
            <span>
              <Save className="h-4 w-4" />
            </span>
            Save
          </Button>
          <Button>
            <span>
              <DownloadCloud className="h-4 w-4" />
            </span>
            Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <div className="w-full space-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 w-full">
                <h1 className="font-bold text-2xl">Contact Information</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full  space-y-4 bg-muted rounded-lg">
                  <div className="space-y-4 p-4">
                    <label className="text-sm font-bold">Email</label>
                    <Input
                      {...register("contactInfo.email")}
                      type="email"
                      placeholder="example@email.com"
                      errors={errors.contactInfo?.email}
                      className="mt-2"
                    />

                    {errors.contactInfo?.email && (
                      <p className="text-red-500">
                        {errors.contactInfo.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 p-4">
                    <label className="text-sm font-bold">Mobile Number</label>
                    <Input
                      {...register("contactInfo.mobile")}
                      type="mobile"
                      placeholder="+91 9923456XXX"
                      errors={errors.contactInfo?.mobile}
                      className="mt-2"
                    />

                    {errors.contactInfo?.mobile && (
                      <p className="text-red-500">
                        {errors.contactInfo.mobile.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-4 p-4">
                    <label className="text-sm font-bold">Linkedin URL</label>
                    <Input
                      {...register("contactInfo.linkedin")}
                      type="linkedin"
                      placeholder="https://linkedin.com/in/john-doe"
                      errors={errors.contactInfo?.linkedin}
                      className="mt-2"
                    />

                    {errors.contactInfo?.linkedin && (
                      <p className="text-red-500">
                        {errors.contactInfo.linkedin.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-4 p-4">
                    <label className="text-sm font-bold">
                      Twitter/X Profile
                    </label>
                    <Input
                      {...register("contactInfo.twitter")}
                      type="twitter"
                      placeholder="https://x.com/johndoe"
                      errors={errors.contactInfo?.twitter}
                      className="mt-2"
                    />

                    {errors.contactInfo?.twitter && (
                      <p className="text-red-500">
                        {errors.contactInfo.twitter.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <div className="space-y-4 w-full">
              <h1 className="font-bold text-2xl">Professional Summary</h1>
              <div className="w-full  space-y-4">
                <Textarea
                  {...register("summary")}
                  type="summary"
                  placeholder="Write your Professional Summary..."
                  errors={errors.summary}
                  className="mt-2 h-[200px] resize-none"
                />
              </div>
            </div>

            <div>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4 w-full">
                    <h1 className="font-bold text-2xl">Skills</h1>
                    <div className="w-full  space-y-4">
                      <Textarea
                        {...field}
                        type="skills"
                        placeholder="Write your Skills..."
                        errors={errors.skills}
                        className="mt-2 h-[200px] resize-none"
                      />
                    </div>
                  </div>
                )}
              />
              {errors.skills && (
                <p className="text-red-500">{errors.skills.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4 w-full">
                    <h1 className="font-bold text-2xl">Work Experience</h1>
                    <div className="w-full  space-y-4">
                      <EntryForm
                        type="experience"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </div>
                )}
              />
              {errors.experience && (
                <p className="text-red-500">{errors.experience.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4 w-full">
                    <h1 className="font-bold text-2xl">Education</h1>
                    <div className="w-full  space-y-4">
                      <EntryForm
                        type="education"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </div>
                )}
              />
              {errors.education && (
                <p className="text-red-500">{errors.education.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <div className="space-y-4 w-full">
                    <h1 className="font-bold text-2xl">Projects</h1>
                    <div className="w-full  space-y-4">
                      <EntryForm
                        type="projects"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </div>
                )}
              />
              {errors.projects && (
                <p className="text-red-500">{errors.projects.message}</p>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
