"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function saveCoverLetter() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");

  try {
  } catch (error) {
    console.log("Error in saveCoverLetter", error.message);
    throw new Error("Failed to Save Cover Letter");
  }
}

export async function getCoverLetter() {}
