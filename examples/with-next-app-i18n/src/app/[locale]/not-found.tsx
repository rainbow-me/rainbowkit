import Link from 'next/link';

// Simple not-found page that doesn't require wagmi/RainbowKit providers
// This prevents SSG errors with wagmi v3 which requires hooks to be within WagmiProvider
export default function NotFound() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        height: '100vh',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '72px', margin: '0' }}>404</h1>
      <h2 style={{ margin: '20px 0' }}>Page Not Found</h2>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        style={{
          color: '#0070f3',
          marginTop: '20px',
          textDecoration: 'underline',
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
