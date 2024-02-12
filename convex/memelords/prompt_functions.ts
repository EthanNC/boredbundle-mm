import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const addPrompt = mutation({
  args: {
    gameId: v.string(),
    userId: v.string(),
    stageNum: v.number(),
    prompt: v.string(),
  },
  handler: async (ctx, { gameId, userId, stageNum, prompt }) => {
    const game = await ctx.db
      .query("games")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", gameId))
      .unique();

    const promptObj = {
      userId,
      text: prompt,
    };
    const gameData = game?.game_data ? game?.game_data : {};
    const promptArr = gameData?.prompts ? gameData.prompts : [];
    while (stageNum > promptArr.length) {
      promptArr.push([]);
    }
    promptArr[stageNum - 1].push(promptObj);
    gameData.prompts = promptArr;
    if (game) {
      return await ctx.db.patch(game._id, { game_data: gameData });
    }
  },
});
