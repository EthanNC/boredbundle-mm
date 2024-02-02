import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/game/play")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => <div>Hello /game/play!</div>,
});
