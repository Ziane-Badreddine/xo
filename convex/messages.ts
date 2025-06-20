import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireUserByClerkId } from "./utils";

export const getMessages = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_game", (q) => q.eq("game", args.gameId))
      .order("asc")
      .collect();

    const messagesWithPlayer = await Promise.all(
      messages.map(async (message) => {
        const player = await ctx.db.get(message.player);
        return { ...message, player };
      })
    );

    return messagesWithPlayer;
  },
});

export const sendMessage = mutation({
  args: { gameId: v.id("games"), clerkId: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    if (args.content.trim() === "") {
      throw new ConvexError("Message content cannot be empty.");
    }
    const user = await requireUserByClerkId(ctx.db, args.clerkId);
    if (!user) throw new ConvexError("User not found");

    const game = await ctx.db.get(args.gameId);
    if (!game) throw new ConvexError("game not found");

    return await ctx.db.insert("messages", {
      game: game._id,
      player: user._id,
      content: args.content,
    });
  },
});
