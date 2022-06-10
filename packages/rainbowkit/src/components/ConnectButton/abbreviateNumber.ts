/**
 * Adapted from https://github.com/domharrington/js-number-abbreviate
 */
const units = ['k', 'm', 'b', 't'];

export function abbreviateNumber(number: number, decimals: number = 1): string {
  if (number < 10 ** 4)
    return new Intl.NumberFormat()
      .format(parseFloat(number.toFixed(decimals)))
      .replace(/\.0$/, '');

  decimals = 10 ** decimals;

  let result = String(number);

  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decimals) / size) / decimals;

      // round up
      if (number === 1000 && i < units.length - 1) {
        number = 1;
        i++;
      }

      result = number + units[i];

      break;
    }
  }

  return result;
}
