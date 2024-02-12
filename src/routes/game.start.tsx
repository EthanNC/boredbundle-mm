import { useAuth } from "@/providers/auth";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "../../convex/_generated/api";
import { useAction, usePaginatedQuery, useQuery } from "convex/react";
import { FormEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Meme } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { useDebounceValue } from "usehooks-ts";

export const Route = createFileRoute("/game/start")({
  component: GameStart,
});

function GameStart() {
  const { id, game } = useAuth();
  // const gameData = useQuery(api.games.get, {
  //   tokenIdentifier: game as string,
  // });

  const createMeme = useAction(api.memelords.actions.createMeme);
  const [searchText, setSearchText] = useDebounceValue("", 500);
  const [selectedMeme, setSelectedMeme] = useState<Meme | undefined>(undefined);
  const [genReady, setGenReady] = useState(false);

  const { results, status, loadMore } = usePaginatedQuery(
    api.memes.list,
    {},
    { initialNumItems: 10 }
  );
  const searchResults =
    useQuery(api.memes.search, { search: searchText }) || [];

  const memeRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (memeRef.current !== null) {
      memeRef.current.select();
    }
  };

  const generateMeme = async () => {
    if (selectedMeme) {
      const url = await createMeme({
        userId: id as string,
        gameId: game as string,
        imgId: selectedMeme.id,
        promptIndex: 0,
        text: ["breakfast in the morning", "breakfast for dinner"],
      });
      const updatedMeme = { ...selectedMeme, url };
      setSelectedMeme(updatedMeme);
    }
  };

  return (
    <div>
      {selectedMeme && (
        <img src={selectedMeme.url} className="w-60" alt="selected meme" />
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      {genReady && <Button onClick={generateMeme}>Generate Meme</Button>}
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Choose a Meme</Button>
        </DrawerTrigger>
        <DrawerContent className="">
          <DrawerHeader>
            <DrawerTitle>Find a Meme</DrawerTitle>
            <DrawerDescription>
              Search for a meme to send to the group.
            </DrawerDescription>
          </DrawerHeader>
          <Input
            name="meme-search"
            className="w-fit mb-5 rounded-[10px] border-2 border-gray-300"
            ref={memeRef}
            onChange={(event) => setSearchText(event.target.value)}
            onFocus={handleFocus}
            placeholder="Search for a meme"
          />
          <div className="grid grid-cols-2 gap-4 items-center overflow-auto max-w-screen-md mx-auto p-4 rounded-t-[10px]">
            {!searchText &&
              results.map((meme: Meme) => (
                <Card
                  onClick={() => {
                    memeRef.current!.value = meme.name;
                    setSearchText(meme.name);
                  }}
                  key={meme.id}
                  className="max-w-fit selection:outline"
                >
                  <CardContent>
                    <img src={meme.url} alt={meme.name} loading="lazy" />
                  </CardContent>
                </Card>
              ))}
            {searchResults.map((meme: Meme) => (
              <Card
                onClick={() => {
                  console.log(meme.name);
                  memeRef.current!.value = meme.name;
                }}
                key={meme.id}
                className="selection:outline"
              >
                <CardContent>
                  <img src={meme.url} alt={meme.name} loading="lazy" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <DrawerFooter>
              {searchText === "" && (
                <Button
                  onClick={() => loadMore(10)}
                  disabled={status !== "CanLoadMore"}
                >
                  Load More
                </Button>
              )}
              <DrawerClose asChild>
                <Button
                  onClick={() => {
                    console.log(memeRef.current!.value);

                    const Meme = searchResults.find(
                      (meme) => meme.name === memeRef.current!.value
                    );
                    setSelectedMeme(Meme);
                    setGenReady(true);
                  }}
                >
                  Submit
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
