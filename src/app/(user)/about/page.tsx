"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";
import { SectionTitle, Button } from "@/components/UI";
import { Target, Eye, CheckSquare, Layers, Settings, Hexagon, Shield, Zap, Heart, Anchor, MessageCircle, Database } from "lucide-react";
// Admin editing UI not used on this page right now; keep it lean

export default function About() {
    const { content } = useData();
    const router = useRouter();
    const [isEditing] = useState(false);

    // Helper to parse lists
    const parseList = (text: string) => text ? text.split('\n').filter(i => i.trim() !== '') : [];

    const missionPoints = parseList(content.mission);
    const capabilities = content.capabilitiesList;
    const values = parseList(content.coreValuesList);
    const steps = parseList(content.processSteps);


    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
            {/* SECTION 1: PAGE INTRO */}
            <section className="bg-slate-50 dark:bg-slate-900 py-20 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6">
                        <Hexagon size={12} fill="currentColor" /> About Azefine Worker
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                        Solusi Fleksibel untuk <span className="text-brand">Eksekusi Bisnis</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        Azefine Worker hadir sebagai platform yang tidak terikat pada satu definisi kaku. Kami adalah mitra strategis yang fokus pada fleksibilitas layanan, eksekusi teknis, dan solusi lintas bidang sesuai kebutuhan Anda.
                    </p>
                </div>
            </section>

            {/* SECTION 2: WHO WE ARE */}
            <section className={`py-24 transition-all ${isEditing ? 'border-2 border-brand ring-4 ring-brand/20 m-2 rounded-xl' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-brand to-teal-900 rounded-2xl opacity-20 blur-xl"></div>
                            <Image
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                                alt="Team Collaboration"
                                width={1000}
                                height={700}
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full h-auto"
                                priority
                            />
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-brand/10 text-brand rounded-full">
                                        <Settings size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white">Custom Solutions</div>
                                        <div className="text-xs text-slate-500">Tailored to your needs</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Siapa Kami?</h2>
                            <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                <p>{content.aboutText}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <Database className="text-brand flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Entitas Kerja</h4>
                                        <p className="text-sm text-slate-500">Bukan sekadar agensi, tapi partner operasional.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                                    <Zap className="text-accent flex-shrink-0" size={24} />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">Executor Teknis</h4>
                                        <p className="text-sm text-slate-500">Kami mengeksekusi ide menjadi sistem nyata.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: MISSION & VISION */}
            <section className={`py-24 bg-slate-900 text-white relative overflow-hidden transition-all ${isEditing ? 'border-2 border-brand ring-4 ring-brand/20 m-2 rounded-xl' : ''}`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-3 mb-6 text-brand-light">
                                <Eye size={32} />
                                <h3 className="text-2xl font-bold">Visi Kami</h3>
                            </div>
                            <p className="text-lg text-slate-300 leading-relaxed italic">
                                &ldquo;{content.vision}&rdquo;
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-3 mb-6 text-accent-light">
                                <Target size={32} />
                                <h3 className="text-2xl font-bold">Misi Kami</h3>
                            </div>
                            <ul className="space-y-4">
                                {missionPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                                        <CheckSquare size={20} className="text-accent flex-shrink-0 mt-1" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: HOW WE WORK */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Metode Kerja" subtitle="Sistematis, terukur, dan transparan." />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 -z-10"></div>

                        {steps.map((step, idx) => {
                            const [title, desc] = step.split(':').map(s => s.trim());
                            return (
                                <div key={idx} className="relative bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center hover:border-brand transition-colors group">
                                    <div className="w-24 h-24 mx-auto bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-950 text-2xl font-bold text-slate-300 group-hover:text-brand group-hover:border-brand transition-all mb-6">
                                        {idx + 1}
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 5: CAPABILITIES */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Kapabilitas Kami</h2>
                        <p className="text-slate-500 mt-2">Bidang keahlian yang terus berkembang.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capabilities.map((cap, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-start gap-4">
                                <div className="p-2 bg-brand/10 rounded-lg text-brand mt-1">
                                    <Layers size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{cap}</h4>
                                    <p className="text-slate-500 text-sm mt-1">Layanan profesional & terpercaya.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6: CORE VALUES */}
            <section className={`py-24 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 transition-all ${isEditing ? 'border-2 border-brand ring-4 ring-brand/20 m-2 rounded-xl' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Nilai Utama" subtitle="Prinsip yang menjadi landasan kerja kami." />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((val, idx) => {
                            const [title, desc] = val.split(':').map(s => s.trim());
                            // Icons map based on index for variety
                            const Icons = [Anchor, Shield, Zap, Heart];
                            const Icon = Icons[idx % Icons.length];

                            return (
                                <div key={idx} className="text-center group">
                                    <div className="w-16 h-16 mx-auto bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand group-hover:bg-brand/10 transition-all mb-6 transform group-hover:-rotate-6">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                        {desc || val}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 7: POSITIONING STATEMENT */}
            <section className={`py-20 bg-brand text-white text-center transition-all ${isEditing ? 'border-2 border-brand ring-4 ring-brand/20 m-2 rounded-xl' : ''}`}>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="mb-6 opacity-80"><Hexagon size={48} className="mx-auto" strokeWidth={1.5} /></div>
                    <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-8">
                        &ldquo;{content.positioningStatement}&rdquo;
                    </h2>
                    <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
            </section>

            {/* SECTION 8: CALL TO ACTION */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Siap Berkolaborasi?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
                        Jangan biarkan kendala teknis menghambat pertumbuhan bisnis Anda. Diskusikan kebutuhan Anda dengan tim kami.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => router.push('/contact')} className="!px-10 !py-4 text-lg shadow-xl shadow-brand/20">
                            <MessageCircle size={20} className="mr-2" /> Hubungi Kami
                        </Button>
                        <Button onClick={() => router.push('/services')} variant="outline" className="!px-10 !py-4 text-lg bg-white dark:bg-slate-800">
                            Lihat Layanan
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
}
