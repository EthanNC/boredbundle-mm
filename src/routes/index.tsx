import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createFileRoute,
  notFound,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import * as React from "react";
import { client } from "@/lib/client";
import { api } from "../../convex/_generated/api";
import { z } from "zod";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/game/play",
      });
    }
  },
  validateSearch: z.object({
    code: z.string().length(5).or(z.number()).optional(),
  }),
  loaderDeps: ({ search }) => ({
    code: search.code,
  }),
  loader: async ({ deps }) => {
    if (deps.code) {
      const game = await client.query(api.games.get, {
        tokenIdentifier: deps.code.toString(),
      });

      if (!game || !game._id) {
        throw notFound();
        // Alternatively, you can make the notFound function throw:
        // notFound({ throw: true })
      }
      return { game };
    }
  },
  notFoundComponent: () => {
    return <JoinGameScreen routeError="Game not found. Try Again." />;
  },
  component: () => <JoinGameScreen />,
});

function JoinGameScreen({ routeError }: { routeError?: string }) {
  const router = useRouter();
  const loader = Route.useLoaderData();
  const code = Route.useSearch().code;
  const [error, setError] = React.useState<string | null>(routeError || null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      code: { value: string };
    };
    const code = target.code.value;
    if (!code.trim()) {
      setError("Enter a 5 digit code to join the game.");
      return;
    }
    if (code.length !== 5) {
      setError("Code must be 5 digits long.");
      return;
    }
    router.history.push(`/?code=${code}`);
  };

  React.useLayoutEffect(() => {
    if (code && loader) {
      router.history.push(`/game/${code}`);
    }
  }, [code, loader]);

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mb-6 text-center text-3xl ">Play MemeMaker</h2>
        <div className="flex-1 border-b-2 border-gray-300"></div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-between p-2"
        >
          <label htmlFor="code" className="text-lg font-bold">
            Enter Game Code
          </label>
          <Input
            name="code"
            type="text"
            className="w-36 h-10"
            placeholder="code"
            onChange={() => setError(null)}
          />
          <Button type="submit">JOIN</Button>
        </form>
      </div>
      <div></div>
    </div>
  );
}
