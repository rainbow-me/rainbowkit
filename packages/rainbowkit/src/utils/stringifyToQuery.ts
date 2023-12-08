import qs from 'qs';

type StringToQueryParams = Record<string, any>;

const _processUndefinedValues = (obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      _processUndefinedValues(obj[key]);
    } else if (obj[key] === undefined) {
      obj[key] = '_undefined';
    }
  });
};

export const stringifyToQuery = (
  params: StringToQueryParams,
  addQueryPrefix: boolean,
) => {
  _processUndefinedValues(params);
  return qs.stringify(params, {
    addQueryPrefix,
  });
};
