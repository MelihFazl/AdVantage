export const isValueNumerical = (errorText) => (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value) ? undefined : errorText;
};
