import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const leaveGame = mutation({
  args: { gameId: v.string(), userId: v.string() },
  handler: async (ctx, { gameId, userId }) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("tokenIdentifier"), gameId))
      .unique();

    if (game) {
      const updatedUserList = game.users?.filter((user) => user.id !== userId);
      await ctx.db.patch(game._id, { users: updatedUserList });
    }
  },
});

export const startGame = mutation({
  args: { gameId: v.string() },
  handler: async (ctx, { gameId }) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("tokenIdentifier"), gameId))
      .unique();

    if (game) {
      await ctx.db.patch(game._id, { started: true });
    }
  },
});
