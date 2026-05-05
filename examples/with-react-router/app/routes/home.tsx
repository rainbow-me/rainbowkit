import { Providers } from '~/providers';
import { Welcome } from '../welcome/welcome';
import '@rainbow-me/rainbowkit/styles.css';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <Providers>
      <Welcome />
    </Providers>
  );
}
