import { client } from "@/lib/client";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute("/game/$code")({
  loader: async ({ params }) =>
    await client.query(api.games.get, {
      tokenIdentifier: params.code.toString(),
    }),
  component: () => <div>Hello /game/$code!</div>,
});
