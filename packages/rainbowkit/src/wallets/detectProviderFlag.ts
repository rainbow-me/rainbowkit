export const detectProviderFlag = (flag: string): boolean =>
  Boolean(
    typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined' &&
      (window.ethereum?.[flag] === true ||
        !!window.ethereum?.providers?.find((p: any) => p?.[flag] === true))
  );
