import { PasswordFormValues, PasswordResult } from "@/types/password";

// Character sets
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Similar characters that might be confused
const SIMILAR_CHARS = "il1Lo0O";
// Ambiguous characters
const AMBIGUOUS_CHARS = "{}[]()/\\'\"`~,;.<>";

export function generatePasswords(
  formValues: PasswordFormValues
): PasswordResult {
  const {
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilar,
    excludeAmbiguous,
    customSymbols,
    count,
  } = formValues;

  if (length === "" || count === "") {
    throw new Error("Please enter password length and count");
  }

  if (Number(length) < 4 || Number(length) > 128) {
    throw new Error("Password length must be between 4 and 128 characters");
  }

  if (Number(count) < 1 || Number(count) > 100) {
    throw new Error("Password count must be between 1 and 100");
  }

  if (
    !includeUppercase &&
    !includeLowercase &&
    !includeNumbers &&
    !includeSymbols
  ) {
    throw new Error("At least one character type must be selected");
  }

  // Build character set
  let chars = "";
  const characterSets: string[] = [];

  if (includeUppercase) {
    chars += UPPERCASE;
    characterSets.push("Uppercase letters");
  }
  if (includeLowercase) {
    chars += LOWERCASE;
    characterSets.push("Lowercase letters");
  }
  if (includeNumbers) {
    chars += NUMBERS;
    characterSets.push("Numbers");
  }
  if (includeSymbols) {
    const symbolSet = customSymbols || SYMBOLS;
    chars += symbolSet;
    characterSets.push("Symbols");
  }

  // Remove excluded characters
  const excludedChars: string[] = [];
  if (excludeSimilar) {
    chars = chars.replace(
      new RegExp(`[${SIMILAR_CHARS.replace(/[\[\]\\-]/g, "\\$&")}]`, "g"),
      ""
    );
    excludedChars.push("Similar characters (il1Lo0O)");
  }
  if (excludeAmbiguous) {
    chars = chars.replace(
      new RegExp(`[${AMBIGUOUS_CHARS.replace(/[\[\]\\-]/g, "\\$&")}]`, "g"),
      ""
    );
    excludedChars.push("Ambiguous characters");
  }

  if (chars.length === 0) {
    throw new Error("No characters available after applying exclusions");
  }

  // Generate passwords
  const passwords: string[] = [];
  for (let i = 0; i < Number(count); i++) {
    let password = "";
    for (let j = 0; j < Number(length); j++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    passwords.push(password);
  }

  // Calculate password strength for the first password
  const strength = calculatePasswordStrength(passwords[0], chars.length);

  return {
    passwords,
    settings: {
      length: Number(length),
      characterSets,
      excludedChars: excludedChars.length > 0 ? excludedChars : undefined,
      count: Number(count),
    },
    strength,
    generatedAt: new Date(),
  };
}

export function calculatePasswordStrength(
  password: string,
  charsetSize: number
): {
  score: number;
  label: string;
  entropy: number;
} {
  const length = password.length;
  const entropy = Math.log2(Math.pow(charsetSize, length));

  let score = 0;
  let label = "";

  // Base score from entropy
  if (entropy >= 60) score += 25;
  else if (entropy >= 40) score += 20;
  else if (entropy >= 25) score += 15;
  else if (entropy >= 15) score += 10;
  else score += 5;

  // Length bonus
  if (length >= 12) score += 25;
  else if (length >= 8) score += 20;
  else if (length >= 6) score += 15;
  else score += 10;

  // Character variety bonus
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const variety = [hasUpper, hasLower, hasNumber, hasSymbol].filter(
    Boolean
  ).length;
  score += variety * 12.5;

  // Pattern penalties
  if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
  if (/123|abc|qwe/i.test(password)) score -= 15; // Common sequences

  // Determine label
  if (score >= 80) label = "Very Strong";
  else if (score >= 60) label = "Strong";
  else if (score >= 40) label = "Moderate";
  else if (score >= 20) label = "Weak";
  else label = "Very Weak";

  return {
    score: Math.min(100, Math.max(0, score)),
    label,
    entropy: Math.round(entropy * 10) / 10,
  };
}

export function generateSimplePassword(length: number): PasswordResult {
  if (length < 4 || length > 128) {
    throw new Error("Password length must be between 4 and 128 characters");
  }

  const chars = UPPERCASE + LOWERCASE + NUMBERS + SYMBOLS;
  let password = "";

  // Ensure at least one character from each type
  password += UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)];
  password += LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)];
  password += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  password += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  // Shuffle the password
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  const strength = calculatePasswordStrength(password, chars.length);

  return {
    passwords: [password],
    settings: {
      length,
      characterSets: [
        "Uppercase letters",
        "Lowercase letters",
        "Numbers",
        "Symbols",
      ],
      count: 1,
    },
    strength,
    generatedAt: new Date(),
  };
}
