export default function FractionEducation() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-start space-x-8">
        <div className="flex-1">
          <div className="mb-8">
            <img
              src="/api/placeholder/165/168"
              alt="3 over 8 fraction pie chart"
              className="float-right ml-4 mb-4 w-40 h-40 object-contain"
            />
            <p className="text-gray-700 leading-relaxed">
              In mathematics, a fraction is a number that represents a part of a
              whole. It consists of a numerator and a denominator. The numerator
              represents the number of equal parts of a whole, while the
              denominator is the total number of parts that make up said whole.
              For example, in the fraction of{" "}
              <span className="inline-block">
                <span className="block text-center border-b border-black">
                  3
                </span>
                <span className="block text-center">8</span>
              </span>
              , the numerator is 3, and the denominator is 8. A more
              illustrative example could involve a pie with 8 slices. 1 of those
              8 slices would constitute the numerator of a fraction, while the
              total of 8 slices that comprises the whole pie would be the
              denominator. If a person were to eat 3 slices, the remaining
              fraction of the pie would therefore be{" "}
              <span className="inline-block">
                <span className="block text-center border-b border-black">
                  5
                </span>
                <span className="block text-center">8</span>
              </span>{" "}
              as shown in the image to the right. Note that the denominator of a
              fraction cannot be 0, as it would make the fraction undefined.
              Fractions can undergo many different operations, some of which are
              mentioned below.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Addition:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unlike adding and subtracting integers such as 2 and 8,
                fractions require a common denominator to undergo these
                operations. One method for finding a common denominator involves
                multiplying the numerators and denominators of all of the
                fractions involved by the product of the denominators of each
                fraction. Multiplying all of the denominators ensures that the
                new denominator is certain to be a multiple of each individual
                denominator. The numerators also need to be multiplied by the
                appropriate factors to preserve the value of the fraction as a
                whole. This is arguably the simplest way to ensure that the
                fractions have a common denominator. However, in most cases, the
                solutions to these equations will not appear in simplified form
                (the provided calculator computes the simplification
                automatically). Below is an example using this method.
              </p>

              <div className="text-center bg-gray-50 p-4 rounded mb-4">
                <div className="mb-2">
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      a
                    </span>
                    <span className="block text-center">b</span>
                  </span>
                  <span className="mx-2">+</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      c
                    </span>
                    <span className="block text-center">d</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      a×d
                    </span>
                    <span className="block text-center">b×d</span>
                  </span>
                  <span className="mx-2">+</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      c×b
                    </span>
                    <span className="block text-center">d×b</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      ad + bc
                    </span>
                    <span className="block text-center">bd</span>
                  </span>
                </div>
                <div>
                  <strong>EX:</strong>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      3
                    </span>
                    <span className="block text-center">4</span>
                  </span>
                  <span className="mx-2">+</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      1
                    </span>
                    <span className="block text-center">6</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      3×6
                    </span>
                    <span className="block text-center">4×6</span>
                  </span>
                  <span className="mx-2">+</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      1×4
                    </span>
                    <span className="block text-center">6×4</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      22
                    </span>
                    <span className="block text-center">24</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      11
                    </span>
                    <span className="block text-center">12</span>
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Subtraction:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Fraction subtraction is essentially the same as fraction
                addition. A common denominator is required for the operation to
                occur. Refer to the addition section as well as the equations
                below for clarification.
              </p>

              <div className="text-center bg-gray-50 p-4 rounded mb-4">
                <div>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      a
                    </span>
                    <span className="block text-center">b</span>
                  </span>
                  <span className="mx-2">–</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      c
                    </span>
                    <span className="block text-center">d</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      ad – bc
                    </span>
                    <span className="block text-center">bd</span>
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Multiplication:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Multiplying fractions is fairly straightforward. Unlike adding
                and subtracting, it is not necessary to compute a common
                denominator in order to multiply fractions. Simply, the
                numerators and denominators of each fraction are multiplied, and
                the result forms a new numerator and denominator. If possible,
                the solution should be simplified.
              </p>

              <div className="text-center bg-gray-50 p-4 rounded mb-4">
                <div>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      a
                    </span>
                    <span className="block text-center">b</span>
                  </span>
                  <span className="mx-2">×</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      c
                    </span>
                    <span className="block text-center">d</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      ac
                    </span>
                    <span className="block text-center">bd</span>
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Division:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The process for dividing fractions is similar to that for
                multiplying fractions. In order to divide fractions, the
                fraction in the numerator is multiplied by the reciprocal of the
                fraction in the denominator. The reciprocal of a number{" "}
                <strong>a</strong> is simply{" "}
                <span className="inline-block">
                  <span className="block text-center border-b border-black">
                    1
                  </span>
                  <span className="block text-center">a</span>
                </span>
                . When a is a fraction, this essentially involves exchanging the
                position of the numerator and the denominator.
              </p>

              <div className="text-center bg-gray-50 p-4 rounded mb-4">
                <div>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      a
                    </span>
                    <span className="block text-center">b</span>
                  </span>
                  <span className="mx-2">÷</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      c
                    </span>
                    <span className="block text-center">d</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      a
                    </span>
                    <span className="block text-center">b</span>
                  </span>
                  <span className="mx-2">×</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      d
                    </span>
                    <span className="block text-center">c</span>
                  </span>
                  <span className="mx-2">=</span>
                  <span className="inline-block mx-2">
                    <span className="block text-center border-b border-black">
                      ad
                    </span>
                    <span className="block text-center">bc</span>
                  </span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Simplification:
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                It is often easier to work with simplified fractions. As such,
                fraction solutions are commonly expressed in their simplified
                forms.
                <span className="inline-block mx-1">
                  <span className="block text-center border-b border-black">
                    220
                  </span>
                  <span className="block text-center">440</span>
                </span>{" "}
                for example, is more cumbersome than{" "}
                <span className="inline-block mx-1">
                  <span className="block text-center border-b border-black">
                    1
                  </span>
                  <span className="block text-center">2</span>
                </span>
                . The calculator provided returns fraction inputs in both
                improper fraction form as well as mixed number form. In both
                cases, fractions are presented in their lowest forms by dividing
                both numerator and denominator by their greatest common factor.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Converting between fractions and decimals:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Converting from decimals to fractions is straightforward. It
                does, however, require the understanding that each decimal place
                to the right of the decimal point represents a power of 10; the
                first decimal place being 10¹, the second 10², the third 10³,
                and so on. Simply determine what power of 10 the decimal extends
                to, use that power of 10 as the denominator, enter each number
                to the right of the decimal point as the numerator, and
                simplify.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
