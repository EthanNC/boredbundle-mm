import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  games: defineTable({
    body: v.string(),
    users: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          image: v.string(),
        })
      )
    ),
    tokenIdentifier: v.string(),
    started: v.boolean(),
  }).index("by_token", ["tokenIdentifier"]),
});
