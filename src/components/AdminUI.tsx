"use client";

import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { Edit3, X, Save, LayoutDashboard, LogOut, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { SectionStyle } from '@/@types/type';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/components/AuthUserProvider";

// --- SECTION WRAPPER (The "Builder" Overlay) ---
interface SectionWrapperProps {
  id: string; // The section ID (e.g., 'hero')
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, }) => {

  return (
    <div className={`relative group transition-all duration-300 `}>
      {/* Content Container */}
      <div className={`transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
};

// --- ADMIN TOOLBAR (Fixed Bottom) ---
export const AdminToolbar: React.FC<{ onEdit: () => void; isEditing: boolean }> = ({ onEdit, isEditing }) => {
  const user = useCurrentUser();
  const navigate = useRouter().push;
  const location = usePathname();

  if (!user || user.role !== 'admin') return null;

  // Don't show toolbar on the dashboard itself or login
  if (location.startsWith('/admin') || location === '/login') return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-60 bg-slate-900 text-white px-2 py-2 rounded-full shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="flex items-center gap-2 px-3 border-r border-slate-700 mr-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-bold uppercase tracking-wider">Builder</span>
      </div>

      <button
        onClick={() => navigate('/admin')}
        className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300 hover:text-white tooltip-trigger group relative"
      >
        <LayoutDashboard size={18} />
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Dashboard</span>
      </button>

      {/* Show Edit Button only on editable pages */}
      {(location.startsWith('/') || location.startsWith('/about')) && (
        <Button
          onClick={onEdit}
          className={`py-2! px-4! text-xs! rounded-full! flex items-center gap-2 ${isEditing ? 'bg-brand text-white' : 'bg-slate-800 hover:bg-slate-700'}`}
        >
          {isEditing ? <Eye size={14} /> : <Edit3 size={14} />}
          {isEditing ? 'Close Editor' : 'Edit Page'}
        </Button>
      )}

      <button
        onClick={() => { signOut({ callbackUrl: "/login" }); }}
        className="p-2 hover:bg-red-900/50 hover:text-red-400 rounded-full transition-colors text-slate-400 ml-1 group relative"
      >
        <LogOut size={18} />
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Logout</span>
      </button>
    </div>
  );
};

// --- SIDE EDITOR (Slide Out Panel) ---
interface SideEditorProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const SideEditor: React.FC<SideEditorProps> = ({ isOpen, onClose, title, children }) => {
  const user = useCurrentUser();

  if (!user || user.role !== 'admin') return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-70" onClick={onClose}></div>
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white dark:bg-slate-900 shadow-2xl z-80 transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-slate-800 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Edit3 size={16} className="text-brand" /> {title}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <Button onClick={onClose} className="w-full flex items-center justify-center gap-2">
            <Save size={16} /> Selesai Editing
          </Button>
          <p className="text-[10px] text-center text-slate-400 mt-2">Perubahan tersimpan otomatis di state lokal.</p>
        </div>
      </div>
    </>
  );
};

// --- Editor Input Components ---
export const EditorGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

export const EditorInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full p-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none dark:text-white transition-all"
  />
);

export const EditorTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    rows={4}
    {...props}
    className="w-full p-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none dark:text-white transition-all"
  />
);

export const EditorSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, ...props }) => (
  <div>
    {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">{label}</label>}
    <select
      {...props}
      className="w-full p-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none dark:text-white transition-all"
    >
      {props.children}
    </select>
  </div>
);

export const EditorToggle: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${checked ? 'bg-brand' : 'bg-slate-300 dark:bg-slate-600'}`}
    >
      <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </button>
  </div>
);
