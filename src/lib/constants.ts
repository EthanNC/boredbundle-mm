//The 1,2,3 is how Game Maker decides which image to use, so they're important!
export const AvatarArray = [
  "King1.png",
  "Duke2.png",
  "Queen3.png",
  "Bear4.png",
  "King5.png",
  "Queen6.png"
];

export type Meme = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
};
