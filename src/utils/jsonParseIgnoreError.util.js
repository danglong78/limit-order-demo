export const jsonParseIgnoreError = (string) => {
  try {
    return JSON.parse(string);
  } catch (error) {
    return {};
  }
};
