"use node";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { action } from "../_generated/server";
import { tr } from "@faker-js/faker";

export const addPrompt = action({
  args: {
    gameId: v.string(),
    userId: v.string(),
    stageNum: v.number(),
    prompt: v.string(),
  },
  handler: async (ctx, { gameId, userId, stageNum, prompt }) => {
    await ctx.runMutation(internal.memelords.prompt_functions.addPrompt, {
      gameId,
      userId,
      stageNum,
      prompt,
    });
    return gameId;
  },
});

export const createMeme = action({
  args: {
    gameId: v.string(),
    userId: v.string(),
    promptIndex: v.number(),
    imgId: v.string(),
    text: v.array(v.string()),
  },
  handler: async (ctx, { gameId, userId, promptIndex, imgId, text }) => {
    const params: Record<string, string | number> = {
      template_id: imgId,
      username: process.env.IMGFLIP_USERNAME as string,
      password: process.env.IMGFLIP_PASSWORD as string,
      text0: text[0],
      text1: text[1],
    };

    const body = Object.keys(params)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

    try {
      const response = await fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        credentials: "include",
        body: body,
      });

      const json = await response.json();

      return json.data.url;
    } catch (e) {
      console.error(e);
      throw new Error("Failed to create meme");
    }

    // await ctx.runMutation(internal.memelords.prompt_functions.createMeme, {
    //   gameId,
    //   userId,
    //   promptIndex,
    //   imgId,
    //   text,
    // });
    // return gameId;
  },
});
