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
    tokenIdentifier: v.string(),
    started: v.boolean(),
    game_data: v.optional(v.object({
      prompts: v.optional(
                  v.array(
                    v.array(v.object({
                      userId: v.string(),
                      text: v.string()
                    }))
                  )
                ),
      submissions: 
                  v.optional(
                    v.array(
                      v.array(v.object({
                        userId: v.string(),
                        promptIndex: v.number(),
                        imgUrl: v.optional(v.string()),
                        text: v.array(
                                v.object({
                                  text: v.string(),
                                  x: v.optional(v.number()),
                                  y: v.optional(v.number()),
                                  color: v.optional(v.string()),
                                  size: v.optional(v.number())
                                })
                              ),                        
                      }))
                    )
                  )
    }))
  }).index("by_token", ["tokenIdentifier"]),
});
