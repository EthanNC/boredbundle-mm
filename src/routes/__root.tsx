import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="text-center p-2">
        <h1 className="text-xl">BoredBundle</h1>
      </nav>
      <hr />
      <Outlet />
      {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
    </>
  ),
});
