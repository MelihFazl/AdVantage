export const isValidEmail = (errorText) => (value) => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  return value ? (emailRegex.test(value) ? undefined : errorText) : undefined;
};
