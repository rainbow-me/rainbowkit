export const appInfo = () => {
  return {
    url: typeof window !== "undefined" ? window.location.href : undefined,
    title: typeof document !== "undefined" ? window.document.title : undefined,
  };
};
