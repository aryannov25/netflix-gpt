export const validateSignInData = (email, password) => {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordOk = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password);

  if (!emailOk) return "Enter a valid email address.";
  if (!passwordOk) return "Password must be 6+ chars with a letter and number.";
  return null;
};

export const validateSignUpData = (name, email, password) => {
  if (!name || name.trim().length < 2) return "Enter your name.";
  return validateSignInData(email, password);
};
