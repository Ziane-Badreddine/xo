import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getGame = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.gameId);
  },
});

export const joinCreateGame = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) throw new Error("User not found");

    const game = await ctx.db
      .query("games")
      .withIndex("by_status", (q) => q.eq("status", "waiting"))
      .take(1);

    if (game.length > 0 && game[0].player1 !== user._id) {
      await ctx.db.patch(game[0]._id, {
        player2: user._id,
        status: "in_progress",
      });
      return game[0]._id;
    }

    return await ctx.db.insert("games", {
      board: Array(9).fill(""),
      player1: user._id,
      status: "waiting",
      turn: "X",
    });
  },
});




export const gameLink = mutation({
  args: {
    gameId: v.id("games"),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) {
      throw new ConvexError("Game not found.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found.");
    }

    // Si c'est le créateur du jeu
    if (game.player1 === user._id) {
      return game._id;
    }

    // Si la partie est déjà pleine ou terminée
    if (game.player2 || game.status !== "waiting" || game.winner) {
      throw new ConvexError("Game is not joinable.");
    }

    // Sinon, on rejoint la partie
    await ctx.db.patch(game._id, {
      player2: user._id,
      status: "in_progress",
    });

    return game._id;
  },
});
