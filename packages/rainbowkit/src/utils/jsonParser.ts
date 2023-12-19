// Depending the build run time the json might be a text or object
export const jsonParser = (json: any) => {
  return typeof json === 'string' ? JSON.parse(json) : json;
};
