'use client';

import { ReactNode } from 'react';
import { PowerSyncProvider } from './PowerSyncProvider';

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
