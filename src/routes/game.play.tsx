import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

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
  const { leaveGame } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      Hello /game/play!
      <Button
        onClick={() => {
          leaveGame();
          void navigate({ to: "/" });
        }}
      >
        Leave Game
      </Button>
    </div>
  );
}
