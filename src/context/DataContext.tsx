"use client";

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Service, Product, BlogPost, SiteContent, UserOrder, ContactMessage } from '../types';

// --- MOCK DATA INITIALIZATION ---
// This data will be loaded if LocalStorage is empty.

const MOCK_CONTENT: SiteContent = {
    heroTitle: "Mitra Strategis untuk Solusi Bisnis & Teknologi",
    heroSubtitle: "Azefine Worker menghadirkan layanan fleksibel lintas bidang. Fokus kami adalah eksekusi teknis yang presisi untuk pertumbuhan bisnis Anda.",

    // Problemlist
    problemsList: ["Sistem operasional berantakan dan manual", "Kesulitan maintenance perangkat IT kantor", "Tidak punya tim teknis dedicated", "Biaya vendor konvensional terlalu mahal"],

    // Solution
    solutionsList: ["Automasi alur kerja bisnis", "Managed IT Services & Maintenance", "Tim on-demand sesuai kebutuhan project", "Harga modular, bayar apa yang dipakai"],

    // Capabilities
    capabilitiesList: ["Web & App Development", "CCTV & Networking Installation", "Procurement Hardware", "Digital Marketing Strategy", "Operational Dashboard"],


    processSteps: "Konsultasi:Diskusi mendalam mengenai pain point bisnis Anda.\nPerancangan:Kami menyusun roadmap solusi teknis & budget.\nEksekusi:Implementasi sistem dengan update berkala.\nMaintenance:Dukungan purna jual untuk memastikan kelancaran.",
    whyUsPoints: "Fleksibilitas:Skema kerja yang menyesuaikan dinamika bisnis.\nTransparansi:Laporan progress dan biaya yang terbuka.\nExpertise:Tim dengan pengalaman lintas industri.",
    finalCtaTitle: "Siap Mengoptimalkan Bisnis Anda?",
    finalCtaSubtitle: "Jadwalkan sesi konsultasi gratis 30 menit bersama tim ahli kami.",
    aboutText: "Azefine Worker bermula dari keresahan akan kakunya layanan agensi konvensional. Kami hadir sebagai 'Worker Collective' yang siap terjun langsung membereskan masalah teknis di lapangan maupun di sistem cloud Anda.",
    vision: "Menjadi enabler teknologi nomor satu untuk UMKM dan Perusahaan berkembang di Indonesia.",
    mission: "Menyediakan akses teknologi enterprise dengan harga terjangkau\nMembangun ekosistem kerja yang kolaboratif\nMemberikan solusi yang berorientasi pada hasil nyata (revenue/efficiency)",
    coreValuesList: "Integritas:Jujur dalam spesifikasi dan harga.\nAgility:Cepat beradaptasi dengan perubahan.\nExcellence:Memberikan hasil di atas ekspektasi.",
    positioningStatement: "Your On-Demand Technical Partner",
    contactInfo: {
        email: 'hello@azefine.com',
        phone: '+62 812-3456-7890',
        address: 'South Quarter, Tower A, Jl. R.A. Kartini Kav 8, Cilandak, Jakarta Selatan',
        hours: 'Senin - Jumat, 09:00 - 17:00'
    },
    sectionVisibility: { hero: true, problemSolution: true, capabilities: true, process: true, services: true, products: true, whyUs: true, blog: true, cta: true },
    sectionOrder: ['hero', 'problemSolution', 'capabilities', 'process', 'services', 'products', 'whyUs', 'blog', 'cta'],
    sectionStyles: {
        hero: { variant: 'default', align: 'left', padding: 'normal' },
        cta: { variant: 'brand', align: 'center', padding: 'loose' }
    }
};

const normalizeStringList = (value: unknown): string[] => {
    if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
    if (typeof value === "string") return value.split("\n").map(v => v.trim()).filter(Boolean);
    return [];
};

const MOCK_SERVICES: Service[] = [
    {
        id: 's1', title: 'Pembuatan Website Bisnis', category: 'Development',
        description: 'Website profesional untuk company profile atau landing page.',
        fullDescription: 'Paket lengkap pembuatan website dari desain UI/UX hingga deploy ke server. Termasuk domain dan SSL gratis untuk tahun pertama.',
        priceStart: 'Mulai Rp 1.500.000', icon: 'Globe',
        scope: ['Desain UI/UX Premium', 'Mobile Responsive', 'SEO Basic Setup', 'Integrasi WhatsApp', 'Admin Dashboard'],
        deliverables: ['Source Code', 'Akses Hosting', 'Manual Book', 'Garansi Bug 3 Bulan']
    },
    {
        id: 's2', title: 'Instalasi CCTV & Networking', category: 'Infrastructure',
        description: 'Amankan aset kantor dengan sistem pengawasan 24 jam.',
        fullDescription: 'Layanan instalasi kabel LAN (Structured Cabling) dan pemasangan titik kamera CCTV Hikvision/Dahua dengan akses pantau via HP.',
        priceStart: 'Survey Gratis', icon: 'Video',
        scope: ['Survey Lokasi', 'Penarikan Kabel', 'Setting DVR/NVR', 'Konfigurasi Online Viewing'],
        deliverables: ['Layout Titik Kamera', 'Dokumentasi Instalasi', 'Training User']
    },
    {
        id: 's3', title: 'Automasi Laporan Keuangan', category: 'Automation',
        description: 'Ubah data manual Excel menjadi dashboard otomatis.',
        fullDescription: 'Kami membangun sistem database sederhana menggunakan Google Sheets atau SQL untuk mengotomatisasi laporan penjualan harian Anda.',
        priceStart: 'Mulai Rp 750.000', icon: 'Database',
        scope: ['Analisa Alur Data', 'Cleaning Data', 'Pembuatan Script Automasi', 'Visualisasi Dashboard (Looker Studio)'],
        deliverables: ['Dashboard Link', 'Video Tutorial']
    }
];

const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1', name: 'Laptop Dell Latitude 7490 (Second Like New)', slug: 'dell-7490', sku: 'LAP-001',
        category: 'Laptops', description: 'Laptop bisnis tangguh dengan prosesor i7 Gen 8. Cocok untuk kerja berat dan multitasking. Kondisi 95% mulus.',
        regularPrice: 5500000, promoPrice: 4950000, stock: 5, status: 'published',
        images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&q=60'],
        specifications: [{ label: 'Processor', value: 'Intel Core i7-8650U' }, { label: 'RAM', value: '16GB DDR4' }, { label: 'SSD', value: '512GB NVMe' }],
        seo: { title: 'Jual Laptop Dell Latitude Murah', description: '' }
    },
    {
        id: 'p2', name: 'Paket Kasir Android + Printer Thermal', slug: 'paket-kasir', sku: 'POS-002',
        category: 'Hardware', description: 'Solusi kasir hemat untuk UMKM. Tablet Android 10 inch + Stand + Printer Bluetooth.',
        regularPrice: 2800000, stock: 10, status: 'published',
        images: ['https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=500&q=60'],
        specifications: [{ label: 'Tablet', value: 'Samsung Tab A7 Lite' }, { label: 'Printer', value: 'Thermal 58mm Bluetooth' }],
        seo: { title: 'Paket Kasir Android Lengkap', description: '' }
    }
];

const MOCK_POSTS: BlogPost[] = [
    {
        id: 'b1', title: '5 Tanda Bisnis Anda Butuh Sistem ERP', excerpt: 'Jangan tunggu berantakan. Kenali gejala awal operasional bisnis yang mulai overload dan butuh sistemasi.',
        content: 'Lorem ipsum content goes here...', date: '2023-11-15', author: 'Admin Azefine', category: 'Business', tags: ['ERP', 'System', 'Efficiency'],
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'b2', title: 'Tips Memilih Laptop untuk Karyawan WFH', excerpt: 'Spesifikasi minimal yang kami sarankan agar tim Anda tetap produktif tanpa lag saat meeting online.',
        content: 'Lorem ipsum content goes here...', date: '2023-12-01', author: 'Teknisi IT', category: 'Tech Tips', tags: ['Hardware', 'WFH'],
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
    }
];

interface DataContextType {
    content: SiteContent;
    services: Service[];
    products: Product[];
    posts: BlogPost[];
    orders: UserOrder[];
    contactMessages: ContactMessage[];

}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [content] = useState<SiteContent>(() => ({
        ...MOCK_CONTENT,
        problemsList: normalizeStringList(MOCK_CONTENT.problemsList),
        solutionsList: normalizeStringList(MOCK_CONTENT.solutionsList),
    }));

    const [services] = useState<Service[]>(MOCK_SERVICES);
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [posts] = useState<BlogPost[]>(MOCK_POSTS);
    const [orders] = useState<UserOrder[]>([]);
    const [contactMessages] = useState<ContactMessage[]>([]);

    return (
        <DataContext.Provider value={{
            content,
            services,
            products,
            posts,
            orders,
            contactMessages,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useData must be used within a DataProvider");
    return context;
};
