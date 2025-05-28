export default function RefinanceInfo() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        What is Loan Refinancing?
      </h2>

      <div className="prose prose-gray max-w-none">
        <p className="mb-4">
          Loan refinancing involves taking out a new loan, usually with more
          favorable terms, in order to pay off an old one. Terms and conditions
          of refinancing vary widely. Refinancing is more commonly associated
          with home mortgages, car loans, or student loans.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-4">
          Common Reasons to Refinance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-600">
              Save Money
            </h4>
            <p className="text-sm text-gray-700">
              If interest rates have decreased since you got your original loan,
              refinancing can help you secure a lower rate and save money on
              interest costs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-600">
              Need Cash
            </h4>
            <p className="text-sm text-gray-700">
              Cash-out refinancing allows you to borrow against your home's
              equity and receive cash for home improvements, debt consolidation,
              or other expenses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-600">
              Lower Payments
            </h4>
            <p className="text-sm text-gray-700">
              Extending your loan term through refinancing can reduce your
              monthly payments, providing more breathing room in your budget.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2 text-blue-600">
              Shorten the Loan
            </h4>
            <p className="text-sm text-gray-700">
              Refinancing to a shorter term can help you pay off your loan
              faster and save significantly on total interest paid.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-4">
          Refinance Costs to Consider
        </h3>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li>
            <strong>Application Fee:</strong> Typically 1% of the loan amount
          </li>
          <li>
            <strong>Home Appraisal:</strong> Usually a few hundred dollars
          </li>
          <li>
            <strong>Origination Fee/Points:</strong> Normally 0-2% of the loan
            amount
          </li>
          <li>
            <strong>Title Search:</strong> A few hundred dollars for title
            verification
          </li>
          <li>
            <strong>Recording Fees:</strong> County/city paperwork handling
            charges
          </li>
          <li>
            <strong>Inspection Fees:</strong> Property condition evaluation
            costs
          </li>
        </ul>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Consider the break-even point when
            refinancing. This is how long it will take for your monthly savings
            to offset the closing costs. If you plan to move before reaching the
            break-even point, refinancing may not be beneficial.
          </p>
        </div>
      </div>
    </div>
  );
}
