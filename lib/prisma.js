import { PrismaClient } from "./generated/prisma";

export const db = new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: Ye global variable ensure karta hai ki Prisma client ka instance
// development ke time baar-baar reload hone par reuse ho jaye. Agar ye na ho,
// to har baar application reload hone par Prisma ka naya instance banega,
// jo database connection issues create kar sakta hai.
