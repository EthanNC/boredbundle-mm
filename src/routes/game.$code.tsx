import { flushSync } from "react-dom";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import React from "react";
import { useAuth } from "@/providers/auth";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import AvatarCarousel from "@/components/AvatarCarousel";

export const Route = createFileRoute("/game/$code")({
  validateSearch: z.object({
    redirect: z.string().catch("/"),
  }),
  component: GameLogin,
});

function GameLogin() {
  const auth = useAuth();
  const { code } = Route.useParams();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const createUser = useAction(api.actions.createUser);
  const router = useRouter();

  const handleLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    evt.isPropagationStopped();
    setIsSubmitting(true);
    // mutation to create and user and add them to userId on game
    const user = await createUser({ name: name, gameId: code, image: avatar });
    flushSync(() => {
      auth.setUser(name);
      auth.setGame(code);
      auth.setId(user);
    });
  };

  React.useLayoutEffect(() => {
    if (auth.isAuthenticated) {
      router.history.push("/game/play");
    }
  }, [auth.isAuthenticated, router.history]);

  return (
    <div className="flex flex-col items-center p-2">
      <AvatarCarousel setImage={setAvatar} />
      {/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
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
              onChange={(e) => setName(e.target.value.toUpperCase())}
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
