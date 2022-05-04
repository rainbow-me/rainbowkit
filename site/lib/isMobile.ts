import {
  BotInfo,
  BrowserInfo,
  detect,
  NodeInfo,
  ReactNativeInfo,
  SearchBotDeviceInfo,
} from 'detect-browser';

function detectEnv(
  userAgent?: string
):
  | BrowserInfo
  | BotInfo
  | NodeInfo
  | SearchBotDeviceInfo
  | ReactNativeInfo
  | null {
  return detect(userAgent);
}

export function isAndroid(): boolean {
  const os = detectOS();
  return os ? os.toLowerCase().includes('android') : false;
}

export function isIOS(): boolean {
  const os = detectOS();
  return os
    ? os.toLowerCase().includes('ios') ||
        (os.toLowerCase().includes('mac') && navigator.maxTouchPoints > 1)
    : false;
}

function detectOS() {
  const env = detectEnv();
  return env?.os ? env.os : undefined;
}

export function isMobile(): boolean {
  const os = detectOS();
  return os ? isAndroid() || isIOS() : false;
}
