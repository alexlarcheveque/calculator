export interface PasswordFormValues {
  length: number | "";
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
  customSymbols?: string;
  count: number | "";
}

export interface PasswordResult {
  passwords: string[];
  settings: {
    length: number;
    characterSets: string[];
    excludedChars?: string[];
    count: number;
  };
  strength: {
    score: number;
    label: string;
    entropy: number;
  };
  generatedAt: Date;
}

export enum PasswordCalculatorType {
  SIMPLE = "simple",
  ADVANCED = "advanced",
}

export interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}
