import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ClipboardList, Clock, CheckCircle } from "lucide-react";

export default async function UserDashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-brand-surface dark:bg-darkbg py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-4">
            Member
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Dashboard Member
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Halo, {session.user?.name ?? "Member"}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Permintaan Aktif", value: "2", icon: ClipboardList },
            { title: "Menunggu Konfirmasi", value: "1", icon: Clock },
            { title: "Selesai", value: "5", icon: CheckCircle },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-cardbg p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-card">
              <div className="flex items-center gap-3 mb-4 text-brand">
                <stat.icon size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">{stat.title}</span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white dark:bg-cardbg p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Aktivitas Terbaru</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li>Permintaan konsultasi Anda sedang diproses.</li>
            <li>Dokumen penawaran dikirimkan via email.</li>
            <li>Jadwal meeting dikonfirmasi oleh tim Azefine.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
