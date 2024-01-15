import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

process.on('unhandledRejection', (reason) => {
  console.log(`FAILED TO HANDLE PROMISE REJECTION: ${JSON.stringify(reason)}`);
});

afterEach(() => {
  cleanup();
});
