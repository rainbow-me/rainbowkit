/**
 * Adapted from https://github.com/domharrington/js-number-abbreviate
 */
const units = ['k', 'm', 'b', 't'];

export function abbreviateETHBalance(number: number): string {
  if (number < 1) return number.toFixed(3).replace(/0+$/, '');

  if (number < 10 ** 4)
    return new Intl.NumberFormat()
      .format(parseFloat(number.toFixed(1)))
      .replace(/\.0$/, '');

  const decimalsDivisor = 10 ** 1; // 1 decimal place

  let result = String(number);

  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decimalsDivisor) / size) / decimalsDivisor;

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
