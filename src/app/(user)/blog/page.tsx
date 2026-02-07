"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";
import { SectionTitle, Card, Button } from "@/components/UI";
import { Calendar, Clock, ChevronRight, Hash, MessageCircle } from "lucide-react";

export default function Blog() {
    const { posts } = useData();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = useMemo(() => [
        "All",
        ...Array.from(new Set(posts.map((p) => p.category))),
    ], [posts]);

    const filteredPosts = useMemo(() => (
        selectedCategory === "All"
            ? posts
            : posts.filter((p) => p.category === selectedCategory)
    ), [posts, selectedCategory]);

    const featuredPost = filteredPosts[0] ?? null;
    const otherPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

    return (
        <div className="bg-brand-surface dark:bg-darkbg min-h-screen transition-colors duration-300">
            {/* SECTION 1: BLOG INTRO */}
            <section className="bg-white dark:bg-darkbg pt-20 pb-16 border-b border-slate-200/70 dark:border-slate-800/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
                        Insight <span className="text-brand">Azefine Worker</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Eksplorasi artikel seputar teknologi, optimasi sistem, dan solusi operasional. Ditulis berdasarkan pengalaman nyata untuk membantu bisnis Anda tumbuh lebih efisien.
                    </p>
                </div>
            </section>

            {/* SECTION 2: CATEGORIES */}
            <section className="sticky top-20 z-40 bg-white/90 dark:bg-darkbg/90 backdrop-blur border-b border-slate-200/70 dark:border-slate-800/70 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide justify-start md:justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                                    : "bg-slate-100 dark:bg-cardbg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: BLOG LISTING */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Featured Post */}
                {featuredPost && (
                    <Link
                        href={`/blog/${featuredPost.id}`}
                        className="relative rounded-3xl overflow-hidden shadow-2xl mb-16 group border border-slate-200/70 dark:border-slate-800/70 block"
                    >
                        <div className="absolute inset-0">
                            <Image
                                src={featuredPost.imageUrl || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"}
                                alt={featuredPost.title}
                                fill
                                sizes="(min-width: 1024px) 1000px, 100vw"
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent opacity-95"></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end h-[450px] md:h-[550px]">
                            <div className="flex items-center gap-3 text-brand-darker bg-white/90 backdrop-blur px-3 py-1 rounded-full w-fit text-xs font-bold mb-4 uppercase tracking-widest">
                                <Hash size={12} /> Featured • {featuredPost.category}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl group-hover:text-brand-light transition-colors">
                                {featuredPost.title}
                            </h2>
                            <p className="text-slate-200 text-lg mb-8 max-w-2xl line-clamp-2 leading-relaxed">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-medium">
                                <span className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xs">
                                        {featuredPost.author.charAt(0)}
                                    </div>
                                    {featuredPost.author}
                                </span>
                                <span className="flex items-center gap-2"><Calendar size={16} /> {featuredPost.date}</span>
                                <span className="flex items-center gap-2"><Clock size={16} /> 5 min read</span>
                            </div>
                        </div>
                    </Link>
                )}

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 dark:text-slate-400">Belum ada artikel di kategori ini.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setSelectedCategory("All")}>Lihat Semua Artikel</Button>
                    </div>
                )}

                {/* Grid Listing */}
                {otherPosts.length > 0 && (
                    <>
                        <SectionTitle title="Artikel Terbaru" subtitle="Wawasan pendukung pertumbuhan bisnis Anda." />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((post) => (
                                <Card key={post.id} className="flex flex-col h-full group border border-slate-100/70 dark:border-slate-800/70 hover:border-brand/50 transition-all">
                                    <div className="h-56 overflow-hidden relative bg-slate-200 dark:bg-cardbg">
                                        <Image
                                            src={post.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"}
                                            alt={post.title}
                                            fill
                                            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 100vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                                            <Calendar size={12} /> <span>{post.date}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand transition-colors leading-tight line-clamp-2">
                                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed text-sm flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-slate-100/70 dark:border-slate-800/70 flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px]">{post.author.charAt(0)}</span>
                                                {post.author}
                                            </span>
                                            <Link href={`/blog/${post.id}`} className="text-brand font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                                Baca <ChevronRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* SECTION 6: SOFT CTA */}
            <section className="py-20 bg-white dark:bg-cardbg border-t border-slate-200/70 dark:border-slate-800/70">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Punya Masalah Serupa dengan Artikel di Atas?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Teori saja tidak cukup. Azefine Worker siap membantu Anda mengimplementasikan solusi teknis dan operasional secara langsung.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => router.push("/contact")} className="shadow-lg shadow-brand/20">
                            <MessageCircle size={18} className="mr-2" /> Konsultasi Gratis
                        </Button>
                        <Button onClick={() => router.push("/services")} variant="outline" className="bg-white dark:bg-cardbg">
                            Lihat Layanan Terkait
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
