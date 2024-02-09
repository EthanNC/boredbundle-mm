import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  games: defineTable({
    body: v.string(),
    stage: v.string(),
    users: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          image: v.string(),
        })
      )
    ),
    submissions: v.optional(
      v.array(v.object({ id: v.string(), url: v.string() }))
    ),
    tokenIdentifier: v.string(),
    started: v.boolean(),
  }).index("by_token", ["tokenIdentifier"]),

  memes: defineTable({
    id: v.string(),
    name: v.string(),
    url: v.string(),
    width: v.number(),
    height: v.number(),
    box_count: v.number(),
    captions: v.number(),
    // gameId: v.id("games"),
    // userId: v.string(),
  }).searchIndex("search_name", {
    searchField: "name",
  }),
});
