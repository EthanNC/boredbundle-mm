import { ConvexHttpClient } from "convex/browser";

export const client = new ConvexHttpClient(
  import.meta.env.VITE_CONVEX_URL as string
);
