import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

const iconUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA0NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAyIDc5LmYzNTRlZmM3MCwgMjAyMy8xMS8wOS0xMjowNTo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjQgKDIwMjMxMjIwLm0uMjQzOSBjZWI5OWVmKSAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjNGRDkwNzlFRjRGMTFFRTlFRjJERDZFQkZDREE0OTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjNGRDkwN0FFRjRGMTFFRTlFRjJERDZFQkZDREE0OTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGM0ZEOTA3N0VGNEYxMUVFOUVGMkRENkVCRkNEQTQ5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGM0ZEOTA3OEVGNEYxMUVFOUVGMkRENkVCRkNEQTQ5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFj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';

export const ctrlWallet = (): Wallet => {
  return {
    id: 'ctrl',
    name: 'Ctrl Wallet',
    rdns: 'ctrl.xyz',
    installed: hasInjectedProvider({ namespace: 'xfi.ethereum' }),
    iconUrl,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/ctrl-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
      browserExtension: 'https://ctrl.xyz',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://ctrl.xyz',
        steps: [
          {
            description: 'wallet_connectors.ctrl.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.ctrl.extension.step1.title',
          },
          {
            description: 'wallet_connectors.ctrl.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.ctrl.extension.step2.title',
          },
          {
            description: 'wallet_connectors.ctrl.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.ctrl.extension.step3.title',
          },
        ],
      },
    },
    createConnector: getInjectedConnector({ namespace: 'xfi.ethereum' }),
  };
};
