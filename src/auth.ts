import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  emailVerified: boolean;
  phone?: string;
};

const DEMO_USERS: DemoUser[] = [
  {
    id: "admin-001",
    name: "Super Admin",
    email: "admin@azefine.com",
    password: "admin123",
    role: "admin",
    emailVerified: true,
    phone: "08123456789",
  },
  {
    id: "user-001",
    name: "Budi Santoso",
    email: "user@example.com",
    password: "user123",
    role: "user",
    emailVerified: true,
    phone: "08129876543",
  },
];

const providers: Provider[] = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "you@email.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.toString().toLowerCase();
      const password = credentials?.password?.toString();
      if (!email || !password) return null;

      const user = DEMO_USERS.find((u) => u.email === email);
      if (!user || user.password !== password) {
        throw new Error("Email atau password salah.");
      }
      if (!user.emailVerified) {
        throw new Error("Email belum terverifikasi.");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers,
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/admin")) return auth?.user?.role === "admin";
      if (pathname.startsWith("/user-dashboard")) return !!auth?.user;
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "user";
        token.phone = user.phone ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as "admin" | "user") ?? "user";
        session.user.phone = (token.phone as string | null) ?? undefined;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
