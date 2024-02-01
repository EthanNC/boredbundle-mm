import { AuthContext } from "@/providers/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouterContext {
  auth: AuthContext;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <nav className="text-center p-2">
        <h1 className="text-xl">BoredBundle</h1>
      </nav>
      <hr />
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
    </>
  ),
});
