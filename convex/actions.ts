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

function giphyUrl(queryString: string) {
  return (
    "https://api.giphy.com/v1/gifs/translate?api_key=" +
    process.env.GIPHY_API_KEY +
    "&s=" +
    encodeURIComponent(queryString)
  );
}

// Post a GIF chat message corresponding to the query string.
export const sendGif = action({
  args: { queryString: v.string(), gameId: v.id("games") },
  handler: async (ctx, { queryString, gameId }) => {
    // Fetch GIF url from GIPHY.
    const data = await fetch(giphyUrl(queryString));
    const json = await data.json();
    if (!data.ok) {
      throw new Error(
        `Giphy errored: ${JSON.stringify(json)}, ${process.env.GIPHY_API_KEY}`
      );
    }
    const gifEmbedUrl = json.data.embed_url;

    // Write GIF url to Convex.
    await ctx.runMutation(internal.myFunctions.sendGifMessage, {
      body: gifEmbedUrl,
      gameId: gameId,
    });
  },
});
