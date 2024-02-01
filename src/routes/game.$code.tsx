import { client } from "@/lib/client";
import { flushSync } from "react-dom";
import {
  createFileRoute,
  getRouteApi,
  useNavigate,
} from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import React from "react";
import { useAuth } from "@/providers/auth";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/game/$code")({
  validateSearch: z.object({
    redirect: z.string().catch("/"),
  }),
  loader: async ({ params }) =>
    await client.query(api.games.get, {
      tokenIdentifier: params.code.toString(),
    }),
  component: GameLogin,
});

const routeApi = getRouteApi("/game/$code");

function GameLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { code } = routeApi.useParams();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");

  const search = routeApi.useSearch();

  const handleLogin = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsSubmitting(true);
    // mutation to create and user and add them to userId on game
    flushSync(() => {
      auth.setUser(name);
      auth.setGame(code);
    });

    void navigate({ to: search.redirect });
  };

  return (
    <div className="p-2">
      <form className="mt-4" onSubmit={handleLogin}>
        <fieldset
          disabled={isSubmitting}
          className="flex flex-col gap-2 max-w-sm"
        >
          <div className="flex gap-2 items-center">
            <label htmlFor="username-input" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <Button disabled={isSubmitting} type="submit">
            ENTER
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
