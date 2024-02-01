import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: { name: v.string(), gameId: v.string() },
  handler: async (ctx, { name, gameId }) => {
    //create user
    const user = await ctx.db.insert("users", {
      name,
      tokenIdentifier: gameId,
    });

    //fetch gameDetails
    const game = await ctx.db
      .query("games")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", gameId))
      .unique();

    if (game) {
      //update game with user
      const updatedUserList = game.users ? [...game.users, user] : [user];
      await ctx.db.patch(game._id, { users: updatedUserList });
    }
    return user;
  },
});
