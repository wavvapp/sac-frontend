export const VALIDATION_PATTERNS = {
  username: /^[a-zA-Z0-9_\.]{3,16}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // The fullname exclude special characters and numbers or extra spaces
  // Matches any alphabets from any language (including ß, Ä, Ö)
  // Is well within the 1-50 character limit
  fullName: /^(?=.{1,50}$)[\p{L}]+(?: [\p{L}]+)*$/u,
}
