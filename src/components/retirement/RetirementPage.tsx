"use client";

import { useState, useEffect } from "react";
import RetirementForm from "@/components/retirement/RetirementForm";
import RetirementSummary from "@/components/retirement/RetirementSummary";
import SavingsForm from "@/components/retirement/SavingsForm";
import SavingsSummary from "@/components/retirement/SavingsSummary";
import WithdrawalForm from "@/components/retirement/WithdrawalForm";
import WithdrawalSummary from "@/components/retirement/WithdrawalSummary";
import DurationForm from "@/components/retirement/DurationForm";
import DurationSummary from "@/components/retirement/DurationSummary";
import RetirementFAQ from "@/components/retirement/RetirementFAQ";
import {
  calculateRetirement,
  calculateSavingsNeeded,
  calculateWithdrawalAmount,
  calculateMoneyDuration,
} from "@/utils/retirementCalculations";
import {
  RetirementFormValues,
  RetirementResults,
  SavingsFormValues,
  SavingsResults,
  WithdrawalFormValues,
  WithdrawalResults,
  DurationFormValues,
  DurationResults,
  IncomeAfterRetirementUnit,
  FutureSavingsUnit,
} from "@/types/retirement";

export type RetirementCalculatorType =
  | "needs"
  | "savings"
  | "withdrawal"
  | "duration";

export default function RetirementPage() {
  const [calculatorType, setCalculatorType] =
    useState<RetirementCalculatorType>("needs");

  // Calculator 1: How much do you need to retire?
  const [retirementFormValues, setRetirementFormValues] =
    useState<RetirementFormValues>({
      currentAge: 35,
      retirementAge: 67,
      lifeExpectancy: 85,
      currentIncome: 70000,
      incomeIncrease: 3,
      incomeAfterRetirement: 75,
      incomeAfterRetirementUnit: IncomeAfterRetirementUnit.PERCENTAGE,
      averageInvestmentReturn: 6,
      inflationRate: 3,
      otherIncomeAfterRetirement: 0,
      currentRetirementSavings: 30000,
      futureSavings: 10,
      futureSavingsUnit: FutureSavingsUnit.PERCENTAGE,
    });

  const [retirementResults, setRetirementResults] =
    useState<RetirementResults | null>(null);

  // Calculator 2: How can you save for retirement?
  const [savingsFormValues, setSavingsFormValues] = useState<SavingsFormValues>(
    {
      currentAge: 35,
      retirementAge: 67,
      amountNeededAtRetirement: 600000,
      currentRetirementSavings: 30000,
      averageInvestmentReturn: 6,
    }
  );

  const [savingsResults, setSavingsResults] = useState<SavingsResults | null>(
    null
  );

  // Calculator 3: How much can you withdraw after retirement?
  const [withdrawalFormValues, setWithdrawalFormValues] =
    useState<WithdrawalFormValues>({
      currentAge: 35,
      retirementAge: 67,
      lifeExpectancy: 85,
      currentRetirementSavings: 30000,
      annualContribution: 0,
      monthlyContribution: 500,
      averageInvestmentReturn: 6,
      inflationRate: 3,
    });

  const [withdrawalResults, setWithdrawalResults] =
    useState<WithdrawalResults | null>(null);

  // Calculator 4: How long can your money last?
  const [durationFormValues, setDurationFormValues] =
    useState<DurationFormValues>({
      currentAmount: 600000,
      monthlyWithdrawal: 5000,
      averageInvestmentReturn: 6,
    });

  const [durationResults, setDurationResults] =
    useState<DurationResults | null>(null);

  // Calculate retirement needs
  useEffect(() => {
    if (calculatorType !== "needs") return;

    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentIncome,
      incomeIncrease,
      incomeAfterRetirement,
      incomeAfterRetirementUnit,
      averageInvestmentReturn,
      inflationRate,
      otherIncomeAfterRetirement,
      currentRetirementSavings,
      futureSavings,
      futureSavingsUnit,
    } = retirementFormValues;

    if (
      currentAge >= retirementAge ||
      retirementAge >= lifeExpectancy ||
      currentIncome <= 0 ||
      averageInvestmentReturn < 0 ||
      inflationRate < 0
    ) {
      return;
    }

    const results = calculateRetirement({
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentIncome,
      incomeIncrease,
      incomeAfterRetirement,
      incomeAfterRetirementUnit,
      averageInvestmentReturn,
      inflationRate,
      otherIncomeAfterRetirement,
      currentRetirementSavings,
      futureSavings,
      futureSavingsUnit,
    });

    setRetirementResults(results);
  }, [retirementFormValues, calculatorType]);

  // Calculate savings needed
  useEffect(() => {
    if (calculatorType !== "savings") return;

    const {
      currentAge,
      retirementAge,
      amountNeededAtRetirement,
      currentRetirementSavings,
      averageInvestmentReturn,
    } = savingsFormValues;

    if (
      currentAge >= retirementAge ||
      amountNeededAtRetirement <= 0 ||
      averageInvestmentReturn < 0
    ) {
      return;
    }

    const results = calculateSavingsNeeded(savingsFormValues);
    setSavingsResults(results);
  }, [savingsFormValues, calculatorType]);

  // Calculate withdrawal amount
  useEffect(() => {
    if (calculatorType !== "withdrawal") return;

    const {
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentRetirementSavings,
      annualContribution,
      monthlyContribution,
      averageInvestmentReturn,
      inflationRate,
    } = withdrawalFormValues;

    if (
      currentAge >= retirementAge ||
      retirementAge >= lifeExpectancy ||
      averageInvestmentReturn < 0 ||
      inflationRate < 0
    ) {
      return;
    }

    const results = calculateWithdrawalAmount(withdrawalFormValues);
    setWithdrawalResults(results);
  }, [withdrawalFormValues, calculatorType]);

  // Calculate money duration
  useEffect(() => {
    if (calculatorType !== "duration") return;

    const { currentAmount, monthlyWithdrawal, averageInvestmentReturn } =
      durationFormValues;

    if (
      currentAmount <= 0 ||
      monthlyWithdrawal <= 0 ||
      averageInvestmentReturn < 0
    ) {
      return;
    }

    const results = calculateMoneyDuration(durationFormValues);
    setDurationResults(results);
  }, [durationFormValues, calculatorType]);

  const handleRetirementInputChange = (
    name: string,
    value: number | IncomeAfterRetirementUnit | FutureSavingsUnit
  ) => {
    setRetirementFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavingsInputChange = (name: string, value: number) => {
    setSavingsFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleWithdrawalInputChange = (name: string, value: number) => {
    setWithdrawalFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDurationInputChange = (name: string, value: number) => {
    setDurationFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculatorTypeChange = (type: RetirementCalculatorType) => {
    setCalculatorType(type);
  };

  const getTabTitle = (type: RetirementCalculatorType) => {
    switch (type) {
      case "needs":
        return "Retirement Needs";
      case "savings":
        return "Savings Plan";
      case "withdrawal":
        return "Withdrawal Amount";
      case "duration":
        return "Money Duration";
      default:
        return "";
    }
  };

  const getTabDescription = (type: RetirementCalculatorType) => {
    switch (type) {
      case "needs":
        return "Calculate how much you need to save for retirement based on your income and lifestyle goals.";
      case "savings":
        return "Determine how much you need to save monthly to reach your retirement goal.";
      case "withdrawal":
        return "Find out how much you can withdraw monthly during retirement.";
      case "duration":
        return "See how long your retirement savings will last at your current withdrawal rate.";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 border-b">
        {(
          [
            "needs",
            "savings",
            "withdrawal",
            "duration",
          ] as RetirementCalculatorType[]
        ).map((type) => (
          <button
            key={type}
            onClick={() => handleCalculatorTypeChange(type)}
            className={`px-4 py-2 text-lg font-medium focus:outline-none whitespace-nowrap
                        ${
                          calculatorType === type
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
          >
            {getTabTitle(type)}
          </button>
        ))}
      </div>

      {/* Tab Description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {getTabTitle(calculatorType)}
        </h2>
        <p className="text-gray-600">{getTabDescription(calculatorType)}</p>
      </div>

      {/* Calculator Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {calculatorType === "needs" && (
            <RetirementForm
              values={retirementFormValues}
              onChange={handleRetirementInputChange}
            />
          )}
          {calculatorType === "savings" && (
            <SavingsForm
              values={savingsFormValues}
              onChange={handleSavingsInputChange}
            />
          )}
          {calculatorType === "withdrawal" && (
            <WithdrawalForm
              values={withdrawalFormValues}
              onChange={handleWithdrawalInputChange}
            />
          )}
          {calculatorType === "duration" && (
            <DurationForm
              values={durationFormValues}
              onChange={handleDurationInputChange}
            />
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          {calculatorType === "needs" && retirementResults && (
            <RetirementSummary results={retirementResults} />
          )}
          {calculatorType === "savings" && savingsResults && (
            <SavingsSummary results={savingsResults} />
          )}
          {calculatorType === "withdrawal" && withdrawalResults && (
            <WithdrawalSummary results={withdrawalResults} />
          )}
          {calculatorType === "duration" && durationResults && (
            <DurationSummary results={durationResults} />
          )}

          {/* Show message when no results */}
          {((calculatorType === "needs" && !retirementResults) ||
            (calculatorType === "savings" && !savingsResults) ||
            (calculatorType === "withdrawal" && !withdrawalResults) ||
            (calculatorType === "duration" && !durationResults)) && (
            <p className="text-center text-gray-500 md:mt-20">
              Enter details to see the results update automatically.
            </p>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <RetirementFAQ />

      {/* SEO Educational Content */}
      <div className="mt-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            What is Retirement?
          </h2>

          <div className="prose prose-gray max-w-none">
            <p className="mb-4">
              To retire is to withdraw from active working life, and for most
              retirees, retirement lasts the rest of their lives.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">Why Retire?</h3>
            <p className="mb-4">
              There are many factors at play that ultimately affect a person's
              decision to retire. Physical or mental health can affect a
              person's decision to retire; if a worker is not physically strong
              enough, succumbs to a disability, or has mentally declined too
              much to perform the duties of their job, they should probably
              consider retiring, or at the very least try to find a new
              occupation that better accommodates their health. Also, stressors
              associated with an occupation can become too unbearable, leading
              to a decline in satisfaction with work. Age is also a factor that
              affects a person's decision to retire. Theoretically, retirement
              can happen during any normal working year. Some may choose to
              "semi-retire" by gradually decreasing their work hours as they
              approach retirement. Some announce retirement and enter it
              short-term, just to rejoin the workforce again. However, it
              generally occurs between the ages of 55 and 70.
            </p>
            <p className="mb-4">
              One of the most important factors that affect a person's decision
              to retire is whether it is even financially possible in the first
              place. While it is somewhat possible to retire with nothing in
              savings and to rely solely on Social Security (which an
              unfortunately significant number of Americans in the U.S. do), it
              is generally a bad idea for most due to the sheer difference
              between a working income as opposed to the Social Security
              benefits. In the U.S., Social Security benefits are only designed
              to replace about 40% of the average worker's wages during
              retirement.
            </p>
            <p className="mb-6">
              Retirement is an important consideration for everyone, and when
              not forced to retire due to various reasons such as illness or
              disability, most people choose to retire when they are ready and
              comfortable with the decision.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              How Much to Save for Retirement
            </h2>
            <p className="mb-4">
              Naturally, the next question becomes: how much should a person
              save for retirement? Simply put, it's an extremely loaded question
              with very few definite answers. Similar to the answer to the
              question of whether to retire or not, it will depend on each
              person, and factors such as how much income will be needed,
              entitlement for Social Security retirement benefits, health and
              life expectancy, personal preferences regarding inheritances, and
              many other things.
            </p>
            <p className="mb-4">Below are some general guidelines.</p>

            <h3 className="text-xl font-semibold mt-6 mb-4">10% Rule</h3>
            <p className="mb-4">
              This rule suggests that a person save 10% to 15% of their pre-tax
              income per year during their working years. For instance, a person
              who makes $50,000 a year would put away anywhere from $5,000 to
              $7,500 for that year. Roughly speaking, by saving 10% starting at
              age 25, a $1 million nest egg by the time of retirement is
              possible.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">80% Rule</h3>
            <p className="mb-4">
              Another popular rule suggests that an income of 70% to 80% of a
              worker's pre-retirement income can maintain a retiree's standard
              of living after retirement. For example, if a person made roughly
              $100,000 a year on average during his working life, this person
              can have a similar standard of living with $70,000 - $80,000 a
              year of income after retirement. This 70% - 80% figure can vary
              greatly depending on how people envision their retirements. Some
              retirees want to sail a yacht around the world, while others want
              to live in a simple cabin in the woods.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">4% Rule</h3>
            <p className="mb-4">
              People who have a good estimate of how much they will require a
              year in retirement can divide this number by 4% to determine the
              nest egg required to enable their lifestyle. For instance, if a
              retiree estimates they need $100,000 a year, according to the 4%
              rule, the nest egg required is $100,000 / 4% = $2.5 million.
            </p>
            <p className="mb-6">
              Some experts claim that savings of 15 to 25 times of a person's
              current annual income are enough to last them throughout their
              retirement. Of course, there are other ways to determine how much
              to save for retirement. The calculations here can be helpful, as
              can many other retirement calculators out there. It also can be
              helpful to speak with licensed professionals who help people plan
              their retirements.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">
              Impact of Inflation on Retirement Savings
            </h3>
            <p className="mb-6">
              Inflation is the general increase in prices and a fall in the
              purchasing power of money over time. The average inflation rate in
              the United States for the past 30 years has been around 2.6% per
              year, which means that the purchasing power of one dollar now is
              not only less than one dollar 30 years ago but less than 50 cents!
              Inflation is one of the reasons why people tend to underestimate
              how much they need to save for retirement.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Common Sources of Retirement Funds
            </h2>
            <p className="mb-4">
              People in the U.S. generally rely on the following sources for
              financial support after retirement.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">Social Security</h3>
            <p className="mb-4">
              Social Security is a social insurance program run by the
              government to provide protection against poverty, old age, and
              disability. People in the U.S. who have contributed to the Federal
              Insurance Contributions Act (FICA) tax as withholdings from
              payroll will receive some of their income in the form of Social
              Security benefits during retirement. In the U.S., Social Security
              was designed to replace approximately 40% of a person's working
              income. Yet, approximately one-third of the working population and
              50% of retirees expect Social Security to be their major source of
              income after retirement.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4">
              Pensions, 401(k)s, Individual Retirement Accounts (IRA), and Other
              Savings Plans
            </h3>
            <p className="mb-4">
              <strong>401(k), 403(b), 457 Plan</strong>
            </p>
            <p className="mb-4">
              In the U.S., two of the most popular ways to save for retirement
              include Employer Matching Programs such as the 401(k) and their
              offshoot, the 403(b) (nonprofit, religious organizations, school
              districts, governmental organizations). 401(k)s vary from company
              to company, but many employers offer a matching contribution up to
              a certain percentage of the gross income of the employee.
            </p>
            <p className="mb-4">
              <strong>IRA and Roth IRA</strong>
            </p>
            <p className="mb-4">
              In the U.S., the traditional IRA (Individual Retirement Account)
              and Roth IRA are also popular forms of retirement savings. Just
              like 401(k)s and other employer matching programs, there are
              specific tax shields in place that make them both appealing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
