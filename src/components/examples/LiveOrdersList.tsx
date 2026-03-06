'use client';

import { useQuery } from '@powersync/react';

// This is an example component to demonstrate the PowerSync Live Delta Sync querying
export function LiveOrdersList() {
  // `useQuery` automatically sets up a watcher on the local SQLite DB 
  // It instantly triggers a re-render when delta changes stream from Neon to the client
  const { data: orders, isLoading } = useQuery('SELECT * FROM Order ORDER BY createdAt DESC');

  if (isLoading) {
    return <div>Loading live orders...</div>;
  }

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        Live Orders
      </h2>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet. They will appear here instantly!</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-700">Order #{order.id?.slice(0, 8) || 'N/A'}</span>
              <div className="flex text-sm gap-4">
                <span className="text-gray-500">${order.total?.toFixed(2) || '0.00'}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
