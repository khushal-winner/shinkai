"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${
    data.companyName
  }.
    
    About the candidate:
    - Industry: ${user.industry}
    - Years of Experience: ${user.experience}
    - Skills: ${user.skills?.join(", ")}
    - Professional Background: ${user.bio}
    
    Job Description:
    ${data.jobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;

  // here we write generating covetter code in try and catch
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const content = response.text(); // <- this gives the markdown output

    const newCoverLetter = await db.coverLetter.create({
      data: {
        userId: user.id,
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        jobDescription: data.jobDescription,
        content,
      },
    });

    return newCoverLetter;
  } catch (error) {
    console.log("Error in generateCoverLetter", error.message);
    throw new Error("Failed to generateCoverLetter");
  }
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  try {
    const coverLetter = await db.coverLetter.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
    return coverLetter;
  } catch (error) {
    console.log("Error in getCoverLetter", error.message);
    throw new Error("Failed to Get Cover Letter");
  }
}

export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  try {
    const coverLetters = await db.coverLetter.findMany({
      where: {
        userId: user.id,
      },
    });
    return coverLetters;
  } catch (error) {
    console.log("Error in getCoverLetters", error.message);
    throw new Error("Failed to Get Cover Letters");
  }
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  try {
    const coverLetter = await db.coverLetter.delete({
      where: {
        id,
        userId: user.id,
      },
    });
    return coverLetter;
  } catch (error) {
    console.log("Error in deleteCoverLetter", error.message);
    throw new Error("Failed to Delete Cover Letter");
  }
}
