import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';

// Force dynamic rendering for all pages to avoid SSG errors with wagmi v3
// wagmi v3 requires hooks to be used within WagmiProvider context,
// which isn't available during static generation
export const dynamic = 'force-dynamic';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
