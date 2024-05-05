export const isValidPassword = (value) => {
  if (value)
    return validatePassword(value) === "" ? undefined : validatePassword(value);
  else return "The password should include at least 8 characters";
};

function validatePassword(password) {
  // Check for length
  if (password.length < 8) {
    return "The password should include at least 8 characters";
  }
  if (password.length > 20) {
    return "The password should not exceed 20 characters";
  }

  // Check for numeric character
  if (!/\d/.test(password)) {
    return "The password should include at least one numeric character";
  }

  // Check for non-numeric character
  if (!/[^\d]/.test(password)) {
    return "The password should include at least one non-numeric character";
  }

  // Check for special character
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "The password should include at least one special character";
  }

  // Check for uppercase character
  if (!/[A-Z]/.test(password)) {
    return "The password should include at least one uppercase character";
  }

  // Password passes all validations
  return "";
}
