export const isFieldEmpty = (errorText) => (value) => {
  var temp;
  if (value) {
    temp = value.replace(/\s+/, "");
    temp = temp.replace(/\r?\n|\r/g, "");
  }
  return temp ? (temp === "" ? errorText : undefined) : errorText;
};
