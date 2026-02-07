import type { ReactNode } from "react";
import { auth } from "@/auth";
import AuthUserProvider from "@/components/AuthUserProvider";
import Navbar from "@/components/template/Navbar";
import { Footer } from "@/components/template/Footer";

export default async function UserLayout({ children }: { children: ReactNode }) {
    const session = await auth();
    return (
        <AuthUserProvider user={session?.user ?? null}>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="grow pt-16">
                    {children}
                </main>
                <Footer />
            </div>
        </AuthUserProvider>
    );
}
