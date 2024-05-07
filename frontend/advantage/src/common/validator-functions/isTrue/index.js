export const isTrue = (errorText) => (value) => {
  return value ? undefined : errorText;
};
