import { httpRouter } from "convex/server";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

export const newGame = httpAction(async (ctx, request) => {
  const { body } = await request.json();
  const data = await ctx.runAction(api.actions.createGame, {
    body: body,
  });
  return new Response(data, { status: 200 });
});

http.route({
  path: "/newGame",
  method: "POST",
  handler: newGame,
});

export default http;
