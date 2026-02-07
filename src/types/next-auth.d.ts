import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role?: "admin" | "user";
      phone?: string;
    };
  }

  interface User {
    role?: "admin" | "user";
    phone?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "user";
    phone?: string | null;
  }
}
