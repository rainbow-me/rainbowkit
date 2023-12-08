export const arrayToJointString = (array: string[]) => array.join(',');

export const objectToQueryString = (obj: Record<string, string>) => {
  const keyValuePairs = Object.entries(obj)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key]) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`,
    );

  return keyValuePairs.join('&');
};
