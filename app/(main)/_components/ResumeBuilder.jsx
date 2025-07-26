"use client";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Download,
  DownloadCloud,
  Edit,
  Eye,
  Loader2,
  Save,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { resumeSchema } from "@/app/lib/schema";
import { Textarea } from "@/components/ui/textarea";
import EntryForm from "./EntryForm";
import MDEditor from "@uiw/react-md-editor";
import { entriesToMarkdown } from "@/app/lib/helper";
import { useUser } from "@clerk/nextjs";
import useFetch from "@/hooks/use-fetch";
import { getResume, saveResume } from "@/actions/resume";
import { toast } from "sonner";
import { format } from "date-fns";

function formatUpdatedAt(date) {
  return `Last Updated at ${format(
    new Date(date),
    "MMMM do, yyyy 'at' hh:mm a"
  )}`;
}

const handleExportPDF = async () => {
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.getElementById("pdf-content");
  if (!element) return;

  html2pdf().from(element).save();
};

const ResumeBuilder = ({ initialContent }) => {
  const [updatedAt, setUpdatedAt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("edit");
  const [resumeMode, setResumeMode] = useState("preview");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const [isGenerating, setIsGenerating] = useState(false);

  const { user } = useUser();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {
        email: "", // ✅ Must have these for register to work
        mobile: "",
        linkedin: "",
        twitter: "",
      },
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const formValues = watch();

  // useEffect(() => {
  //   if (initialContent) setActiveTab("preview");
  // }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (activeTab === "edit" && resumeMode === "preview") {
      const timeout = setTimeout(() => {
        const newContent = getCombinedContent();
        setPreviewContent(newContent || "");
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [formValues, activeTab, resumeMode]);

  useEffect(() => {
    const fetchAndPrefill = async () => {
      setIsLoading(true);
      try {
        const data = await getResume();
        console.log("Fetched data:", data); // Debug log

        if (data) {
          const formData = {
            contactInfo: {
              email: data.contactInfo?.email || "",
              mobile: data.contactInfo?.mobile || "",
              linkedin: data.contactInfo?.linkedin || "",
              twitter: data.contactInfo?.twitter || "",
            },
            summary: data.summary || "",
            skills: data.skills || "",
            education: data.education || [],
            experience: data.experience || [],
            projects: data.projects || [],
          };

          console.log("Resetting form with:", formData); // Debug log
          reset(formData);

          if (data.updatedAt) {
            setUpdatedAt(data.updatedAt);
          }
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndPrefill();
  }, [reset]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Returns a single string containing the combined content of the resume
   * from the form values, with each section separated by two newlines.
   *
   * @returns {string} The combined content of the resume
   */
  /*******  97ec971f-5424-4fbb-85e8-899d4f7fc27a  *******/
  const getCombinedContent = () => {
    const { summary, skills, education, experience, projects } = formValues;

    const sections = [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(experience, "Experience"),
      entriesToMarkdown(projects, "Projects"),
    ];

    // Filter out falsy values and join into a single string
    return sections.filter(Boolean).join("\n\n");
  };

  // Helper function - same for all options
  const formatContentForPDF = (markdownContent) => {
    if (!markdownContent) return "<p>No content available</p>";

    return markdownContent
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(
        /<div align="center">([^<]+)<\/div>/g,
        '<div class="center">$1</div>'
      )
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>")
      .split("</p><p>")
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("")
      .replace(/<p><\/p>/g, "")
      .replace(/<p><h/g, "<h")
      .replace(/h><\/p>/g, "h>");
  };

  // Alternative Simpler Version - Using browser's native PDF save
  const generatePDF = () => {
    setIsGenerating(true);

    try {
      const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${user?.fullName || "User"}</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Times New Roman', serif;
              line-height: 1.6;
              color: #000;
              background: white;
              padding: 20mm;
              margin: 0;
            }
            h1 {
              text-align: center;
              font-size: 24px;
              margin-bottom: 20px;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            h2 { 
              font-size: 18px;
              border-bottom: 1px solid #666; 
              padding-bottom: 5px;
              margin-top: 25px;
              margin-bottom: 15px;
            }
            h3 {
              font-size: 16px;
              margin-top: 15px;
              margin-bottom: 10px;
            }
            p {
              margin-bottom: 10px;
              text-align: justify;
            }
            .center { text-align: center; }
            
            .pdf-instructions {
              position: fixed;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: #007bff;
              color: white;
              padding: 15px 25px;
              border-radius: 8px;
              font-size: 14px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.2);
              z-index: 1000;
              text-align: center;
            }
            
            @media print {
              .pdf-instructions { display: none; }
              body { margin: 0; padding: 15mm; }
              @page { margin: 15mm; size: A4; }
            }
          </style>
          <script>
            window.onload = function() {
              // Show instructions first
              setTimeout(() => {
                if(confirm('Ready to download PDF?\\n\\nClick OK to open print dialog.\\nThen select "Save as PDF" as destination.')) {
                  window.print();
                }
              }, 500);
            }
          </script>
        </head>
        <body>
          <div class="pdf-instructions">
            📄 To save as PDF: Press Ctrl+P → Select "Save as PDF" → Click Save
          </div>
          ${formatContentForPDF(previewContent)}
        </body>
      </html>
    `;

      // Create blob and open
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      // Open in new tab
      window.open(url, "_blank");

      // Cleanup
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setIsGenerating(false);
      }, 1000);
    } catch (error) {
      console.error("PDF generation error:", error);
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
      const updated = await getResume();
      if (updated?.updatedAt) setUpdatedAt(updated.updatedAt);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-title gradient">
            Resume Builder
          </h1>
          <p>{updatedAt ? formatUpdatedAt(updatedAt) : "Not saved yet"}</p>
        </div>

        <div className="flex space-x-4">
          <Button
            variant="destructive"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>

          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="edit" className="w-full">
        <TabsList>
          <TabsTrigger onClick={() => setActiveTab("edit")} value="edit">
            Form
          </TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab("preview")} value="preview">
            Markdown
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <div className="w-full space-y-4 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 w-full ">
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
        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}

          <div className="border rounded-lg ">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
