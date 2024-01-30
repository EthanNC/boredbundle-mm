import { Button } from "@/components/ui/button";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link } from "@/components/typography/link";

function App() {
  const findGame = useQuery(api.games.get, { tokenIdentifier: "numbers" });
  const listGames = useQuery(api.games.list);
  const createGame = useAction(api.actions.createGame);
  // const addNumber = useMutation(api.myFunctions.addNumber);

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
