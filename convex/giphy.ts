import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";

// Post a GIF chat message corresponding to the query string.
export const sendGif = action({
  args: { queryString: v.string(), gameId: v.id("games") },
  handler: async (ctx, { queryString, gameId }) => {
    // Fetch GIF url from GIPHY.
    const searchUrl =
      "https://api.giphy.com/v1/gifs/translate?api_key=" +
      process.env.GIPHY_KEY +
      "&s=" +
      encodeURIComponent(queryString);
    const data = await fetch(searchUrl);
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
