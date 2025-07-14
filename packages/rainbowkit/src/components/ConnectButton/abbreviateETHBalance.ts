/**
 * Adapted from https://github.com/domharrington/js-number-abbreviate
 */
const units = ['k', 'm', 'b', 't'];

// Cache for storing compiled regular expressions
const precisionRegexCache = new Map<number, RegExp>();

export function toPrecision(number: number, precision = 1) {
  // Get or create regex for the current precision value
  let regex = precisionRegexCache.get(precision);
  if (!regex) {
    regex = new RegExp(`(.+\\.\\d{${precision}})\\d+`);
    precisionRegexCache.set(precision, regex);
  }
  
  return number
    .toString()
    .replace(regex, '$1')
    .replace(/(\.[1-9]*)0+$/, '$1')
    .replace(/\.$/, '');
}

export function abbreviateETHBalance(number: number): string {
  if (number < 1) return toPrecision(number, 3);
  if (number < 10 ** 2) return toPrecision(number, 2);
  if (number < 10 ** 4)
    return new Intl.NumberFormat().format(
      Number.parseFloat(toPrecision(number, 1)),
    );

  const decimalsDivisor = 10 ** 1; // 1 decimal place

  let result = String(number);

  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);

    if (size <= number) {
      // biome-ignore lint/style/noParameterAssign: TODO
      number = (number * decimalsDivisor) / size / decimalsDivisor;

      result = toPrecision(number, 1) + units[i];

      break;
    }
  }

  return result;
}
