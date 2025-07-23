"use server";

import { MarketOutlook } from "@/lib/generated/prisma/client";
import { DemandLevel } from "@/lib/generated/prisma/client";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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
              salaryRanges: [], // default values
              growthRate: 0, // default values
              demandLevel: DemandLevel.MEDIUM, // default values
              topSkills: [], // default values
              marketOutlook: MarketOutlook.NEUTRAL, // default values
              keyTrends: [], // default values
              recommendedSkills: [], // default values
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
    throw new Error("Failed to Update Profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");
  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });
    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.log("Error in getUserOnboardingStatus", error.message);
    throw new Error("Failed to Get User Onboarding Status");
  }
}
