/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createGlobalThemeContract } from '@vanilla-extract/css';
import {
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
  defineProperties,
  RequiredConditionalValue,
} from '@vanilla-extract/sprinkles';

import './reset.css';

const themeContractValues = {
  colors: {
    accentColor: '',
    actionButtonBorder: '',
    actionButtonBorderMobile: '',
    actionButtonSecondaryBackground: '',
    actionButtonText: '',
    closeButton: '',
    closeButtonBackground: '',
    connectButtonBackground: '',
    connectButtonBackgroundError: '',
    connectButtonInnerBackground: '',
    connectButtonText: '',
    connectButtonTextError: '',
    connectionIndicator: '',
    error: '',
    generalBorder: '',
    generalBorderDim: '',
    menuItemBackground: '',
    modalBackdrop: '',
    modalBackground: '',
    modalBorder: '',
    modalText: '',
    modalTextDim: '',
    modalTextSecondary: '',
    profileAction: '',
    profileActionHover: '',
    profileForeground: '',
    selectedOptionBorder: '',
    standby: '',
  },
  fonts: {
    body: '',
  },
  radii: {
    actionButton: '',
    connectButton: '',
    menuButton: '',
    modal: '',
    modalMobile: '',
  },
  shadows: {
    connectButton: '',
    dialog: '',
    walletLogo: '',
    profileDetailsAction: '',
    selectedOption: '',
    selectedWallet: '',
  },
  borders: {
    modalBorderWidth: '',
  },
};

export type ThemeVars = typeof themeContractValues;

export const themeVars = createGlobalThemeContract(
  themeContractValues,
  (_, path) => `rk-${path.join('-')}`
);

const spacing = {
  '0': '0',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '5': '5px',
  '6': '6px',
  '8': '8px',
  '10': '10px',
  '12': '12px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '32': '32px',
  '36': '36px',
  '44': '44px',
  '64': '64px',
};

const dimensions = {
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
  '12': '12px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '30': '30px',
  '32': '32px',
  '34': '34px',
  '36': '36px',
  '40': '40px',
  '48': '48px',
  '54': '54px',
  '60': '60px',
  'full': '100%',
  'max': 'max-content',
};

const flexAlignment = ['flex-start', 'flex-end', 'center'] as const;

const textAlignments = ['left', 'center', 'inherit'] as const;

const interactionProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
  },
  defaultCondition: 'base',
  properties: {
    transform: {
      grow: 'scale(1.025)',
      growLg: 'scale(1.1)',
      shrink: 'scale(0.95)',
      shrinkSm: 'scale(0.9)',
    },
    transition: {
      default: '0.125s ease',
    },
  },
});

export const largeScreenMinWidth = 768;

const responsiveProperties = defineProperties({
  conditions: {
    smallScreen: {},
    largeScreen: {
      '@media': `screen and (min-width: ${largeScreenMinWidth}px)`,
    },
  },
  defaultCondition: 'smallScreen',
  properties: {
    alignItems: flexAlignment,
    display: ['none', 'block', 'flex'],
  },
});

export type ResponsiveValue<Value extends string | number | boolean> =
  RequiredConditionalValue<typeof responsiveProperties, Value>;

export const mapResponsiveValue = createMapValueFn(responsiveProperties);
export const normalizeResponsiveValue =
  createNormalizeValueFn(responsiveProperties);

const unresponsiveProperties = defineProperties({
  properties: {
    alignSelf: flexAlignment,
    backgroundSize: ['cover'] as const,
    borderRadius: {
      ...themeVars.radii,
      '1': '1px',
      '6': '6px',
      '10': '10px',
      '13': '13px',
      '25%': '25%',
      'full': '9999px',
    },
    borderStyle: {
      solid: 'solid',
    },
    borderWidth: {
      ...themeVars.borders,
      '0': '0px',
      '1': '1px',
      '2': '2px',
      '4': '4px',
    },
    cursor: ['pointer'],
    flexDirection: ['row', 'column'],
    fontFamily: themeVars.fonts,
    fontSize: {
      '12': '12px',
      '13': '13px',
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '23': '23px',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '800',
    },
    gap: spacing,
    height: dimensions,
    justifyContent: [...flexAlignment, 'space-between'],
    textAlign: textAlignments,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    marginTop: spacing,
    maxWidth: dimensions,
    minWidth: dimensions,
    overflow: ['hidden'] as const,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    position: ['absolute', 'fixed', 'relative'],
    right: {
      '0': '0',
    },
    userSelect: ['none'] as const,
    width: dimensions,
  } as const,
  shorthands: {
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
  },
  defaultCondition: 'base',
  properties: {
    background: themeVars.colors,
    borderColor: themeVars.colors,
    boxShadow: themeVars.shadows,
    color: themeVars.colors,
  },
});

export const sprinkles = createSprinkles(
  colorProperties,
  interactionProperties,
  responsiveProperties,
  unresponsiveProperties
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
