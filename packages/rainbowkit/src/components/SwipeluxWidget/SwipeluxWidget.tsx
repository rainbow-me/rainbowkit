import React, { useRef, useEffect } from 'react';
import { useTheme } from "../RainbowKitProvider/RainbowKitProvider";
import { useSwipeluxWidget } from "../RainbowKitProvider/SwipeluxWidgetContext";
import { Box } from "../Box/Box";

export function SwipeluxWidget({ address }: { address?: string }) {
    const widgetRef = useRef(null);
    const widgetInit = useRef(false);
    const { ready, widgetSettings } = useSwipeluxWidget();
    const theme = useTheme();


    useEffect(() => {
        if (ready && widgetRef.current && window && !widgetInit.current) {
            // @ts-ignore
            const widget = new window.SwipeluxWidget(
                widgetRef.current,
                { apiKey: 'a',
                    // @ts-ignore
                    ...widgetSettings,
                    defaultValues:
                        // @ts-ignore
                        {
                            address: {
                                value: address,
                                editable: false,
                            }
                        }
                });
            widget.init();
            widgetInit.current = true;
        }
    }, [address]);

    return (
        <Box ref={widgetRef} />
    )
}
