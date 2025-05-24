"use client";

import { useState } from "react";
import Script from "next/script";

interface InfoSection {
  title: string;
  content: React.ReactNode;
  id: string;
}

const loanInfoItems: InfoSection[] = [
  {
    id: "loan-types-intro",
    title: "Understanding Loan Categories",
    content: (
      <p>
        A loan is a contract between a borrower and a lender in which the
        borrower receives an amount of money (principal) that they are obligated
        to pay back in the future. Most loans can be categorized into one of
        three categories: Amortized Loan, Deferred Payment Loan, and Bond. This
        calculator helps you with all three.
      </p>
    ),
  },
  {
    id: "amortized-loan",
    title: "Amortized Loan: Fixed Amount Paid Periodically",
    content: (
      <>
        <p className="mb-2">
          Many consumer loans fall into this category of loans that have regular
          payments that are amortized uniformly over their lifetime. Routine
          payments are made on principal and interest until the loan reaches
          maturity (is entirely paid off). Some of the most familiar amortized
          loans include mortgages, car loans, student loans, and personal loans.
          The word "loan" will probably refer to this type in everyday
          conversation, not the type in the second or third calculation.
        </p>
        <p>
          Instead of using this general Loan Calculator for highly specific
          needs, it may be more useful to use specialized calculators such as:
          Mortgage Calculator, Auto Loan Calculator, Student Loan Calculator,
          etc.
        </p>
      </>
    ),
  },
  {
    id: "deferred-payment-loan",
    title: "Deferred Payment Loan: Single Lump Sum Due at Loan Maturity",
    content: (
      <p>
        Many commercial loans or short-term loans are in this category. Unlike
        the first calculation, which is amortized with payments spread uniformly
        over their lifetimes, these loans have a single, large lump sum due at
        maturity. Some loans, such as balloon loans, can also have smaller
        routine payments during their lifetimes, but this calculation only works
        for loans with a single payment of all principal and interest due at
        maturity.
      </p>
    ),
  },
  {
    id: "bond-loan",
    title: "Bond: Predetermined Lump Sum Paid at Loan Maturity",
    content: (
      <>
        <p className="mb-2">
          This kind of loan is rarely made except in the form of bonds.
          Technically, bonds operate differently from more conventional loans in
          that borrowers make a predetermined payment at maturity. The face, or
          par value of a bond, is the amount paid by the issuer (borrower) when
          the bond matures, assuming the borrower doesn't default. Face value
          denotes the amount received at maturity.
        </p>
        <p className="mb-2">
          Two common bond types are coupon and zero-coupon bonds. With coupon
          bonds, lenders base coupon interest payments on a percentage of the
          face value. Coupon interest payments occur at predetermined intervals,
          usually annually or semi-annually. Zero-coupon bonds do not pay
          interest directly. Instead, borrowers sell bonds at a deep discount to
          their face value, then pay the face value when the bond matures. Users
          should note that the calculator above runs calculations for
          zero-coupon bonds.
        </p>
        <p>
          After a borrower issues a bond, its value will fluctuate based on
          interest rates, market forces, and many other factors. While this does
          not change the bond's value at maturity, a bond's market price can
          still vary during its lifetime.
        </p>
      </>
    ),
  },
  {
    id: "loan-basics",
    title: "Loan Basics for Borrowers",
    content: (
      <>
        <h4 className="text-md font-semibold mt-3 mb-1 text-gray-700">
          Interest Rate
        </h4>
        <p className="mb-2">
          Nearly all loan structures include interest, which is the profit that
          banks or lenders make on loans. Interest rate is the percentage of a
          loan paid by borrowers to lenders. For most loans, interest is paid in
          addition to principal repayment. Loan interest is usually expressed in
          APR, or annual percentage rate, which includes both interest and fees.
          The rate usually published by banks for saving accounts, money market
          accounts, and CDs is the annual percentage yield, or APY. It is
          important to understand the difference between APR and APY.
        </p>
        <h4 className="text-md font-semibold mt-3 mb-1 text-gray-700">
          Compounding Frequency
        </h4>
        <p className="mb-2">
          Compound interest is interest that is earned not only on the initial
          principal but also on accumulated interest from previous periods.
          Generally, the more frequently compounding occurs, the higher the
          total amount due on the loan. In most loans, compounding occurs
          monthly.
        </p>
        <h4 className="text-md font-semibold mt-3 mb-1 text-gray-700">
          Loan Term
        </h4>
        <p className="mb-2">
          A loan term is the duration of the loan, given that required minimum
          payments are made each month. The term of the loan can affect the
          structure of the loan in many ways. Generally, the longer the term,
          the more interest will be accrued over time, raising the total cost of
          the loan for borrowers, but reducing the periodic payments.
        </p>
      </>
    ),
  },
  {
    id: "consumer-loans",
    title: "Consumer Loans: Secured vs. Unsecured",
    content: (
      <>
        <p className="mb-2">
          There are two basic kinds of consumer loans: secured or unsecured.
        </p>
        <h4 className="text-md font-semibold mt-3 mb-1 text-gray-700">
          Secured Loans
        </h4>
        <p className="mb-2">
          A secured loan means that the borrower has put up some asset as a form
          of collateral before being granted a loan. The lender is issued a
          lien, which is a right to possession of property belonging to another
          person until a debt is paid. In other words, defaulting on a secured
          loan will give the loan issuer the legal ability to seize the asset
          that was put up as collateral. The most common secured loans are
          mortgages and auto loans.
        </p>
        <p className="mb-2">
          Lenders are generally hesitant to lend large amounts of money with no
          guarantee. Secured loans reduce the risk of the borrower defaulting
          since they risk losing whatever asset they put up as collateral. If
          the collateral is worth less than the outstanding debt, the borrower
          can still be liable for the remainder of the debt. Secured loans
          generally have a higher chance of approval.
        </p>
        <h4 className="text-md font-semibold mt-3 mb-1 text-gray-700">
          Unsecured Loans
        </h4>
        <p className="mb-2">
          An unsecured loan is an agreement to pay a loan back without
          collateral. Because there is no collateral involved, lenders need a
          way to verify the financial integrity of their borrowers. This can be
          achieved through the five C's of credit: Character, Capacity, Capital,
          Collateral (applies to secured), and Conditions.
        </p>
        <p className="mb-2">
          Unsecured loans generally feature higher interest rates, lower
          borrowing limits, and shorter repayment terms than secured loans.
          Lenders may sometimes require a co-signer. If borrowers do not repay
          unsecured loans, lenders may hire a collection agency. Examples
          include credit cards, personal loans, and student loans.
        </p>
      </>
    ),
  },
];

const SectionItem: React.FC<{
  item: InfoSection;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full py-4 px-2 text-left focus:outline-none"
      aria-expanded={isOpen}
      aria-controls={item.id}
    >
      <span className="text-lg font-medium text-gray-900">{item.title}</span>
      <svg
        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <div
      id={item.id}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-full" : "max-h-0"
      }`}
      style={{ maxHeight: isOpen ? "1000px" : "0px" }} // Ensure enough max-height for content
    >
      <div className="px-2 pb-4 text-gray-600 text-sm leading-relaxed">
        {item.content}
      </div>
    </div>
  </div>
);

export default function LoanInfoSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first section by default

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const loanInfoSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://yourwebsite.com/loan", // Replace with actual URL
    },
    headline: "Comprehensive Guide to Loans",
    description:
      "Learn about different types of loans including amortized, deferred payment, bonds, and key loan concepts.",
    author: {
      "@type": "Organization",
      name: "Calcy.net", // Replace with your organization name
    },
    publisher: {
      "@type": "Organization",
      name: "Calcy.net",
      logo: {
        "@type": "ImageObject",
        url: "https://yourwebsite.com/logo.png", // Replace with actual logo URL
      },
    },
    // It's better to represent sections if possible, or at least keywords.
    // For structured data, FAQPage might be more appropriate if structured as Q&A.
    // Given the current structure, Article is okay, and we can list sections.
    articleSection: loanInfoItems.map((item) => item.title),
    keywords:
      "loan calculator, amortized loan, deferred payment loan, bond, interest rates, loan terms, secured loans, unsecured loans",
  };

  return (
    <section className="mt-12 py-8 bg-slate-50 rounded-lg shadow">
      <Script id="loan-info-schema" type="application/ld+json">
        {JSON.stringify(loanInfoSchema)}
      </Script>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Understanding Loans
        </h2>
        {loanInfoItems.map((item, index) => (
          <SectionItem
            key={item.id}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => toggleSection(index)}
          />
        ))}
      </div>
    </section>
  );
}
