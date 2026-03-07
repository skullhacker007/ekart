"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

const PowerSyncProvider = dynamic(
  () => import("./PowerSyncProvider").then((mod) => mod.PowerSyncProvider),
  { ssr: false, loading: () => null },
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PowerSyncProvider>
      {/* Add global providers here (e.g. ThemeProvider, QueryClientProvider, Redux Provider) */}
      {children}
    </PowerSyncProvider>
  );
}
