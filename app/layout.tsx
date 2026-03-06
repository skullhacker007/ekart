
import '../src/styles/globals.css';
import '../src/lib/queue/handlers'; // register all background job handlers
import { Providers } from '../src/components/providers/Providers';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
