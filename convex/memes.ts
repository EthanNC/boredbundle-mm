import { v } from "convex/values";
import { query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const search = query({
  args: { search: v.string() },
  handler: async (ctx, { search }) => {
    const memes = ctx.db
      .query("memes")
      .withSearchIndex("search_name", (q) => q.search("name", search))
      .collect();

    return memes;
  },
});

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) => {
    return await ctx.db.query("memes").paginate(paginationOpts);
  },
});
