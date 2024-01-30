import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  games: defineTable({
    body: v.string(),
    users: v.optional(v.array(v.id("users"))),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
