"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Session } from "next-auth";

type AuthUser = Session["user"] | null;

const AuthUserContext = createContext<AuthUser>(null);

export default function AuthUserProvider({
  user,
  children,
}: {
  user: AuthUser;
  children: ReactNode;
}) {
  return <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>;
}

export const useCurrentUser = () => useContext(AuthUserContext);
