"use client";

import { type ReactNode } from "react";
import { useData } from "@/context/DataContext";
import { SectionTitle, Button } from "@/components/UI";
import { Card } from "@/components/ui/card";
import {
  ArrowRight, Zap, Shield, Layers,
  CheckCircle, XCircle, AlertTriangle, Hexagon,
  TrendingUp, Activity,
  Clock, Users, Target, Award
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionWrapper } from "@/components/AdminUI";
import GalaxyBackground from "@/components/Background/GalaxyBackground";


export default function Home() {
  const { content } = useData();
  const router = useRouter();

  // Helper parsing
  const parseList = (value?: string | string[]) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
    return value.split('\n').map((item) => item.trim()).filter(Boolean);
  };

  type SectionStyle = {
    variant: "default" | "alternate" | "dark" | "brand";
    padding: "normal" | "compact" | "loose";
    align: "left" | "center" | "right";
  };

  const DEFAULT_SECTION_STYLE: SectionStyle = {
    variant: "default",
    padding: "normal",
    align: "center",
  };

  const SECTION_STYLES: Record<string, SectionStyle> = {
    hero: { variant: "default", padding: "normal", align: "left" },
    problemSolution: { variant: "default", padding: "normal", align: "center" },
    capabilities: { variant: "default", padding: "normal", align: "center" },
    process: { variant: "default", padding: "normal", align: "center" },
    whyUs: { variant: "default", padding: "normal", align: "center" },
    cta: { variant: "brand", padding: "loose", align: "center" },
  };

  const paddingClasses: Record<SectionStyle["padding"], string> = {
    compact: "py-16",
    loose: "py-32",
    normal: "py-24",
  };

  const variantClasses: Record<SectionStyle["variant"], string> = {
    dark: "bg-black text-white",
    brand: "bg-brand text-white",
    alternate: "bg-slate-50 dark:bg-card border-y border-slate-100 dark:border-slate-800",
    default: "bg-white dark:bg-black",
  };

  const alignClasses: Record<SectionStyle["align"], string> = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // --- Style Helpers (Fixed) ---
  const getSectionClasses = (id: string) => {
    const style = SECTION_STYLES[id] ?? DEFAULT_SECTION_STYLE;
    return `transition-all duration-500 ${paddingClasses[style.padding]} ${variantClasses[style.variant]}`;
  };

  const getAlignClass = (id: string) => {
    const style = SECTION_STYLES[id] ?? DEFAULT_SECTION_STYLE;
    return alignClasses[style.align];
  };

  const heroAlign = SECTION_STYLES.hero.align;
  const capabilitiesAlign = SECTION_STYLES.capabilities.align;

  // --- COMPONENT MAPPING ---
  // We define the sections as render functions to pass props easily
  const SECTION_COMPONENTS: Record<string, ReactNode> = {

    hero: (
      <div className={`min-h-screen dark:bg-slate-950 grid items-center`}>
        {/* Background With This Shit */}
        {/* <PixelBlastBackground /> */}
        <GalaxyBackground />

        {/* MainHero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  z-10">
          <div className={`flex flex-col lg:flex-row gap-16 items-center text-left`}>
            <div className={`lg:w-1/2 ${heroAlign === 'center' ? 'lg:w-2/3 mx-auto' : ''}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-sm font-bold text-brand dark:text-brand-light mb-6 shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-700">
                <Zap size={16} className="fill-brand/20" />
                Solusi Teknologi Terintegrasi
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white drop-shadow-sm">
                {content.heroTitle}
              </h1>
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0 font-medium">
                {content.heroSubtitle}
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${heroAlign === 'center' ? 'justify-center' : ''}`}>
                <Button onClick={() => router.push('/contact')} variant="primary" className="!px-8 !py-4 text-base shadow-glow hover:shadow-glow/80">
                  Konsultasi Kebutuhan <ArrowRight size={18} className="ml-2" />
                </Button>
                <Button onClick={() => router.push('/services')} variant="outline" className="px-8 py-4 text-base backdrop-blur-sm bg-white/30 dark:bg-black/10 border-slate-300 dark:border-slate-600 hover:bg-white">
                  Eksplorasi Layanan
                </Button>
              </div>
            </div>

            {/* Visual is only shown if aligned left/right to save space in center mode */}
            {heroAlign !== 'center' && (
              <div className="lg:w-1/2 relative hidden lg:block perspective-1000">
                <div className="relative w-full h-[500px] flex items-center justify-center transform-style-3d hover:rotate-y-[-5deg] transition-transform duration-700">

                  {/* 3D COMPOSITION BASE */}
                  <div className="absolute w-[450px] h-[350px] bg-white/40 dark:bg-slate-800/40 rounded-[40px] transform rotate-x-20 rotate-z-[-10deg] shadow-2xl border border-white/40 backdrop-blur-md -z-10 bottom-0 left-10"></div>

                  {/* 3D BARS CONTAINER */}
                  <div className="flex items-end gap-6 z-10 transform translate-y-10">

                    {/* Bar 1 */}
                    <div className="group relative w-16 h-40 bg-slate-200 dark:bg-slate-700 rounded-2xl shadow-float transition-all duration-500 hover:-translate-y-4">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/40 rounded-2xl"></div>
                    </div>

                    {/* Bar 2 */}
                    <div className="group relative w-16 h-64 bg-teal-200 dark:bg-teal-900 rounded-2xl shadow-float transition-all duration-500 hover:-translate-y-6">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-white/40 rounded-2xl"></div>
                    </div>

                    {/* Bar 3 (Main) */}
                    <div className="group relative w-20 h-80 bg-brand-gradient rounded-2xl shadow-glow transition-all duration-500 hover:-translate-y-8 hover:scale-105">
                      {/* Glow */}
                      <div className="absolute -inset-1 bg-brand blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-2xl z-10"></div>

                      {/* Icon Inside */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white z-20">
                        <Hexagon size={32} className="animate-pulse fill-white/20" />
                      </div>
                    </div>

                    {/* Bar 4 */}
                    <div className="group relative w-16 h-56 bg-accent rounded-2xl shadow-lg opacity-90 transition-all duration-500 hover:-translate-y-4">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-white/40 rounded-2xl"></div>
                    </div>

                  </div>

                  {/* Floating Glass Cards */}
                  <div className="absolute top-20 right-0 animate-[bounce_5s_infinite]">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-600 flex items-center gap-3 w-48">
                      <div className="p-2.5 bg-green-100 text-green-600 rounded-xl">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Growth</div>
                        <div className="text-lg font-bold text-slate-900 dark:text-white">+125%</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-20 -left-10 animate-[bounce_4s_infinite] delay-1000">
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-600 flex items-center gap-3 w-48">
                      <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                        <Activity size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">System Optimized</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ),

    problemSolution: (
      <section className={`min-h-screen py-12 dark:bg-slate-950`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 text-center items-center`}>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Transformasi Bisnis</h2>
            <div className="w-16 h-1.5 bg-brand-gradient rounded-full mt-4 mx-auto lg:mx-0"></div>
            <p className="opacity-70 mt-4 text-lg">Dari kendala manual menjadi sistem otomatis.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 mb-6 text-red-500 font-bold uppercase tracking-wider text-sm">
                <AlertTriangle size={18} /> Problems
              </div>
              {/* Problem listing */}
              {content.problemsList.map((prob, idx) => (
                <div key={idx} className="bg-white dark:bg-card p-5 border-l-4 border-red-500 shadow-sm rounded-r-xl hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-red-500 bg-red-50 dark:bg-red-900/20 p-1.5 rounded-full"><XCircle size={16} /></div>
                    <p className="text-base font-medium text-slate-700 dark:text-slate-300">{prob}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 flex justify-center py-8 lg:py-0">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <ArrowRight size={24} className="hidden lg:block" />
                <ArrowRight size={24} className="lg:hidden rotate-90" />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 mb-6 text-brand font-bold uppercase tracking-wider text-sm">
                <CheckCircle size={18} /> Solutions
              </div>
              {/* Solutin Listing */}
              {content.solutionsList.map((sol, idx) => (
                <div key={idx} className="bg-brand-gradient p-px rounded-xl shadow-lg shadow-brand/10">
                  <div className="bg-white dark:bg-card p-5 rounded-[11px] flex items-center gap-4 h-full">
                    <div className="p-2 bg-brand/10 text-brand rounded-lg"><Zap size={20} /></div>
                    <p className="font-bold text-base text-slate-800 dark:text-white">{sol}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    ),

    capabilities: (
      <section className={getSectionClasses('capabilities')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Lingkup Kapabilitas" subtitle="Ekosistem layanan yang saling mendukung." align={capabilitiesAlign} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {content.capabilitiesList.map((cap, idx) => (
              <Card key={idx} className="p-8 flex items-start gap-4 group transition-all duration-300 hover:-translate-y-1 relative z-0 hover:z-10 will-change-transform">
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-2xl text-slate-600 dark:text-slate-400  transition-all shadow-sm">
                  <Layers size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{cap}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Solusi terintegrasi untuk hasil maksimal.</p>
                </div>
              </Card>
            ))}

            {/* Lihat  Selengkapnya */}
            <Link href="/services" className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand hover:bg-brand/5 dark:hover:bg-brand/10 transition-all group relative z-0 hover:z-10 will-change-transform">
              <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight size={24} />
              </div>
              <span className="font-bold text-brand">Lihat Selengkapnya</span>
            </Link>
          </div>
        </div>
      </section>
    ),

    process: (
      <section className={getSectionClasses('process')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`mb-16 ${getAlignClass('process')}`}>
            <h2 className="text-3xl font-extrabold mb-4 text-slate-900 dark:text-white">Proses Kerja</h2>
            <div className="w-16 h-1.5 bg-brand-gradient rounded-full mt-4 mb-6"></div>
            <p className="opacity-70 max-w-2xl text-lg">Transparan, terstruktur, dan berorientasi hasil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {parseList(content.processSteps).map((step, idx) => {
              const [title, desc] = step.split(':').map(s => s.trim());
              return (
                <div key={idx} className="relative group p-6 rounded-2xl hover:bg-white dark:hover:bg-cardbg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="absolute top-0 left-6 -mt-3 text-6xl font-black text-slate-100 dark:text-slate-900/20 -z-10 group-hover:text-brand/10 dark:group-hover:text-brand/20 transition-colors">
                    0{idx + 1}
                  </div>
                  <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-xl mb-6 shadow-md border border-slate-100 dark:border-slate-700 text-brand group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title || step}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc || 'Deskripsi tahapan kerja.'}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    ),

    whyUs: (
      <section className={getSectionClasses('whyUs')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl mx-auto mb-16 ${getAlignClass('whyUs')}`}>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
              Kenapa Memilih <span className="text-brand">Azefine?</span>
            </h2>
            <p className="text-lg opacity-70">
              Partner eksekusi yang menjembatani kebutuhan teknis dan operasional.
            </p>
          </div>

          {/* Standard Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 isolate">
            {parseList(content.whyUsPoints).map((point, idx) => {
              const [title, desc] = point.split(':').map(s => s.trim());
              const Icons = [Shield, Clock, Target, Users, Award, Zap];
              const Icon = Icons[idx % Icons.length];

              return (
                <div key={idx} className="group bg-white dark:bg-cardbg p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-float hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full relative overflow-hidden z-0 hover:z-10 will-change-transform">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center mb-6 text-slate-400  group-hover:bg-brand-gradient transition-all shadow-sm group-hover:shadow-glow">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title || 'Keunggulan'}</h3>
                  <p className="opacity-70 leading-relaxed text-sm text-slate-600 dark:text-slate-400">{desc || point}</p>
                </div>
              );
            })}

            <div className="group bg-brand-gradient p-8 rounded-2xl shadow-glow hover:-translate-y-2 transition-all flex flex-col items-center text-center h-full justify-center text-white relative z-0 hover:z-10 will-change-transform">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm ">
                <Hexagon size={32} className="animate-pulse" />
              </div>
              <h3 className="text-xl font-bold mb-3">Future Ready</h3>
              <p className="opacity-90 leading-relaxed text-sm">Teknologi kami dirancang untuk scalability dan update jangka panjang.</p>
            </div>
          </div>
        </div>
      </section>
    ),

    cta: (
      <section className={getSectionClasses('cta') + " relative overflow-hidden"}>
        {/* Background enhancement */}
        <div className="absolute inset-0 bg-brand-gradient opacity-95"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className={`max-w-4xl mx-auto px-4 relative z-10 ${getAlignClass('cta')} text-white`}>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight drop-shadow-md">{content.finalCtaTitle}</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl font-medium leading-relaxed">{content.finalCtaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="white" onClick={() => router.push('/contact')} className="!px-10 !py-4 text-lg shadow-xl hover:scale-105">Konsultasi Sekarang</Button>
            <Button onClick={() => router.push('/contact')} className="bg-transparent border-2 border-white text-white hover:bg-white/10 !px-10 !py-4 text-lg">Hubungi Kami</Button>
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="overflow-x-hidden min-h-screen ">
      {/* --- RENDER SECTIONS DYNAMICALLY --- */}
      <div className="flex flex-col">
        {content.sectionOrder.map((sectionId) => {
          const component = SECTION_COMPONENTS[sectionId];
          if (!component) return null;

          return (
            <SectionWrapper
              key={sectionId}
              id={sectionId}
            >
              {component}
            </SectionWrapper>
          );
        })}
      </div>
    </div>
  );
}
