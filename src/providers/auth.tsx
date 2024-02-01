import * as React from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  setUser: (username: string | null) => void;
  user: string | null;
  setId: (id: string | null) => void;
  id: string | null;
  game: string | null;
  setGame: (game: string | null) => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(null);
  const [id, setId] = React.useState<string | null>(null);
  const [game, setGame] = React.useState<string | null>(null);
  const isAuthenticated = !!user && !!game && !!id;
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, game, setGame, id, setId }}
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
