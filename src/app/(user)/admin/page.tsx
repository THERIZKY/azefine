import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Shield, Users, Activity, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-brand-surface dark:bg-darkbg py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-4">
            Admin
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Selamat datang, {session.user?.name ?? "Admin"}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Users", value: "1,248", icon: Users },
            { title: "Active Orders", value: "36", icon: Activity },
            { title: "System Status", value: "Operational", icon: Shield },
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

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-cardbg p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70">
            <div className="flex items-center gap-3 mb-4 text-brand">
              <Settings size={20} />
              <h2 className="font-bold text-slate-900 dark:text-white">Quick Actions</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>Review service requests</li>
              <li>Publish new blog posts</li>
              <li>Update landing page content</li>
            </ul>
          </div>

          <div className="bg-brand-gradient text-white p-6 rounded-2xl shadow-glow">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <p className="text-sm opacity-90 mb-4">
              Akses cepat ke halaman utama untuk review konten.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold">
                Landing <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold">
                Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
