import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const create = internalMutation({
  args: { body: v.string(), gameId: v.string() },
  handler: async (ctx, { body, gameId }) => {
    return await ctx.db.insert("games", {
      body,
      users: [],
      tokenIdentifier: gameId,
    });
  },
});
