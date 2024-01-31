import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <JoinGameScreen />,
});

function JoinGameScreen() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // auth.login(username)
    // router.invalidate()
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mb-6 text-center text-3xl ">Play MemeMaker</h2>
          <div className="flex-1 border-b-2 border-gray-300"></div>

          <form
            onSubmit={onSubmit}
            className="flex items-center justify-between p-2"
          >
            <label htmlFor="code" className="text-lg font-bold">
              Enter Game Code
            </label>
            <input
              type="text"
              className="w-36 h-10 border-2 border-gray-300 rounded-md p-2 mx-2"
              placeholder="AXY123"
            />
            <button className="h-10 px-4 bg-blue-500 text-white rounded-md">
              Join
            </button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
}
