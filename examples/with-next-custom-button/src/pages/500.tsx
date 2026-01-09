import Link from 'next/link';

// Simple 500 page that doesn't require wagmi/RainbowKit providers
export default function Custom500() {
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
      <h1 style={{ fontSize: '72px', margin: '0' }}>500</h1>
      <h2 style={{ margin: '20px 0' }}>Server Error</h2>
      <p>Something went wrong on our end. Please try again later.</p>
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
