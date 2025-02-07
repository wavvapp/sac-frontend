export const VALIDATION_PATTERNS = {
  username: /^[a-zA-Z0-9_\.]{3,16}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  fullName: /^[a-zA-Z ]{1,50}$/,
  verificationCode: /^\d{6}$/,
  numericValues: /[^0-9]/g,
}
