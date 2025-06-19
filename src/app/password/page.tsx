import { Metadata } from "next";
import PasswordPage from "@/components/password/PasswordPage";

export const metadata: Metadata = {
  title: "Password Generator Calculator - Create Strong Secure Passwords",
  description:
    "Generate strong, secure passwords with our free password generator. Customize length, character types, and create multiple passwords. Includes password strength analysis and security tips.",
  keywords: [
    "password generator",
    "secure password",
    "strong password",
    "random password",
    "password creator",
    "password security",
    "cybersecurity",
    "password strength",
    "unique password",
    "password manager",
  ],
};

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Password Generator</h1>
        <p className="text-base text-gray-700 max-w-4xl mx-auto mt-4">
          Create strong, secure passwords to protect your accounts. Choose from
          simple generation or advanced customization options with strength
          analysis.
        </p>
      </header>
      <PasswordPage />
    </div>
  );
}
