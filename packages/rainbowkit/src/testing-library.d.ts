import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

type TestInjectedProvider = Record<string, unknown> & {
  providers?: TestInjectedProvider[];
};

declare global {
  interface Window {
    ethereum?: TestInjectedProvider;
  }

  namespace Chai {
    interface Assertion extends TestingLibraryMatchers<any, any> {}
  }
}

declare module '@vitest/expect' {
  interface Assertion<T = any> extends TestingLibraryMatchers<any, T> {}
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<any, any> {}
}
