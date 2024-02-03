import { Button } from "@/components/ui/button";
import { useAction, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link } from "@/components/typography/link";
import { Input } from "./components/ui/input";
import { useAuth } from "./providers/auth";
import { useNavigate } from "@tanstack/react-router";

function App() {
  // const findGame = useQuery(api.games.get, { tokenIdentifier: "numbers" });
  const listGames = useQuery(api.games.list);
  const auth = useAuth();
  const navigate = useNavigate();
  const createGame = useAction(api.actions.createGame);
  // const addNumber = useMutation(api.myFunctions.addNumber);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as typeof e.target & {
      user: { value: string };
    };
    e.preventDefault();
    auth.setGame("testr");
    auth.setId(target.user.value);
    auth.setUser("Test User");
    void navigate({ to: "/game/play" });
  };
  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Convex + React (Vite)
      </h1>
      <p>
        Click the button and open this page in another window - this data is
        persisted in the Convex cloud database!
      </p>
      <p>
        <Button
          onClick={() => {
            void createGame({ body: "first game" });
          }}
        >
          Create Game
        </Button>
      </p>
      <p>
        Edit{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          src/App.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        Check out{" "}
        <Link target="_blank" href="https://docs.convex.dev/home">
          Convex docs
        </Link>
      </p>
      <h2>Join as host</h2>
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-between p-2"
      >
        <label htmlFor="code" className="text-lg font-bold">
          Enter Test as Host
        </label>
        <Input
          name="user"
          type="text"
          className="w-36 h-10"
          placeholder="userId"
        />
        <Button type="submit">JOIN</Button>
      </form>
      <h2>Games</h2>
      <ul>
        {listGames?.map((game) => (
          <li key={game._id}>{game.tokenIdentifier}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
