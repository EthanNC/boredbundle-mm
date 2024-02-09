"use node";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { ulid } from "ulid";

export const createGame = action({
  args: { body: v.string() },
  handler: async (ctx, { body }) => {
    const gameId = ulid().slice(-5);
    await ctx.runMutation(internal.myFunctions.createGame, {
      body: body,
      gameId: gameId,
    });
    return gameId;
  },
});

export const createUser = action({
  args: { name: v.string(), gameId: v.string(), image: v.string() },
  handler: async (ctx, { name, gameId, image }) => {
    const userId = ulid();
    await ctx.runMutation(internal.myFunctions.createUser, {
      name: name,
      gameId: gameId,
      userId: userId,
      image: image,
    });
    return userId;
  },
});

export const setGameStage = action({
  args: { gameId: v.string(), stage: v.string() },
  handler: async (ctx, { gameId, stage }) => {
    
    await ctx.runMutation(internal.myFunctions.updateGameStage, {      
      gameId: gameId,
      stage: stage
    });
    return gameId;
  },
});