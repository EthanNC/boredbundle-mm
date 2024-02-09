"use node";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { action } from "../_generated/server";

export const addPrompt = action({
    args: {
        gameId: v.string(),
        userId: v.string(),
        stageNum: v.number(),
        prompt: v.string()
      },
      handler: async (ctx, { gameId, userId, stageNum, prompt})  => {
    
        await ctx.runMutation(internal.memelords.prompt_functions.addPrompt, {      
          gameId, userId, stageNum, prompt
        });
        return gameId;
      },
    });
