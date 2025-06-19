"use client";

import { useState } from "react";
import { FAQItem } from "@/types/password";

const faqData: FAQItem[] = [
  {
    id: "password-security-importance",
    question: "Why is password security so important?",
    answer: (
      <>
        <p className="mb-2">
          Password security is your first line of defense against cyber threats.
          Weak passwords can lead to identity theft, financial loss, and data
          breaches.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Identity protection:</strong> Prevents unauthorized access
            to personal accounts
          </li>
          <li>
            <strong>Financial security:</strong> Protects banking and payment
            information
          </li>
          <li>
            <strong>Data privacy:</strong> Keeps personal and professional
            information safe
          </li>
          <li>
            <strong>Reputation management:</strong> Prevents social media and
            email hijacking
          </li>
        </ul>
        <p className="text-sm">
          Strong, unique passwords are essential in today's digital world where
          cyber attacks are increasingly common.
        </p>
      </>
    ),
  },
  {
    id: "strong-password-characteristics",
    question: "What makes a password strong?",
    answer: (
      <>
        <p className="mb-2">
          A strong password combines multiple security factors to maximize
          resistance against attacks.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Length:</strong> At least 12 characters, preferably 16+ for
            high-security accounts
          </li>
          <li>
            <strong>Character variety:</strong> Mix of uppercase, lowercase,
            numbers, and symbols
          </li>
          <li>
            <strong>Unpredictability:</strong> Avoid common words, patterns, or
            personal information
          </li>
          <li>
            <strong>Uniqueness:</strong> Different password for every account
          </li>
          <li>
            <strong>No dictionary words:</strong> Avoid common words that appear
            in password cracking dictionaries
          </li>
        </ul>
        <p className="text-sm">
          Our generator creates passwords that meet all these criteria
          automatically.
        </p>
      </>
    ),
  },
  {
    id: "password-manager-benefits",
    question: "Should I use a password manager?",
    answer: (
      <>
        <p className="mb-2">
          Yes, password managers are essential for modern password security.
          They solve the impossible task of remembering hundreds of unique,
          strong passwords.
        </p>
        <p className="mb-2">
          <strong>Key benefits:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Unique passwords:</strong> Generate and store different
            passwords for every account
          </li>
          <li>
            <strong>Convenience:</strong> Auto-fill login forms and sync across
            devices
          </li>
          <li>
            <strong>Security alerts:</strong> Notify you of breached passwords
            and weak credentials
          </li>
          <li>
            <strong>Two-factor support:</strong> Many include 2FA token
            generation
          </li>
          <li>
            <strong>Secure sharing:</strong> Safely share passwords with family
            or colleagues
          </li>
        </ul>
        <p className="text-sm">
          Popular options include Bitwarden, 1Password, LastPass, and built-in
          browser managers.
        </p>
      </>
    ),
  },
  {
    id: "password-length-importance",
    question: "How long should my passwords be?",
    answer: (
      <>
        <p className="mb-2">
          Password length is one of the most important factors in password
          security. Longer passwords exponentially increase cracking time.
        </p>
        <p className="mb-2">
          <strong>Recommended lengths:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>12-14 characters:</strong> Minimum for general accounts
            (email, social media)
          </li>
          <li>
            <strong>16+ characters:</strong> High-security accounts (banking,
            work, password manager)
          </li>
          <li>
            <strong>20+ characters:</strong> Maximum security (critical systems,
            admin accounts)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Cracking time examples (with modern hardware):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>8 characters: Hours to days</li>
          <li>12 characters: Centuries to millennia</li>
          <li>16 characters: Trillions of years</li>
        </ul>
      </>
    ),
  },
  {
    id: "two-factor-authentication",
    question: "How does two-factor authentication work with passwords?",
    answer: (
      <>
        <p className="mb-2">
          Two-factor authentication (2FA) adds a second layer of security beyond
          passwords, making accounts much safer even if passwords are
          compromised.
        </p>
        <p className="mb-2">
          <strong>Common 2FA methods:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>SMS codes:</strong> Text message verification (least secure)
          </li>
          <li>
            <strong>Authenticator apps:</strong> Time-based codes from apps like
            Google Authenticator
          </li>
          <li>
            <strong>Hardware keys:</strong> Physical devices like YubiKey (most
            secure)
          </li>
          <li>
            <strong>Biometrics:</strong> Fingerprint, face, or voice recognition
          </li>
          <li>
            <strong>Push notifications:</strong> Approve login attempts on
            trusted devices
          </li>
        </ul>
        <p className="text-sm">
          Enable 2FA on all important accounts, especially email, banking, and
          password managers.
        </p>
      </>
    ),
  },
  {
    id: "password-reuse-dangers",
    question: "Why shouldn't I reuse passwords?",
    answer: (
      <>
        <p className="mb-2">
          Password reuse is one of the biggest security risks online. When one
          account is compromised, all accounts using the same password become
          vulnerable.
        </p>
        <p className="mb-2">
          <strong>Risks of password reuse:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Credential stuffing:</strong> Hackers try leaked passwords
            on other sites
          </li>
          <li>
            <strong>Data breaches:</strong> When companies are hacked, passwords
            are often exposed
          </li>
          <li>
            <strong>Chain compromises:</strong> One breach leads to multiple
            account takeovers
          </li>
          <li>
            <strong>Difficulty tracking:</strong> Hard to know which accounts
            are affected
          </li>
        </ul>
        <p className="mb-2">
          <strong>Safe practices:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use unique passwords for every account</li>
          <li>
            Check if your passwords have been breached using services like Have
            I Been Pwned
          </li>
          <li>
            Change passwords immediately after any data breach notification
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "password-storage-security",
    question: "How should I store my passwords securely?",
    answer: (
      <>
        <p className="mb-2">
          Proper password storage is crucial for maintaining security while
          ensuring accessibility.
        </p>
        <p className="mb-2">
          <strong>Secure storage methods:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Password managers:</strong> Encrypted digital vaults
            (recommended)
          </li>
          <li>
            <strong>Encrypted files:</strong> Password-protected documents for
            backup
          </li>
          <li>
            <strong>Physical notebooks:</strong> For offline storage in secure
            locations
          </li>
        </ul>
        <p className="mb-2">
          <strong>Never store passwords in:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Unencrypted text files or spreadsheets</li>
          <li>Email drafts or messages</li>
          <li>Sticky notes or visible locations</li>
          <li>Browser storage without master password</li>
          <li>Cloud storage without encryption</li>
        </ul>
        <p className="text-sm">
          Always use encrypted storage and have a backup plan for accessing
          passwords if your primary method fails.
        </p>
      </>
    ),
  },
  {
    id: "generator-security",
    question: "Is this password generator secure?",
    answer: (
      <>
        <p className="mb-2">
          Our password generator uses cryptographically secure random number
          generation and follows security best practices.
        </p>
        <p className="mb-2">
          <strong>Security features:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Client-side generation:</strong> Passwords are created in
            your browser, never sent to servers
          </li>
          <li>
            <strong>Cryptographic randomness:</strong> Uses browser's secure
            random number generator
          </li>
          <li>
            <strong>No storage:</strong> Passwords are not saved or logged
            anywhere
          </li>
          <li>
            <strong>Open calculation:</strong> Algorithm is transparent and
            auditable
          </li>
        </ul>
        <p className="mb-2">
          <strong>Additional recommendations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Generate passwords on a secure, private device</li>
          <li>Use HTTPS websites only (look for the lock icon)</li>
          <li>Clear browser history after generating sensitive passwords</li>
          <li>Consider offline password generators for maximum security</li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">
      Important Security Notice
    </h3>
    <p className="text-blue-700 text-sm">
      While our password generator creates strong passwords using secure
      methods, remember that password security is just one part of overall
      cybersecurity. Always use unique passwords for each account, enable
      two-factor authentication where available, keep software updated, and
      store passwords securely. For maximum security in high-risk environments,
      consider using offline password generators and hardware security keys.
    </p>
  </>
);

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        {disclaimer}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.question}
                  </h3>
                  <span className="text-gray-500 text-xl">
                    {openItems.has(item.id) ? "−" : "+"}
                  </span>
                </div>
              </button>
              {openItems.has(item.id) && (
                <div className="px-6 py-4 bg-white text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
