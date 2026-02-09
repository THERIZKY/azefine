"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Button, Card } from "@/components/UI";
import {
    Filter,
    Search,
    SlidersHorizontal,
    Star,
    MapPin,
    ChevronDown,
} from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc";

type ProductMeta = {
    city: string;
    rating: string;
    sold: number;
};

export default function Store() {
    const { products } = useData();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState<SortOption>("default");
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const categories = useMemo(
        () => [
            "All",
            ...Array.from(
                new Set(
                    products
                        .filter((p) => p.status === "published")
                        .map((p) => p.category),
                ),
            ),
        ],
        [products],
    );

    const formatRupiah = (num: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(num);
    };

    const metaForProduct = (id: string): ProductMeta => {
        const cities = [
            "Jakarta Selatan",
            "Bandung",
            "Surabaya",
            "Tangerang",
            "Jakarta Pusat",
        ];
        const seed = id.charCodeAt(0) || 1;
        const city = cities[seed % cities.length];
        const rating = (4 + (seed % 10) / 10).toFixed(1);
        const sold = 20 + ((seed * 7) % 480);
        return { city, rating, sold };
    };

    const filteredProducts = useMemo(
        () =>
            products.filter((p) => {
                if (p.status !== "published") return false;
                if (
                    selectedCategory !== "All" &&
                    p.category !== selectedCategory
                )
                    return false;

                const searchLower = searchTerm.toLowerCase();
                const matchSearch =
                    p.name.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower);
                if (!matchSearch) return false;

                const price = p.promoPrice || p.regularPrice;
                if (minPrice && price < parseInt(minPrice, 10)) return false;
                if (maxPrice && price > parseInt(maxPrice, 10)) return false;

                return true;
            }),
        [products, selectedCategory, searchTerm, minPrice, maxPrice],
    );

    const sortedProducts = useMemo(
        () =>
            [...filteredProducts].sort((a, b) => {
                const priceA = a.promoPrice || a.regularPrice;
                const priceB = b.promoPrice || b.regularPrice;

                if (sortOption === "price-asc") return priceA - priceB;
                if (sortOption === "price-desc") return priceB - priceA;
                return 0;
            }),
        [filteredProducts, sortOption],
    );

    return (
        <div className="bg-brand-surface dark:bg-darkbg min-h-screen pt-8 pb-20">
            {/* HEADER / SEARCH BAR (Sticky) */}
            <div className="sticky top-20 z-30 bg-white dark:bg-darkbg border-b border-slate-200/70 dark:border-slate-800/70 shadow-sm mb-6">
                <div className="max-w-[1200px] mx-auto px-4 py-4">
                    <div className="flex gap-4 items-center">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                placeholder="Cari di Azefine Store"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-cardbg focus:ring-1 focus:ring-brand focus:border-brand outline-none text-sm transition-all dark:text-white"
                            />
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() =>
                                setIsMobileFilterOpen(!isMobileFilterOpen)
                            }
                            className="lg:hidden p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            aria-label="Open filters"
                        >
                            <SlidersHorizontal size={20} />
                        </button>

                        {/* Desktop Sort */}
                        <div className="hidden lg:flex items-center gap-2 min-w-[200px]">
                            <span className="text-xs font-bold text-slate-500">
                                Urutkan:
                            </span>
                            <select
                                value={sortOption}
                                onChange={(e) =>
                                    setSortOption(e.target.value as SortOption)
                                }
                                className="flex-1 py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-cardbg text-sm focus:border-brand outline-none cursor-pointer dark:text-white"
                            >
                                <option value="default">Paling Sesuai</option>
                                <option value="price-asc">
                                    Harga Terendah
                                </option>
                                <option value="price-desc">
                                    Harga Tertinggi
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 flex gap-6 items-start">
                {/* --- LEFT SIDEBAR (FILTERS) - Desktop --- */}
                <aside className="w-64 flex-shrink-0 bg-white dark:bg-cardbg rounded-xl shadow-card border border-slate-200/70 dark:border-slate-800/70 p-5 hidden lg:block h-fit sticky top-40">
                    <h3 className="font-extrabold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                        <Filter size={18} /> Filter
                    </h3>

                    {/* Kategori */}
                    <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">
                            Kategori
                        </h4>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <label
                                    key={cat}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === cat}
                                        onChange={() =>
                                            setSelectedCategory(cat)
                                        }
                                        className="accent-brand w-4 h-4 cursor-pointer"
                                    />
                                    <span
                                        className={`text-sm group-hover:text-brand transition-colors ${selectedCategory === cat ? "font-bold text-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-400"}`}
                                    >
                                        {cat}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Harga */}
                    <div className="mb-6">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">
                            Harga
                        </h4>
                        <div className="space-y-3">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    placeholder="Harga Minimum"
                                    value={minPrice}
                                    onChange={(e) =>
                                        setMinPrice(e.target.value)
                                    }
                                    className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg bg-slate-50 dark:bg-darkbg border-slate-200 dark:border-slate-700 focus:border-brand outline-none"
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                                    Rp
                                </span>
                                <input
                                    type="number"
                                    placeholder="Harga Maksimum"
                                    value={maxPrice}
                                    onChange={(e) =>
                                        setMaxPrice(e.target.value)
                                    }
                                    className="w-full pl-8 pr-3 py-2 text-sm border rounded-lg bg-slate-50 dark:bg-darkbg border-slate-200 dark:border-slate-700 focus:border-brand outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            setSelectedCategory("All");
                            setMinPrice("");
                            setMaxPrice("");
                            setSearchTerm("");
                        }}
                        variant="outline"
                        className="w-full text-xs font-bold border-slate-300 text-slate-600"
                    >
                        Reset Filter
                    </Button>
                </aside>

                {/* --- RIGHT CONTENT (GRID) --- */}
                <main className="flex-1 min-h-[60vh]">
                    {sortedProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center bg-white dark:bg-cardbg rounded-xl shadow-card border border-slate-200/70 dark:border-slate-800/70 p-12 text-center h-full">
                            <Image
                                src="https://assets.tokopedia.net/assets-tokopedia-lite/v2/zeus/kratos/605d3360.png"
                                alt="Empty"
                                width={192}
                                height={192}
                                className="mb-6 opacity-80"
                            />
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                                Oops, produk tidak ditemukan
                            </h3>
                            <p className="text-slate-500 text-sm mt-2 mb-6">
                                Coba ganti kata kunci atau kurangi filter
                                pencarianmu.
                            </p>
                            <Button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                }}
                                className="!py-2"
                            >
                                Hapus Filter
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {sortedProducts.map((product) => {
                                const meta = metaForProduct(product.id);
                                const discount = product.promoPrice
                                    ? Math.round(
                                          ((product.regularPrice -
                                              product.promoPrice) /
                                              product.regularPrice) *
                                              100,
                                      )
                                    : 0;

                                return (
                                    <Card
                                        key={product.id}
                                        className="flex flex-col h-full border border-slate-200/70 dark:border-slate-800/70 shadow-card hover:shadow-float hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-lg overflow-hidden bg-white dark:bg-cardbg group"
                                        onClick={() =>
                                            router.push(`/store/${product.id}`)
                                        }
                                    >
                                        {/* Image */}
                                        <div className="aspect-square relative bg-slate-100 dark:bg-darkbg">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                sizes="(min-width: 1280px) 240px, (min-width: 768px) 33vw, 50vw"
                                                className="object-cover"
                                            />
                                            {/* Stock Overlay if empty */}
                                            {product.stock === 0 && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <span className="bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                        Stok Habis
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Body */}
                                        <div className="p-3 flex flex-col flex-grow">
                                            <h3 className="text-sm font-normal text-slate-800 dark:text-white line-clamp-2 leading-snug mb-1 min-h-[40px]">
                                                {product.name}
                                            </h3>

                                            <div className="mt-1">
                                                <div className="font-extrabold text-base text-slate-900 dark:text-white">
                                                    {formatRupiah(
                                                        product.promoPrice ||
                                                            product.regularPrice,
                                                    )}
                                                </div>
                                                {discount > 0 && (
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1 rounded">
                                                            {discount}%
                                                        </span>
                                                        <span className="text-[10px] text-slate-400 line-through decoration-slate-400">
                                                            {formatRupiah(
                                                                product.regularPrice,
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-auto pt-3">
                                                <div className="flex items-center gap-1 mb-1 text-slate-500">
                                                    <MapPin size={12} />
                                                    <span className="text-[11px] truncate">
                                                        {meta.city}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                                                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                                                        <Star
                                                            size={12}
                                                            className="text-yellow-400 fill-yellow-400"
                                                        />
                                                        <span className="font-bold">
                                                            {meta.rating}
                                                        </span>
                                                    </div>
                                                    <span className="w-px h-3 bg-slate-300"></span>
                                                    <span>
                                                        Terjual {meta.sold}+
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>

            {/* MOBILE FILTER DRAWER */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileFilterOpen(false)}
                    ></div>
                    <div className="absolute right-0 top-0 h-full w-[80%] max-w-xs bg-white dark:bg-cardbg shadow-2xl p-5 flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                Filter & Sort
                            </h3>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                aria-label="Close filters"
                            >
                                <ChevronDown className="rotate-90" size={24} />
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 space-y-6">
                            {/* Copy of filters from sidebar */}
                            <div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">
                                    Urutkan
                                </h4>
                                <select
                                    value={sortOption}
                                    onChange={(e) =>
                                        setSortOption(
                                            e.target.value as SortOption,
                                        )
                                    }
                                    className="w-full py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-darkbg text-sm"
                                >
                                    <option value="default">
                                        Paling Sesuai
                                    </option>
                                    <option value="price-asc">
                                        Harga Terendah
                                    </option>
                                    <option value="price-desc">
                                        Harga Tertinggi
                                    </option>
                                </select>
                            </div>

                            <div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">
                                    Kategori
                                </h4>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label
                                            key={cat}
                                            className="flex items-center gap-3"
                                        >
                                            <input
                                                type="radio"
                                                name="category_mobile"
                                                checked={
                                                    selectedCategory === cat
                                                }
                                                onChange={() =>
                                                    setSelectedCategory(cat)
                                                }
                                                className="accent-brand w-4 h-4"
                                            />
                                            <span className="text-sm text-slate-600 dark:text-slate-300">
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-3">
                                    Range Harga
                                </h4>
                                <div className="space-y-3">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) =>
                                            setMinPrice(e.target.value)
                                        }
                                        className="w-full p-2 border rounded text-sm bg-white dark:bg-darkbg border-slate-300 dark:border-slate-700"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) =>
                                            setMaxPrice(e.target.value)
                                        }
                                        className="w-full p-2 border rounded text-sm bg-white dark:bg-darkbg border-slate-300 dark:border-slate-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                            <Button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full"
                            >
                                Terapkan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
