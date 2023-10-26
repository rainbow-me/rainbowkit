import React, { PropsWithChildren, useEffect } from 'react';

const SwipeluxWidgetContext = React.createContext<{
  ready: boolean;
  widgetSettings?: unknown;
}>({ ready: false, widgetSettings: undefined });

export const SwipeluxWidgetProvider = ({ children, widgetSettings}: PropsWithChildren<{
  widgetSettings?: unknown
}>) => {
  const [SwipeluxWidgetReady, setSwipeluxWidgetReady] = React.useState(false);

  useEffect(() => {
    loadExternalScript('https://app.dev.swipelux.com/sdk.js', () => {
      setSwipeluxWidgetReady(true);
    })
  }, []);


  return (
    <SwipeluxWidgetContext.Provider value={{ ready: SwipeluxWidgetReady, widgetSettings }}>
     {children}
    </SwipeluxWidgetContext.Provider>
  );
}

export function useSwipeluxWidget() {
  const context = React.useContext(SwipeluxWidgetContext);
  if (context === undefined) {
    throw new Error('useSwipeluxWidget must be used within a SwipeluxWidgetProvider');
  }
  return context;
}


function loadExternalScript(src: string, onLoad: () => void) {
  if (document && document.body && window) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);
  }
}
