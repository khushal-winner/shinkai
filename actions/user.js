"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    console.log("AI check started");
    const insights = await generateAIInsights(data.industry);
    console.log("AI insights", insights);
    const result = await db.$transaction(
      async (tx) => {
        // find if the industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // if industry not exist create it with default values - will replace with ai later
        if (!industryInsight) {
          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdatedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            },
          });
        }
        // update user with industry and values
        const updatedUser = await tx.user.update({
          where: {
            clerkUserId: userId,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return {
          updatedUser,
          industryInsight,
        };
      },
      {
        timeout: 10000, // default is 5 seconds
      }
    );
  } catch (error) {
    console.log("Error in updateUser", error.message);
    throw new Error("Failed to Update Profile", { cause: error.message });
  }
}

export async function getUserOnboardingStatus() {
  try {
    // Retry to get Clerk userId (max 5 times)
    let retries = 5;
    let userId = null;

    while (retries > 0) {
      const authResult = await auth();
      if (authResult?.userId) {
        userId = authResult.userId;
        break;
      }

      await new Promise((res) => setTimeout(res, 1000));
      retries--;
    }

    if (!userId) throw new Error("Unauthorized");

    // Retry to get user from DB (max 5 times)
    retries = 5;
    let user = null;

    while (retries > 0) {
      user = await db.user.findUnique({
        where: { clerkUserId: userId },
      });

      if (user) break;

      await new Promise((res) => setTimeout(res, 1000));
      retries--;
    }

    if (!user) throw new Error("User not found");

    // Finally, check if user is onboarded
    const onboardedStatus = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    return {
      isOnboarded: !!onboardedStatus?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}
