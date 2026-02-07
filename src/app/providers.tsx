"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { DataProvider } from "@/context/DataContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  );
}
