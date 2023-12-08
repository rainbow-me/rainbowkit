export const getDappInfo = () => {
  return {
    dappUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    dappTitle:
      typeof document !== 'undefined' ? window.document.title : undefined,
  };
};
