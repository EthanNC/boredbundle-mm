"use node";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { ulid } from "ulid";

export const createGame = action({
  args: { body: v.string() },
  handler: async (ctx, { body }) => {
    const gameId = ulid().slice(-5);
    await ctx.runMutation(internal.myFunctions.create, {
      body: body,
      gameId: gameId,
    });
    return gameId;
  },
});
