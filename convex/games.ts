import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, { tokenIdentifier }) => {
    return await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
      .unique();
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("games").collect();
  },
});
