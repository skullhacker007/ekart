'use client';

import { ReactNode, useEffect, useState } from 'react';
import { PowerSyncContext } from '@powersync/react';
import { db, connector } from '../../lib/db/powersync';

import { LoaderPage } from '../ui/loader-page';

export function PowerSyncProvider({ children }: { children: ReactNode }) {
  const [powerSyncInitialized, setPowerSyncInitialized] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Initialize the PowerSync DB and connect to the Neon backend
    const initializePowerSync = async () => {
      try {
        await db.init();
        await db.connect(connector);
        setPowerSyncInitialized(true);
        // Small delay to allow fade out animation
        setTimeout(() => setShowLoader(false), 300);
      } catch (err) {
        console.error("Failed to initialize PowerSync:", err);
        setShowLoader(false);
      }
    };

    initializePowerSync();
  }, []);

  return (
    <PowerSyncContext.Provider value={db}>
      {showLoader && <LoaderPage />}
      <div className={showLoader ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        {children}
      </div>
    </PowerSyncContext.Provider>
  );
}
