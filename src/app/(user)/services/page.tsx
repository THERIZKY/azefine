"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useData } from "@/context/DataContext";
import { useCurrentUser } from "@/components/AuthUserProvider";
import { Button, Card, SectionTitle } from "@/components/UI";
import { CheckCircle, ArrowRight, Zap, Box, Settings, Sliders, X } from "lucide-react";
import type { Service } from "@/types";

export default function Services() {
  const { services } = useData();
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [detailService, setDetailService] = useState<Service | null>(null);
  const [selectedForBooking, setSelectedForBooking] = useState<Service | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", desc: "" });
  const [isSending, setIsSending] = useState(false);

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const handleBookingFromDetail = () => {
    setSelectedForBooking(detailService);
    setDetailService(null);
    setTimeout(() => {
      document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div className="bg-brand-surface dark:bg-darkbg min-h-screen transition-colors duration-300">
      {/* SECTION 1: SERVICES INTRO */}
      <section className="relative bg-brand-gradient dark:bg-hero-gradient-dark py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Layanan <span className="text-brand-light">Azefine Worker</span>
          </h1>
          <p className="text-xl text-teal-50/80 max-w-3xl mx-auto leading-relaxed">
            Kami menyediakan solusi lintas bidang yang fleksibel. Fokus kami bukan pada paket kaku, melainkan pada eksekusi sistem yang menyelesaikan masalah bisnis Anda.
          </p>
        </div>
      </section>

      {/* SECTION 2: CATEGORIES */}
      <section className="sticky top-20 z-40 bg-white/90 dark:bg-darkbg/90 backdrop-blur border-b border-slate-200/70 dark:border-slate-800/70 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2 md:pb-0 md:justify-center">
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

      {/* SECTION 3: SERVICES LISTING */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 text-slate-500">Tidak ada layanan di kategori ini.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="flex flex-col h-full hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-white dark:bg-cardbg"
                onClick={() => setDetailService(service)}
              >
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand bg-brand/10 px-2 py-1 rounded mb-2 w-fit">
                      {service.category}
                    </div>
                    <div className="text-slate-300 group-hover:text-brand transition-colors"><Zap size={24} /></div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="p-8 pt-0 mt-auto border-t border-slate-100/70 dark:border-slate-800/70 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">{service.priceStart || "Custom"}</span>
                    <span className="flex items-center gap-2 text-brand font-bold text-sm group-hover:gap-3 transition-all">
                      Lihat Detail <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 4: SERVICE DETAIL MODAL/PAGE */}
      {detailService && (
        <div className="fixed inset-0 z-[60] bg-white dark:bg-darkbg overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
          <div className="sticky top-0 bg-white/90 dark:bg-darkbg/90 backdrop-blur border-b border-slate-200/70 dark:border-slate-800/70 px-4 py-4 flex justify-between items-center z-50">
            <button onClick={() => setDetailService(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold">
              <ArrowRight className="rotate-180" size={20} /> Kembali ke Daftar
            </button>
            <button onClick={() => setDetailService(null)} className="p-2 bg-slate-100 dark:bg-cardbg rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-4 items-start mb-8">
              <div className="p-4 bg-brand rounded-2xl text-white shadow-lg shadow-brand/30">
                <Settings size={40} />
              </div>
              <div>
                <span className="text-brand font-bold tracking-wider uppercase text-sm">{detailService.category}</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
                  {detailService.title}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {detailService.fullDescription || detailService.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div className="bg-slate-50 dark:bg-cardbg p-8 rounded-3xl border border-slate-200/70 dark:border-slate-800/70">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Sliders size={20} className="text-brand" /> Scope Pekerjaan
                </h3>
                <ul className="space-y-4">
                  {detailService.scope?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) || <li className="text-slate-500 italic">Scope disesuaikan dengan kebutuhan.</li>}
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-cardbg p-8 rounded-3xl border border-slate-200/70 dark:border-slate-800/70">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Box size={20} className="text-brand" /> Output / Deliverables
                </h3>
                <ul className="space-y-4">
                  {detailService.deliverables?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  )) || <li className="text-slate-500 italic">Deliverables disepakati di awal.</li>}
                </ul>
              </div>
            </div>

            <div className="mt-12 p-6 bg-accent-light/70 dark:bg-accent/10 border border-accent/30 dark:border-accent/20 rounded-xl flex items-start gap-4">
              <div className="bg-accent-light dark:bg-accent/20 p-2 rounded-full text-accent hover:text-accent mt-1">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-accent dark:text-accent text-lg">Layanan Fleksibel</h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                  Scope dan deliverables di atas adalah contoh standar. Kami dapat menyesuaikan (menambah/mengurangi) item sesuai budget dan tujuan bisnis Anda.
                </p>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Button onClick={handleBookingFromDetail} className="px-10 py-4 text-lg shadow-xl shadow-brand/20 w-full md:w-auto">
                Konsultasikan Layanan Ini
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CUSTOM SERVICE NOTICE */}
      <section className="py-16 bg-white dark:bg-cardbg border-y border-slate-200/70 dark:border-slate-800/70">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Tidak Menemukan yang Anda Cari?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Jangan khawatir. Kebutuhan bisnis seringkali unik. Kami terbiasa menangani <strong>Custom Request</strong> yang tidak ada di katalog standar.
          </p>
          <Button
            onClick={() => {
              setSelectedForBooking(null);
              document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="outline"
            className="bg-white dark:bg-cardbg"
          >
            Konsultasikan Kebutuhan Custom
          </Button>
        </div>
      </section>

      {/* SECTION 7: WHY OUR SERVICES */}
      <section className="py-24 bg-brand-surface dark:bg-darkbg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Mengapa Memilih Kami?" subtitle="Pendekatan kami berbeda dari vendor konvensional." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Modular & Scalable", desc: "Mulai dari yang kecil, lalu kembangkan sistem seiring pertumbuhan revenue bisnis Anda." },
              { title: "Solusi Agnostik", desc: "Kami tidak memaksakan satu teknologi. Kami pilih yang paling efisien untuk masalah Anda." },
              { title: "Support Prioritas", desc: "Dukungan teknis purna jual untuk memastikan sistem Anda berjalan lancar tanpa kendala." },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-cardbg border border-slate-100/70 dark:border-slate-800/70">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ORDER FORM (CONSULTATION) */}
      <section id="booking-section" className="py-24 bg-white dark:bg-darkbg relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 shadow-2xl border-t-4 border-t-brand bg-white dark:bg-cardbg">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Form Konsultasi</h2>
              <p className="text-slate-500 dark:text-slate-400">
                Isi detail kebutuhan Anda. Ini bukan pemesanan final, melainkan langkah awal diskusi solusi.
              </p>
            </div>

            {!user ? (
              <div className="text-center py-12">
                <Button onClick={() => router.push(`/login?redirect=${encodeURIComponent(pathname)}`)} className="px-8 py-3">Login untuk Konsultasi</Button>
                <p className="text-xs text-slate-400 mt-4">Kami memerlukan login untuk tracking progress tiket Anda.</p>
              </div>
            ) : (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nama</label>
                    <input type="text" value={formState.name} disabled className="w-full px-4 py-3 bg-slate-100 dark:bg-darkbg border-transparent rounded-xl text-slate-500 dark:text-slate-400 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input type="email" value={formState.email} disabled className="w-full px-4 py-3 bg-slate-100 dark:bg-darkbg border-transparent rounded-xl text-slate-500 dark:text-slate-400 cursor-not-allowed" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Layanan Diminati</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={selectedForBooking ? selectedForBooking.title : "Konsultasi Umum (Custom)"}
                      readOnly
                      className="w-full px-4 py-3 bg-white dark:bg-cardbg border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-brand focus:outline-none"
                    />
                    {selectedForBooking && (
                      <button type="button" onClick={() => setSelectedForBooking(null)} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs font-bold hover:underline">
                        Ubah
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Kebutuhan / Masalah</label>
                  <textarea
                    required
                    rows={6}
                    value={formState.desc}
                    onChange={(e) => setFormState({ ...formState, desc: e.target.value })}
                    placeholder="Ceritakan kendala bisnis Anda, target yang ingin dicapai, atau spesifikasi sistem yang diinginkan..."
                    className="w-full px-4 py-3 bg-white dark:bg-cardbg border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand outline-none dark:text-white transition-all resize-none"
                  ></textarea>
                </div>

                <Button disabled={isSending} className="w-full py-4 text-lg shadow-xl shadow-brand/20">
                  {isSending ? "Mengirim..." : "Kirim Permintaan Konsultasi"}
                </Button>
                <p className="text-center text-xs text-slate-400 mt-4">Gratis konsultasi awal. Respon dalam 1x24 jam.</p>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="py-20 bg-brand text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-6">Punya Kebutuhan Spesifik?</h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
            Tim kami siap mendengarkan. Jadwalkan diskusi mendalam untuk menemukan solusi yang tepat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => document.getElementById("booking-section")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-teal-700 hover:bg-slate-100 px-10 py-4 text-lg font-bold shadow-xl transition-transform hover:scale-105"
            >
              Mulai Diskusi
            </Button>
            <Button
              onClick={() => router.push("/contact")}
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-bold"
            >
              Hubungi WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
