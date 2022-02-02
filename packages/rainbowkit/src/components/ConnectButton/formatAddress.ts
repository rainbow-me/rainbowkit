export function formatAddress(address: string): string {
  const leadingChars = 6;
  const trailingChars = 4;

  return address.length < leadingChars + trailingChars
    ? address
    : `${address.substring(0, leadingChars)}...${address.substring(
        address.length - trailingChars
      )}`;
}
