import qs from "qs";

type StringToQueryParams = Record<string, any> & {
  addQueryPrefix?: boolean;
};
export const stringifyToQuery = ({
  addQueryPrefix = false,
  ...rest
}: StringToQueryParams) => {
  Object.keys(rest).forEach((key: string) => {
    if (rest[key] === undefined) {
      rest[key] = "undefined";
    }
  });

  return qs.stringify(rest, { addQueryPrefix });
};
