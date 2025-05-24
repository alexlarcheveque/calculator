import { useState } from "react";
import Script from "next/script";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
  id: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What are Auto Loans?",
    answer: (
      <>
        <p>
          Most people turn to auto loans during a vehicle purchase. They work as
          any generic, secured loan from a financial institution does with a
          typical term of 36, 60, 72, or 84 months in the U.S. Each month,
          repayment of principal and interest must be made from borrowers to
          auto loan lenders. Money borrowed from a lender that isn't paid back
          can result in the car being legally repossessed.
        </p>
      </>
    ),
    id: "auto-faq-1",
  },
  {
    question: "Dealership Financing vs. Direct Lending: What's the difference?",
    answer: (
      <>
        <p>
          Generally, there are two main financing options available when it
          comes to auto loans: direct lending or dealership financing. The
          former comes in the form of a typical loan originating from a bank,
          credit union, or financial institution. Once a contract has been
          entered with a car dealer to buy a vehicle, the loan is used from the
          direct lender to pay for the new car. Dealership financing is somewhat
          similar except that the auto loan, and thus paperwork, is initiated
          and completed through the dealership instead. Auto loans via dealers
          are usually serviced by captive lenders that are often associated with
          each car make. The contract is retained by the dealer but is often
          sold to a bank, or other financial institution called an assignee that
          ultimately services the loan.
        </p>
        <p className="mt-2">
          Direct lending provides more leverage for buyers to walk into a car
          dealer with most of the financing done on their terms, as it places
          further stress on the car dealer to compete with a better rate.
          Getting pre-approved doesn't tie car buyers down to any one
          dealership, and their propensity to simply walk away is much higher.
          With dealer financing, the potential car buyer has fewer choices when
          it comes to interest rate shopping, though it's there for convenience
          for anyone who doesn't want to spend time shopping or cannot get an
          auto loan through direct lending.
        </p>
        <p className="mt-2">
          Often, to promote auto sales, car manufacturers offer good financing
          deals via dealers. Consumers in the market for a new car should start
          their search for financing with car manufacturers. It is not rare to
          get low interest rates like 0%, 0.9%, 1.9%, or 2.9% from car
          manufacturers.
        </p>
      </>
    ),
    id: "auto-faq-2",
  },
  {
    question: "What are Vehicle Rebates?",
    answer: (
      <>
        <p>
          Car manufacturers may offer vehicle rebates to further incentivize
          buyers. Depending on the state, the rebate may or may not be taxed
          accordingly. For example, purchasing a vehicle at $50,000 with a cash
          rebate of $2,000 will have sales tax calculated based on the original
          price of $50,000, not $48,000. Luckily, a good portion of states do
          not do this and don't tax cash rebates. They are Alaska, Arizona,
          Delaware, Iowa, Kansas, Kentucky, Louisiana, Massachusetts, Minnesota,
          Missouri, Montana, Nebraska, New Hampshire, Oklahoma, Oregon,
          Pennsylvania, Rhode Island, Texas, Utah, Vermont, and Wyoming.
        </p>
        <p className="mt-2">
          Generally, rebates are only offered for new cars. While some used car
          dealers do offer cash rebates, this is rare due to the difficulty
          involved in determining the true value of the vehicle.
        </p>
      </>
    ),
    id: "auto-faq-3",
  },
  {
    question: "What common fees are associated with car purchases?",
    answer: (
      <>
        <p>
          A car purchase comes with costs other than the purchase price, the
          majority of which are fees that can normally be rolled into the
          financing of the auto loan or paid upfront. However, car buyers with
          low credit scores might be forced into paying fees upfront. The
          following is a list of common fees associated with car purchases in
          the U.S.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <b>Sales Tax:</b> Most states in the U.S. collect sales tax for auto
            purchases. It is possible to finance the cost of sales tax with the
            price of the car, depending on the state the car was purchased in.
            Alaska, Delaware, Montana, New Hampshire, and Oregon are the five
            states that don't charge sales tax.
          </li>
          <li>
            <b>Document Fees:</b> This is a fee collected by the dealer for
            processing documents like title and registration.
          </li>
          <li>
            <b>Title and Registration Fees:</b> This is the fee collected by
            states for vehicle title and registration.
          </li>
          <li>
            <b>Advertising Fees:</b> This is a fee that the regional dealer pays
            for promoting the manufacturer's automobile in the dealer's area. If
            not charged separately, advertising fees are included in the auto
            price. A typical price tag for this fee is a few hundred dollars.
          </li>
          <li>
            <b>Destination Fee:</b> This is a fee that covers the shipment of
            the vehicle from the plant to the dealer's office. This fee is
            usually between $900 and $1,500.
          </li>
          <li>
            <b>Insurance:</b> In the U.S., auto insurance is strictly mandatory
            to be regarded as a legal driver on public roads and is usually
            required before dealers can process paperwork. When a car is
            purchased via loan and not cash, full coverage insurance is often
            mandatory. Auto insurance can possibly run more than $1,000 a year
            for full coverage. Most auto dealers can provide short-term (1 or 2
            months) insurance for paperwork processing so new car owners can
            deal with proper insurance later.
          </li>
        </ul>
        <p className="mt-2">
          If the taxes and fees are bundled into the auto loan, remember to
          check the box 'Include taxes and fees in loan' in the calculator. If
          they are paid upfront instead, leave it unchecked. Should an auto
          dealer package any mysterious special charges into a car purchase, it
          would be wise to demand justification and thorough explanations for
          their inclusion.
        </p>
      </>
    ),
    id: "auto-faq-4",
  },
  {
    question: "What are some Auto Loan Strategies?",
    answer: (
      <>
        <h4 className="font-semibold mt-2">Preparation</h4>
        <p>
          Probably the most important strategy to get a great auto loan is to be
          well-prepared. This means determining what is affordable before
          heading to a dealership first. Knowing what kind of vehicle is desired
          will make it easier to research and find the best deals to suit your
          individual needs. Once a particular make and model is chosen, it is
          generally useful to have some typical going rates in mind to enable
          effective negotiations with a car salesman. This includes talking to
          more than one lender and getting quotes from several different places.
          Car dealers, like many businesses, want to make as much money as
          possible from a sale, but often, given enough negotiation, are willing
          to sell a car for significantly less than the price they initially
          offer. Getting a preapproval for an auto loan through direct lending
          can aid negotiations.
        </p>
        <h4 className="font-semibold mt-3">Credit</h4>
        <p>
          Credit, and to a lesser extent, income, generally determines approval
          for auto loans, whether through dealership financing or direct
          lending. In addition, borrowers with excellent credit will most likely
          receive lower interest rates, which will result in paying less for a
          car overall. Borrowers can improve their chances to negotiate the best
          deals by taking steps towards achieving better credit scores before
          taking out a loan to purchase a car.
        </p>
        <h4 className="font-semibold mt-3">Cash Back vs. Low Interest</h4>
        <p>
          When purchasing a vehicle, many times, auto manufacturers may offer
          either a cash vehicle rebate or a lower interest rate. A cash rebate
          instantly reduces the purchasing price of the car, but a lower rate
          can potentially result in savings in interest payments. The choice
          between the two will be different for everyone.
        </p>{" "}
        {/* Consider linking to a Cash Back vs Low Interest Calculator if available */}
        <h4 className="font-semibold mt-3">Early Payoff</h4>
        <p>
          Paying off an auto loan earlier than usual not only shortens the
          length of the loan but can also result in interest savings. However,
          some lenders have an early payoff penalty or terms restricting early
          payoff. It is important to examine the details carefully before
          signing an auto loan contract.
        </p>
        <h4 className="font-semibold mt-3">Consider Other Options</h4>
        <p>
          Although the allure of a new car can be strong, buying a pre-owned car
          even if only a few years removed from new can usually result in
          significant savings; new cars depreciate as soon as they are driven
          off the lot, sometimes by more than 10% of their values; this is
          called off-the-lot depreciation, and is an alternative option for
          prospective car buyers to consider.
        </p>
        <p className="mt-2">
          People who just want a new car for the enjoyment of driving a new car
          may also consider a lease, which is, in essence, a long-term rental
          that normally costs less upfront than a full purchase.
        </p>{" "}
        {/* Consider linking to an Auto Lease Calculator if available */}
        <p className="mt-2">
          In some cases, a car might not even be needed! If possible, consider
          public transportation, carpool with other people, bike, or walk
          instead.
        </p>
      </>
    ),
    id: "auto-faq-5",
  },
  {
    question: "What are the benefits of buying a car with cash?",
    answer: (
      <>
        <p>
          Although most car purchases are made with auto loans in the U.S.,
          there are benefits to buying a car outright with cash.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <b>Avoid Monthly Payments:</b> Paying with cash relinquishes a
            person of the responsibility of making monthly payments. This can be
            a huge emotional benefit for anyone who would prefer not to have a
            large loan looming over their head for the next few years. In
            addition, the possibility of late fees for late monthly payments no
            longer exists.
          </li>
          <li>
            <b>Avoid Interest:</b> No financing involved in the purchase of a
            car means there will be no interest charged, which will result in a
            lower overall cost to own the car.
          </li>
          <li>
            <b>Future Flexibility:</b> Because ownership of a car is 100% after
            paying in full. There aren't any restrictions on the car, such as
            the right to sell it after several months, use less expensive
            insurance coverage, and make certain modifications to the car.
          </li>
          <li>
            <b>Avoid Overbuying:</b> Paying in full with a single amount will
            limit car buyers to what is within their immediate, calculated
            budget. On the other hand, financed purchases are less concrete and
            have the potential to result in car buyers buying more than what
            they can afford long term.
          </li>
          <li>
            <b>Discounts:</b> In some cases, car purchases can come with the
            option of either an immediate rebate or low-interest financing.
            Certain rebates are only offered to cash purchases.
          </li>
          <li>
            <b>Avoid Underwater Loan:</b> When it comes to financing a
            depreciating asset, there is the chance that the loan goes
            underwater, which means more is owed on the asset than its current
            worth. Auto loans are no different, and paying in full avoids this
            scenario completely.
          </li>
        </ul>
        <p className="mt-2">
          There are a lot of benefits to paying with cash for a car purchase,
          but that doesn't mean everyone should do it. Situations exist where
          financing with an auto loan can make more sense to a car buyer, even
          if they have enough saved funds to purchase the car in a single
          payment. For example, if a very low interest rate auto loan is offered
          on a car purchase and there exist other opportunities to make greater
          investments with the funds, it might be more worthwhile to invest the
          money instead to receive a higher return. Also, a car buyer striving
          to achieve a higher credit score can choose the financing option, and
          never miss a single monthly payment on their new car in order to build
          their scores, which aid other areas of personal finance. It is up to
          each individual to determine which the right decision is.
        </p>
      </>
    ),
    id: "auto-faq-6",
  },
  {
    question: "How does Trade-in Value work with sales tax?",
    answer: (
      <>
        <p>
          A trade-in is a process of selling your vehicle to the dealership in
          exchange for credit toward purchasing another vehicle. Don't expect
          too much value when trading in old cars to dealerships. Selling old
          cars privately and using the funds for a future car purchase tends to
          result in a more financially desirable outcome.
        </p>
        <p className="mt-2">
          In most of the states that collect sales tax on auto purchases (not
          all do), the sales tax collected is based on the difference between
          the new car and trade-in price. For a $50,000 new car purchase with a
          $10,000 trade-in value, the tax paid on the new purchase with an 8%
          tax rate is: ($50,000 - $10,000) × 8% = $3,200.
        </p>
        <p className="mt-2">
          Some states do not offer any sales tax reduction with trade-ins,
          including California, District of Columbia, Hawaii, Kentucky,
          Maryland, Michigan, Montana, and Virginia. This Auto Loan Calculator
          automatically adjusts the method used to calculate sales tax involving
          Trade-in Value based on the state provided.
        </p>
        <p className="mt-2">
          Using the values from the example above, if the new car was purchased
          in a state without a sales tax reduction for trade-ins, the sales tax
          would be: $50,000 × 8% = $4,000. This comes out to be an $800
          difference which could be a reason for people selling a car in these
          states to consider a private sale.
        </p>
      </>
    ),
    id: "auto-faq-7",
  },
];

// Helper to extract text from ReactNode for JSON-LD
function extractTextFromReactNode(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (Array.isArray(node)) return node.map(extractTextFromReactNode).join("");
  if (typeof node === "object" && node !== null && "props" in node) {
    const props = (node as any).props;
    if (props && props.children) {
      return extractTextFromReactNode(props.children);
    }
  }
  return "";
}

export default function AutoLoanFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: extractTextFromReactNode(item.answer),
      },
    })),
  };

  return (
    <section className="mt-12 md:mt-16 py-8 bg-gray-50">
      <Script id="auto-loan-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions about Auto Loans
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 sm:p-5 text-left focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75"
                aria-expanded={openIndex === index}
                aria-controls={item.id}
              >
                <span className="text-md sm:text-lg font-medium text-primary-700">
                  {item.question}
                </span>
                <svg
                  className={`w-6 h-6 text-primary-600 transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
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
                  openIndex === index
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0" // Increased max-h for longer content
                }`}
              >
                <div className="p-4 sm:p-5 border-t border-gray-200 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
