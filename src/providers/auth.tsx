import * as React from "react";
import { useLocalStorage } from "usehooks-ts";

export interface AuthContext {
  isAuthenticated: boolean;
  setUser: (username: string | null) => void;
  user: string | null;
  setId: (id: string | null) => void;
  id: string | null;
  game: string | null;
  setGame: (game: string | null) => void;
  leaveGame: () => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<AuthContext["user"]>("user", null);
  const [id, setId] = useLocalStorage<AuthContext["id"]>("id", null);
  const [game, setGame] = useLocalStorage<AuthContext["game"]>("game", null);
  const isAuthenticated = !!user && !!game && !!id;
  const leaveGame = () => {
    setUser(null);
    setId(null);
    setGame(null);
  };

  return (
    <AuthContext.Provider
      value={{
        leaveGame,
        isAuthenticated,
        user,
        setUser,
        game,
        setGame,
        id,
        setId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
