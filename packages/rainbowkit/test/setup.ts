import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';

beforeAll(() => {
  // Silence all writes to stdout to silence connector logs
  vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
});

afterAll(() => {
  // Restore the original implementations so future processes are unaffected
  (
    process.stdout.write as unknown as { mockRestore: () => void }
  ).mockRestore();
});

afterEach(() => {
  cleanup();
});
