'use client';

import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* Add global providers here (e.g. ThemeProvider, QueryClientProvider, Redux Provider) */}
      {children}
    </>
  );
}
