import { MutationCtx, internalMutation } from "./_generated/server";
import { faker } from "@faker-js/faker";

type user = {
  id: string;
  name: string;
};

export default internalMutation({
  handler: async (ctx: MutationCtx) => {
    const users: user[] = Array.from({ length: 4 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.firstName(),
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
