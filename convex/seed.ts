import { MutationCtx, internalMutation } from "./_generated/server";
import { faker } from "@faker-js/faker";

type user = {
  id: string;
  name: string;
  image: string;
};

const AvatarArray = [
  "capybara.webp",
  "cat.png",
  "dogo.png",
  "frog.png",
  "gorilla.png",
  "sloth.webp",
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
      users: [...users],
      tokenIdentifier: "testr",
      started: false,
    });
    return users[0].id;
  },
});
