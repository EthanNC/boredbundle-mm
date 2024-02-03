import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import { useAuth } from "@/providers/auth";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";

export const Route = createFileRoute("/game/play")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  loader: async ({ context }) =>
    await client.query(api.games.get, {
      tokenIdentifier: context.auth.game as string,
    }),
  component: () => <PlayGameScreen />,
});

function PlayGameScreen() {
  const { leaveGame, id, game } = useAuth();
  const navigate = useNavigate();
  const gameData = Route.useLoaderData();
  const serverLeaveGame = useMutation(api.games.leaveGame);
  console.log(gameData);
  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="mb-6 text-center text-3xl ">MemeLords</h2>
      <div className="grid grid-cols-2 gap-4">
        {gameData?.users?.map((user) => (
          <div key={user.id}>
            <Skeleton
              className={`w-40 h-40 ${user.id === id && "border-white border-2"}`}
            />
            <p className="text-center">{user.name}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => {}}>Start Game</Button>
        <Button
          onClick={() => {
            void serverLeaveGame({
              userId: id as string,
              gameId: game as string,
            });
            leaveGame();
            void navigate({ to: "/" });
          }}
        >
          Leave Game
        </Button>
      </div>
    </div>
  );
}
