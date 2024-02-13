import { MutationCtx, internalMutation } from "./_generated/server";
import { faker } from "@faker-js/faker";

type user = {
  id: string;
  name: string;
  image: string;
};

const AvatarArray = [
  "King1.png",
  "Duke2.png",
  "Queen3.png",
  "Bear4.png",
  "King5.png",
  "Queen6.png",
];

export default internalMutation({
  handler: async (ctx: MutationCtx) => {
    const users: user[] = Array.from({ length: 4 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      image: AvatarArray[Math.floor(Math.random() * AvatarArray.length)],
    }));
    await ctx.db.insert("games", {
      body: "test",
      stage: "",
      users: [...users],
      tokenIdentifier: "TESTR",
      started: false,
    });
    return users[0].id;
  },
});
