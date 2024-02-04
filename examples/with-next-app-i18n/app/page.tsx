import { redirect } from 'next/navigation';

// This page only renders when the app is built statically (output: 'export')
function RootPage() {
  redirect('/en-US');
}

export default RootPage;
