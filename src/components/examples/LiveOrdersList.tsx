"use client";

import dynamic from "next/dynamic";

// Dynamically load the PowerSync-powered component to avoid bundling realtime libs
const ClientLiveOrdersList = dynamic(
  () => import("./LiveOrdersList.client").then((mod) => mod.LiveOrdersList),
  { ssr: false, loading: () => <div>Loading live orders...</div> },
);

export function LiveOrdersList() {
  return <ClientLiveOrdersList />;
}
