'use client';

import { useState } from 'react';

type LoanFormValues = {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
};

type LoanResults = {
  paymentAmount: number;
  totalPayments: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  payoffDate: Date;
};

export default function LoanCalculatorPage() {
  const [formValues, setFormValues] = useState<LoanFormValues>({
    loanAmount: 10000,
    interestRate: 6.5,
    loanTerm: 5,
    paymentFrequency: 'monthly',
  });

  const [results, setResults] = useState<LoanResults | null>(null);

  const handleInputChange = (name: string, value: any) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const calculateLoan = () => {
    const { loanAmount, interestRate, loanTerm, paymentFrequency } = formValues;
    
    // Convert interest rate to monthly rate
    const monthlyRate = (interestRate / 100) / 12;
    
    // Calculate total payments based on frequency
    let paymentsPerYear = 12; // monthly
    if (paymentFrequency === 'bi-weekly') paymentsPerYear = 26;
    if (paymentFrequency === 'weekly') paymentsPerYear = 52;
    
    const totalPayments = Math.round(loanTerm * paymentsPerYear);
    
    // Calculate payment amount using the loan formula
    const paymentRate = monthlyRate * 12 / paymentsPerYear;
    const paymentAmount = loanAmount * (paymentRate * Math.pow(1 + paymentRate, totalPayments)) / 
      (Math.pow(1 + paymentRate, totalPayments) - 1);
    
    // Calculate total amount paid
    const totalAmountPaid = paymentAmount * totalPayments;
    
    // Calculate total interest paid
    const totalInterestPaid = totalAmountPaid - loanAmount;
    
    // Calculate payoff date
    const payoffDate = new Date();
    payoffDate.setFullYear(payoffDate.getFullYear() + loanTerm);
    
    setResults({
      paymentAmount,
      totalPayments,
      totalInterestPaid,
      totalAmountPaid,
      payoffDate,
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Loan Calculator</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Calculate your loan payments and see the total interest you'll pay over the life of the loan.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  id="loanAmount"
                  className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formValues.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="number"
                  id="interestRate"
                  className="block w-full pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formValues.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  step="0.01"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">
                Loan Term (years)
              </label>
              <input
                type="number"
                id="loanTerm"
                className="block w-full py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formValues.loanTerm}
                onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
              />
            </div>

            <div>
              <label htmlFor="paymentFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Frequency
              </label>
              <select
                id="paymentFrequency"
                className="block w-full py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formValues.paymentFrequency}
                onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <button
              type="button"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={calculateLoan}
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8">
          {results ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Your {formValues.paymentFrequency} payment</p>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.paymentAmount)}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total interest paid</p>
                  <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.totalInterestPaid)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total payments</p>
                  <p className="text-base font-semibold">{results.totalPayments}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Total amount paid</p>
                  <p className="text-base font-semibold">{formatCurrency(results.totalAmountPaid)}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Payoff date</p>
                  <p className="text-base font-semibold">
                    {results.payoffDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-md font-medium mb-2">Amortization schedule coming soon!</h3>
                <p className="text-gray-600 text-sm">
                  We're working on adding a detailed payment schedule to help you track your loan payoff progress.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-white p-8 rounded-lg shadow-md">
              <div className="text-center">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No calculation yet</h3>
                <p className="mt-1 text-gray-500">Fill out the form and click Calculate to see your loan details.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-2">How is the loan payment calculated?</h3>
            <p className="text-gray-600">
              We use the standard loan amortization formula: PMT = P × (r × (1 + r)^n) ÷ ((1 + r)^n - 1), where P is the principal, r is the periodic interest rate, and n is the number of payments.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-2">What's the difference between payment frequencies?</h3>
            <p className="text-gray-600">
              Monthly payments are made once a month (12 payments per year). Bi-weekly payments are made every two weeks (26 payments per year), and weekly payments are made every week (52 payments per year). More frequent payments can help you pay off your loan faster and reduce the total interest paid.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-2">Does this calculator account for fees or other charges?</h3>
            <p className="text-gray-600">
              No, this basic calculator only accounts for the principal loan amount and interest. It doesn't include origination fees, processing fees, or other charges that may be associated with your loan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 