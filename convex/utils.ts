import { ConvexError } from "convex/values";
import { DatabaseReader } from "./_generated/server";

export async function requireUserByClerkId(
  db: DatabaseReader,
  clerkId: string
) {
  const user = await db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .unique();

  if (!user) {
    throw new ConvexError(`No user found with clerkId: ${clerkId}`);
  }

  return user;
}