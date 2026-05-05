import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare global {
  namespace Chai {
    interface Assertion extends TestingLibraryMatchers<any, any> {}
  }
}

declare module '@vitest/expect' {
  interface Assertion<T = any> extends TestingLibraryMatchers<any, T> {}
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<any, any> {}
}
