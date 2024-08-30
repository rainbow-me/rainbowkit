import type { GetEnsNameReturnType } from 'viem';

export function formatENS(name: GetEnsNameReturnType): string {
  if (!name) return '';

  const parts = name.split('.');
  const last = parts.pop();
  if (parts.join('.').length > 24) {
    return `${parts.join('.').substring(0, 24)}...`;
  }
  return `${parts.join('.')}.${last}`;
}
