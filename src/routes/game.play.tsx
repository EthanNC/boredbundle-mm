import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { getImage } from "@/lib/utils";
import { useLayoutEffect } from "react";

export const Route = createFileRoute("/game/play")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <PlayGameScreen />,
});

function PlayGameScreen() {
  const { leaveGame, id, game } = useAuth();
  const navigate = useNavigate();

  const gameData = useQuery(api.games.get, {
    tokenIdentifier: game as string,
  });
  const serverLeaveGame = useMutation(api.games.leaveGame);
  const serverStartGame = useMutation(api.games.startGame);

  useLayoutEffect(() => {
    if (gameData?.started) {
      void navigate({ to: "/game/prompts" });
    }
  }, [gameData?.started]);

  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="mb-6 text-center text-3xl ">MemeLords</h2>
      <div className="grid grid-cols-2 gap-4">
        {gameData?.users?.map((user) => (
          <div key={user.id}>
            <img
              src={getImage(user.image)}
              className="w-24 h-24 rounded-full mx-auto"
              alt={`Avatar ${user.image}`}
            />
            <p className="text-center">{user.name}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {(gameData?.users?.length ?? 0) > 3 &&
          gameData?.users?.at(0)?.id === (id as string) && (
            <Button
              onClick={() => {
                void serverStartGame({
                  gameId: game as string,
                });
              }}
            >
              Start Game
            </Button>
          )}
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
