"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the fertile window?",
    answer:
      "The fertile window is the three-day window during which the probability of a woman conceiving is highest. Conception is usually defined as the initiation of pregnancy, when an egg is fertilized. Sperm remains viable inside a woman's body for up to 5 days (possibly 7 days in some cases). As such, when attempting to conceive, regular sexual intercourse 5 days before as well as on the day of ovulation, can increase the probability of successfully conceiving.",
  },
  {
    question: "How accurate is this conception calculator?",
    answer:
      "This calculator provides estimates based on average menstrual cycle patterns. It assumes ovulation occurs 14 days before your next period, which is typical for a 28-day cycle. However, individual cycles can vary significantly. For more accurate tracking, consider monitoring your basal body temperature and cervical mucus changes.",
  },
  {
    question: "When is the best time to try to conceive?",
    answer:
      "The best time to try to conceive is during your fertile window, particularly the last 3 days before ovulation and the day of ovulation. Studies have shown that sexual intercourse during this period will result in pregnancy in approximately 30% of cases. Regular lovemaking 2-3 times a week throughout your cycle is also recommended.",
  },
  {
    question: "How long can sperm survive in the female body?",
    answer:
      "Sperm can survive in the female reproductive tract for up to 5 days, and in some cases up to 7 days. This is why the fertile window extends several days before ovulation. The presence of fertile-quality cervical mucus helps protect sperm and extend their lifespan.",
  },
  {
    question: "What if my cycles are irregular?",
    answer:
      "If your cycles are irregular, this calculator may be less accurate. Irregular cycles can make it difficult to predict ovulation. Consider tracking your basal body temperature, cervical mucus changes, or using ovulation predictor kits. If you have consistently irregular cycles, consult with a healthcare provider.",
  },
  {
    question: "How can I track my fertility more accurately?",
    answer:
      "For more accurate fertility tracking, monitor your basal body temperature daily, observe cervical mucus changes, and consider using ovulation predictor kits. Your basal body temperature rises by about 0.5-1 degree Fahrenheit after ovulation. Cervical mucus becomes clear and stretchy (like egg white) around ovulation.",
  },
  {
    question: "What role does regular lovemaking play in conception?",
    answer:
      "Regular lovemaking prepares the woman's body for childbearing and raises hormonal levels associated with fertility. It also creates more favorable vaginal conditions and helps ensure you don't miss your fertile window. Experts recommend having sex every two days as a minimum when trying to conceive.",
  },
  {
    question: "When should I take a pregnancy test?",
    answer:
      "For the most accurate results, wait until at least the first day of your missed period to take a pregnancy test. Some sensitive tests can detect pregnancy hormones as early as 6-8 days after ovulation, but waiting longer reduces the chance of a false negative result.",
  },
];

export default function ConceptionFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              <span className="ml-6 flex-shrink-0">
                {openItems.includes(index) ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </button>

            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Information Sections */}
      <div className="mt-8 space-y-6">
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Making the Fertility Window Work for You
          </h3>
          <div className="prose prose-sm text-gray-700">
            <p>
              With a pattern of regular lovemaking achieved, the next thing to
              do is identify that handful of days directly prior to, and
              including the day of ovulation. Identifying this "window" will
              significantly boost your chances of conception.
            </p>
            <p>
              The above conception calculator can help with the process of
              tracking your personal biological cycle, and thereby assist you in
              determining your fertility window. To use the calculator, note the
              first day of your last period. Then note the length of the cycle
              until your next period. Finally, input the numbers into the
              calculator and get an estimate of the best days for intercourse
              and conception.
            </p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Love and Childbearing
          </h3>
          <div className="prose prose-sm text-gray-700">
            <p>
              The desire to have a child is all about love for your partner, and
              for the child you will watch grow up. Deep as this desire is in
              most couples, life often gets in the way. We stress and worry as a
              result of work, and spend most of our time dealing with day-to-day
              distractions and chores.
            </p>
            <p>
              Yet, the first thing to know when you are trying to have a baby is
              that regular sex with your partner is the best preparation of all.
              When you are trying to have a baby, you should make love regularly
              - at least 2 to 3 times a week - even when you do not necessarily
              believe you are fertile or are near your ovulation day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
