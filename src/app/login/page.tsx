"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/UI";
import Link from "next/link";
import { Github, Mail, Lock, Chrome } from "lucide-react";

export default function LoginPage() {
    const [error, setError] = useState(false);
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            signIn("credentials", {
                email: formState.email,
                password: formState.password,
                callbackUrl: "/",
            });
        } catch (err) {
            if (err) setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProvider = (provider: "google" | "github") => {
        signIn(provider, { callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen bg-brand-surface dark:bg-darkbg flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md bg-white dark:bg-cardbg rounded-3xl shadow-2xl border border-slate-200/70 dark:border-slate-800/70 p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-4">
                        Auth
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        Masuk Akun
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Gunakan kredensial atau provider favorit Anda.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
                        Login gagal. Periksa email/password atau status
                        verifikasi email.
                    </div>
                )}

                <div className="grid grid-cols-1 gap-3">
                    <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => handleProvider("google")}
                    >
                        <Chrome size={16} /> Lanjutkan dengan Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => handleProvider("github")}
                    >
                        <Github size={16} /> Lanjutkan dengan GitHub
                    </Button>
                </div>

                <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                    <span className="text-xs text-slate-400">atau</span>
                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                </div>

                <form onSubmit={handleCredentials} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="email"
                                value={formState.email}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="you@email.com"
                                className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-darkbg text-sm focus:border-brand outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="password"
                                value={formState.password}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-darkbg text-sm focus:border-brand outline-none"
                                required
                            />
                        </div>
                    </div>

                    <Button disabled={isLoading} className="w-full py-3">
                        {isLoading ? "Memproses..." : "Masuk dengan Email"}
                    </Button>
                </form>

                <div className="mt-6 text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 p-3">
                        <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Demo Credentials
                        </p>
                        <p>Admin: `admin@azefine.com` / `admin123`</p>
                        <p>User: `user@example.com` / `user123`</p>
                    </div>
                    <p>
                        Email harus terverifikasi untuk login via credentials.
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-sm text-slate-500 hover:text-brand"
                    >
                        Kembali ke Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
