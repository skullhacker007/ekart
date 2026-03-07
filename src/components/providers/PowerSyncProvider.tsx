'use client';

import { ReactNode, useEffect, useState } from 'react';
import { PowerSyncContext } from '@powersync/react';
import { db, connector } from '../../lib/db/powersync';
import { LoaderPage } from '../ui/loader-page';

export function PowerSyncProvider({ children }: { children: ReactNode }) {
  const [powerSyncInitialized, setPowerSyncInitialized] = useState(false);

  useEffect(() => {
    // Initialize the PowerSync DB and connect to the Neon backend
    const initializePowerSync = async () => {
      try {
        await db.init();
        await db.connect(connector);
        setPowerSyncInitialized(true);
      } catch (err) {
        console.error("Failed to initialize PowerSync:", err);
      }
    };

    initializePowerSync();
  }, []);

  // While initializing, we can show a loader or just render nothing/fallback
  if (!powerSyncInitialized) {
    return <LoaderPage />;
  }

  return (
    <PowerSyncContext.Provider value={db}>
      {children}
    </PowerSyncContext.Provider>
  );
}
