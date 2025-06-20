import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    clerkId: v.string(),
    elo: v.number(),
    winCount: v.number(),
    lossCount: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),

  games: defineTable({
    player1: v.id("users"),
    player2: v.optional(v.id("users")),
    board: v.array(v.union(v.literal("X"), v.literal("O"), v.literal(""))),
    status: v.union(
      v.literal("waiting"),
      v.literal("in_progress"),
      v.literal("finished")
    ),
    turn: v.union(v.literal("X"), v.literal("O")),
    winner: v.optional(
      v.union(v.literal("X"), v.literal("O"), v.literal("draw"))
    ),
  })
    .index("by_player1", ["player1"])
    .index("by_player2", ["player2"])
    .index("by_status", ["status"]),

  messages: defineTable({
    game: v.id("games"),
    player: v.id("users"),
    content: v.string(),
  }).index("by_game", ["game"]),
});
