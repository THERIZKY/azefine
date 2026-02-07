import Link from "next/link";
import { Hexagon } from "lucide-react";
import { Button } from "@/components/UI";

// Footer (Dark Theme)
export const Footer = () => (
    <footer className="bg-darkbg text-slate-400 py-16 border-t border-slate-800 relative overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand to-accent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center text-white font-bold shadow-glow"><Hexagon size={18} className="fill-white/20" /></div>
                    <h3 className="text-white text-xl font-extrabold tracking-tight">
                        Azefine <span className="text-accent">Worker</span>
                    </h3>
                </div>
                <p className="text-sm leading-relaxed max-w-sm text-slate-400 font-medium">
                    Partner IT dan operasional terpercaya. Solusi teknologi modern untuk bisnis yang ingin berkembang cepat dan efisien.
                </p>
                <div className="flex space-x-4 pt-2">
                    {['Twitter', 'Instagram', 'LinkedIn', 'Facebook'].map(social => (
                        <a key={social} href="#" className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-brand hover:text-white text-slate-500 transition-all duration-300 border border-slate-700 hover:border-brand">
                            <div className="w-4 h-4 bg-current rounded-sm"></div>
                        </a>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold text-sm tracking-wide mb-6 uppercase">Produk</h4>
                <ul className="space-y-4 text-sm font-medium">
                    <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand"></span>Development</Link></li>
                    <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand"></span>Automation</Link></li>
                    <li><Link href="/services" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand"></span>Infrastructure</Link></li>
                    <li><Link href="/store" className="hover:text-accent transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand"></span>Hardware Store</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-bold text-sm tracking-wide mb-6 uppercase">Perusahaan</h4>
                <ul className="space-y-4 text-sm font-medium">
                    <li><Link href="/about" className="hover:text-accent transition-colors">Tentang Kami</Link></li>
                    <li><Link href="/blog" className="hover:text-accent transition-colors">Blog & Insight</Link></li>
                    <li><Link href="/contact" className="hover:text-accent transition-colors">Kontak</Link></li>
                    <li><Link href="/contact" className="hover:text-accent transition-colors">Karir</Link></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center px-4 max-w-7xl mx-auto relative z-10">
            <div className="text-xs font-medium mb-4 md:mb-0 text-slate-500">
                &copy; {new Date().getFullYear()} Azefine Worker. All rights reserved.
            </div>
            <Button asChild variant="secondary" className="py-1.5! px-4! text-xs rounded-full bg-slate-800 border border-slate-700 hover:border-brand">
                <Link href="/login">Area Member</Link>
            </Button>
        </div>
    </footer>
);
