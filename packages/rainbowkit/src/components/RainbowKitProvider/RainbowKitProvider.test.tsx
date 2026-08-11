import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../../test';

describe('<RainbowKitProvider />', () => {
  it('renders the theme root without affecting layout', () => {
    renderWithProviders(<div data-testid="content" />);

    const content = screen.getByTestId('content');
    const themeRoot = content.parentElement;

    // The provider scopes its theme CSS variables to a wrapper element that
    // carries the `data-rk` attribute. The wrapper must not generate a layout
    // box, otherwise children that rely on `height: 100%` (or flex) stretching
    // no longer fill their parent.
    // https://github.com/rainbow-me/rainbowkit/issues/2164
    expect(themeRoot?.getAttribute('data-rk')).toBe('');

    if (themeRoot === null) {
      throw new Error('Expected the theme root element to be rendered.');
    }

    expect(themeRoot).toHaveStyle('display: contents');
  });
});
