import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createGame = internalMutation({
  args: { body: v.string(), gameId: v.string() },
  handler: async (ctx, { body, gameId }) => {
    return await ctx.db.insert("games", {
      body,
      users: [],
      tokenIdentifier: gameId,
      started: false,
    });
  },
});

export const createUser = internalMutation({
  args: {
    name: v.string(),
    gameId: v.string(),
    userId: v.string(),
    image: v.string(),
  },
  handler: async (ctx, { name, gameId, userId, image }) => {
    const game = await ctx.db
      .query("games")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", gameId))
      .unique();

    const user = {
      id: userId,
      name,
      image,
    };

    if (game) {
      const updatedUserList = game.users ? [...game.users, user] : [user];
      await ctx.db.patch(game._id, { users: updatedUserList });
    }
    return user;
  },
});

export const sendGifMessage = internalMutation({
  args: { body: v.string(), gameId: v.id("games") },
  handler: async (ctx, { body, gameId }) => {
    return await ctx.db.patch(gameId, { body: body });
  },
});
