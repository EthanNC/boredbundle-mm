/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.8.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as actions from "../actions.js";
import type * as games from "../games.js";
import type * as giphy from "../giphy.js";
import type * as http from "../http.js";
import type * as memelords_actions from "../memelords/actions.js";
import type * as memelords_prompt_functions from "../memelords/prompt_functions.js";
import type * as myFunctions from "../myFunctions.js";
import type * as queries from "../queries.js";
import type * as seed from "../seed.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  actions: typeof actions;
  games: typeof games;
  giphy: typeof giphy;
  http: typeof http;
  myFunctions: typeof myFunctions;
  queries: typeof queries;
  seed: typeof seed;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
