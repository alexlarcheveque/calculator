"use client";

import FAQSection, { FAQItem } from "../ui/FAQSection";

const faqData: FAQItem[] = [
  {
    id: "what-is-concrete-composition",
    question: "What is concrete and what are its main components?",
    answer: (
      <>
        <p className="mb-2">
          Concrete is a composite construction material made from a mixture of
          aggregate (sand, gravel, crushed stone), cement, water, and often
          chemical admixtures. When mixed properly, these components create a
          durable, versatile building material.
        </p>
        <p className="mb-2">
          <strong>Main concrete components:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Cement (10-15%):</strong> Portland cement acts as the
            binding agent
          </li>
          <li>
            <strong>Water (15-20%):</strong> Activates cement and provides
            workability
          </li>
          <li>
            <strong>Fine aggregate (25-30%):</strong> Sand fills voids and
            provides density
          </li>
          <li>
            <strong>Coarse aggregate (40-50%):</strong> Gravel or crushed stone
            provides strength
          </li>
        </ul>
        <p className="mb-2">
          <strong>Common concrete mix ratios:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <strong>General purpose:</strong> 1 part cement : 2 parts sand : 3
            parts gravel : 0.5 parts water
          </li>
          <li>
            <strong>High strength:</strong> 1 part cement : 1.5 parts sand : 2.5
            parts gravel : 0.4 parts water
          </li>
          <li>
            <strong>Foundation:</strong> 1 part cement : 2.5 parts sand : 3.5
            parts gravel : 0.5 parts water
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "concrete-bag-coverage-calculations",
    question:
      "How do I calculate concrete coverage and how many bags do I need?",
    answer: (
      <>
        <p className="mb-2">
          Calculating concrete coverage depends on bag size, project dimensions,
          and desired thickness. Always order 5-10% extra to account for waste
          and spillage.
        </p>
        <p className="mb-2">
          <strong>Standard bag coverage rates:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>40lb bag:</strong> Covers 0.27 cubic feet (3" thick: 1.3 sq
            ft)
          </li>
          <li>
            <strong>60lb bag:</strong> Covers 0.45 cubic feet (3" thick: 2.2 sq
            ft)
          </li>
          <li>
            <strong>80lb bag:</strong> Covers 0.60 cubic feet (3" thick: 2.9 sq
            ft)
          </li>
          <li>
            <strong>90lb bag:</strong> Covers 0.65 cubic feet (3" thick: 3.1 sq
            ft)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Calculation example for 10' × 10' patio, 4" thick:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>Volume needed: 10 × 10 × (4÷12) = 33.33 cubic feet</li>
          <li>Using 80lb bags: 33.33 ÷ 0.60 = 56 bags needed</li>
          <li>Add 10% waste: 56 + 6 = 62 bags total</li>
          <li>Cost estimate: 62 bags × $5 = $310</li>
        </ul>
        <p className="text-sm">
          <strong>Pro tip:</strong> For projects over 2 cubic yards, consider
          ready-mix delivery for cost efficiency.
        </p>
      </>
    ),
  },
  {
    id: "concrete-mixing-ratios-strength",
    question:
      "What are the proper mixing ratios for different concrete strengths?",
    answer: (
      <>
        <p className="mb-2">
          Concrete strength is measured in PSI (pounds per square inch) and
          depends on the cement-to-water ratio, aggregate quality, and proper
          mixing. Lower water-to-cement ratios produce stronger concrete.
        </p>
        <p className="mb-2">
          <strong>Concrete strength classifications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>2,500 PSI:</strong> Residential footings, driveways (1:3:4
            ratio)
          </li>
          <li>
            <strong>3,000 PSI:</strong> Slabs, sidewalks, patios (1:2.5:3 ratio)
          </li>
          <li>
            <strong>3,500 PSI:</strong> Foundation walls, beams (1:2:3 ratio)
          </li>
          <li>
            <strong>4,000+ PSI:</strong> Commercial structures (1:1.5:2.5 ratio)
          </li>
        </ul>
        <p className="mb-2">
          <strong>Water-to-cement ratio guidelines:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>0.4-0.45: High strength (4,000+ PSI)</li>
          <li>0.45-0.55: Medium strength (3,000-3,500 PSI)</li>
          <li>0.55-0.65: Standard strength (2,500-3,000 PSI)</li>
        </ul>
        <p className="mb-2">
          <strong>Mixing process for quality concrete:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Mix dry ingredients first for 2-3 minutes</li>
          <li>Add water gradually while mixing</li>
          <li>Mix for 3-5 minutes until uniform consistency</li>
          <li>
            Use immediately - concrete begins setting within 30-60 minutes
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "concrete-curing-process-timeline",
    question:
      "How long does concrete take to cure and what affects curing time?",
    answer: (
      <>
        <p className="mb-2">
          Concrete curing is the chemical process where cement reacts with water
          to form strong bonds. Proper curing significantly affects final
          strength and durability.
        </p>
        <p className="mb-2">
          <strong>Concrete curing timeline:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>1 day:</strong> 16% strength, initial set complete
          </li>
          <li>
            <strong>3 days:</strong> 40% strength, forms can be removed
          </li>
          <li>
            <strong>7 days:</strong> 65% strength, light foot traffic possible
          </li>
          <li>
            <strong>14 days:</strong> 80% strength, normal use can begin
          </li>
          <li>
            <strong>28 days:</strong> 90% strength, design strength reached
          </li>
          <li>
            <strong>1 year:</strong> 100% strength, full strength achieved
          </li>
        </ul>
        <p className="mb-2">
          <strong>Factors affecting curing speed:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Temperature:</strong> Higher temps cure faster (70-80°F
            optimal)
          </li>
          <li>
            <strong>Humidity:</strong> Moist conditions improve strength
            development
          </li>
          <li>
            <strong>Cement type:</strong> Rapid-set formulas cure faster
          </li>
          <li>
            <strong>Thickness:</strong> Thicker sections retain heat and cure
            faster
          </li>
        </ul>
        <p className="text-sm">
          <strong>Best practices:</strong> Keep concrete moist for first 7 days,
          protect from freezing for 28 days, and maintain temperatures above
          50°F.
        </p>
      </>
    ),
  },
  {
    id: "concrete-project-types-applications",
    question:
      "What are the different types of concrete projects and their requirements?",
    answer: (
      <>
        <p className="mb-2">
          Different concrete projects require specific mix designs, thickness
          requirements, and finishing techniques based on their intended use and
          load requirements.
        </p>
        <p className="mb-2">
          <strong>Residential concrete projects:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Driveways:</strong> 4-6" thick, 3,000 PSI, reinforced with
            mesh
          </li>
          <li>
            <strong>Sidewalks:</strong> 4" thick, 2,500 PSI, control joints
            every 4-6 feet
          </li>
          <li>
            <strong>Patios:</strong> 3-4" thick, 2,500 PSI, decorative finishes
            available
          </li>
          <li>
            <strong>Foundation footings:</strong> 8-12" wide, 3,000 PSI, below
            frost line
          </li>
        </ul>
        <p className="mb-2">
          <strong>Commercial concrete applications:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Parking lots:</strong> 6-8" thick, 3,500 PSI, heavy-duty
            reinforcement
          </li>
          <li>
            <strong>Industrial floors:</strong> 6-12" thick, 4,000+ PSI, fiber
            reinforced
          </li>
          <li>
            <strong>Retaining walls:</strong> Variable thickness, 3,000+ PSI,
            proper drainage
          </li>
          <li>
            <strong>Loading docks:</strong> 8-10" thick, 4,000+ PSI, steel
            reinforced
          </li>
        </ul>
        <p className="mb-2">
          <strong>Specialized concrete shapes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Slabs, steps, curbs, round columns, tubes, and custom forms</li>
          <li>Each requires specific formwork and reinforcement planning</li>
          <li>Consider access for concrete delivery and finishing equipment</li>
        </ul>
      </>
    ),
  },
  {
    id: "concrete-cost-estimation-budgeting",
    question: "How do I estimate concrete costs for my project?",
    answer: (
      <>
        <p className="mb-2">
          Concrete costs vary by region, project size, and complexity.
          Understanding cost factors helps create accurate project budgets and
          choose between bagged and ready-mix options.
        </p>
        <p className="mb-2">
          <strong>Bagged concrete costs (2024 estimates):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>40lb bags:</strong> $3-5 each, covers 0.27 cubic feet
          </li>
          <li>
            <strong>60lb bags:</strong> $4-6 each, covers 0.45 cubic feet
          </li>
          <li>
            <strong>80lb bags:</strong> $5-7 each, covers 0.60 cubic feet
          </li>
          <li>
            <strong>Cost per cubic foot:</strong> $11-18 for bagged concrete
          </li>
        </ul>
        <p className="mb-2">
          <strong>Ready-mix concrete costs:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Basic mix:</strong> $100-150 per cubic yard delivered
          </li>
          <li>
            <strong>High-strength mix:</strong> $120-180 per cubic yard
          </li>
          <li>
            <strong>Decorative mix:</strong> $150-250 per cubic yard
          </li>
          <li>
            <strong>Minimum order:</strong> Usually 1-2 cubic yards
          </li>
        </ul>
        <p className="mb-2">
          <strong>Additional project costs to consider:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Site preparation and excavation: $2-5 per square foot</li>
          <li>Reinforcement (rebar/mesh): $0.50-2 per square foot</li>
          <li>Labor for finishing: $3-8 per square foot</li>
          <li>Tools and equipment rental: $50-200 per day</li>
        </ul>
      </>
    ),
  },
  {
    id: "concrete-calculator-volume-formulas",
    question: "What formulas do concrete calculators use for different shapes?",
    answer: (
      <>
        <p className="mb-2">
          Concrete calculators use specific geometric formulas to determine
          volume for different project shapes. Understanding these formulas
          helps verify calculator results and plan projects accurately.
        </p>
        <p className="mb-2">
          <strong>Basic concrete volume formulas:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Rectangular slab:</strong> Length × Width × Thickness (all
            in same units)
          </li>
          <li>
            <strong>Round slab:</strong> π × Radius² × Thickness (π ≈ 3.14159)
          </li>
          <li>
            <strong>Cylindrical column:</strong> π × Radius² × Height
          </li>
          <li>
            <strong>Triangular section:</strong> 0.5 × Base × Height × Length
          </li>
        </ul>
        <p className="mb-2">
          <strong>Complex shape calculations:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Stairs:</strong> [(Number of steps × step width × step
            depth) + (total rise × total run)] × width
          </li>
          <li>
            <strong>Curbs:</strong> Trapezoidal cross-section area × total
            length
          </li>
          <li>
            <strong>Footings:</strong> Width × depth × perimeter length
          </li>
          <li>
            <strong>Tubes/pipes:</strong> π × (outer radius² - inner radius²) ×
            length
          </li>
        </ul>
        <p className="mb-2">
          <strong>Unit conversion helpers:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>1 cubic yard = 27 cubic feet</li>
          <li>1 cubic foot = 1,728 cubic inches</li>
          <li>Convert inches to feet: divide by 12</li>
          <li>Convert feet to yards: divide by 3</li>
        </ul>
      </>
    ),
  },
  {
    id: "concrete-safety-best-practices",
    question:
      "What safety precautions should I take when working with concrete?",
    answer: (
      <>
        <p className="mb-2">
          Concrete work involves chemical hazards, heavy lifting, and
          time-sensitive operations. Proper safety measures protect against
          burns, injuries, and long-term health effects.
        </p>
        <p className="mb-2">
          <strong>Personal protective equipment (PPE):</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Waterproof gloves:</strong> Protect from cement burns and
            skin irritation
          </li>
          <li>
            <strong>Safety glasses:</strong> Shield eyes from splashing concrete
          </li>
          <li>
            <strong>Dust masks:</strong> Prevent inhalation of cement dust
          </li>
          <li>
            <strong>Work boots:</strong> Steel-toed boots for heavy material
            protection
          </li>
          <li>
            <strong>Long clothing:</strong> Cover arms and legs to prevent skin
            contact
          </li>
        </ul>
        <p className="mb-2">
          <strong>Chemical safety precautions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Avoid skin contact:</strong> Wet cement is caustic and can
            cause chemical burns
          </li>
          <li>
            <strong>Rinse immediately:</strong> Flush any concrete contact with
            clean water
          </li>
          <li>
            <strong>Ventilation:</strong> Work in well-ventilated areas to avoid
            dust inhalation
          </li>
          <li>
            <strong>First aid ready:</strong> Keep clean water and eye wash
            station available
          </li>
        </ul>
        <p className="mb-2">
          <strong>Physical safety measures:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use proper lifting techniques for heavy bags</li>
          <li>Keep work area clean and organized</li>
          <li>Plan for quick concrete placement - time is critical</li>
          <li>Work with partners for large pours</li>
          <li>Check weather conditions - avoid extreme temperatures</li>
        </ul>
      </>
    ),
  },
  {
    id: "concrete-preparation-site-work",
    question: "How do I prepare a site for concrete work?",
    answer: (
      <>
        <p className="mb-2">
          Proper site preparation is crucial for concrete longevity and
          performance. Poor preparation leads to cracking, settling, and
          premature failure.
        </p>
        <p className="mb-2">
          <strong>Site preparation steps:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Check permits:</strong> Verify local building codes and
            permit requirements
          </li>
          <li>
            <strong>Call 811:</strong> Mark underground utilities before digging
          </li>
          <li>
            <strong>Excavate properly:</strong> Dig to proper depth plus base
            material
          </li>
          <li>
            <strong>Compact subgrade:</strong> Ensure firm, level foundation
          </li>
        </ul>
        <p className="mb-2">
          <strong>Base preparation requirements:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Granular base:</strong> 4-6" of compacted gravel for most
            projects
          </li>
          <li>
            <strong>Vapor barrier:</strong> Plastic sheeting under slabs to
            prevent moisture
          </li>
          <li>
            <strong>Proper drainage:</strong> Grade away from structures,
            install drains if needed
          </li>
          <li>
            <strong>Formwork:</strong> Install straight, level forms at proper
            height
          </li>
        </ul>
        <p className="mb-2">
          <strong>Reinforcement planning:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Wire mesh:</strong> Place on chairs in center of slab
            thickness
          </li>
          <li>
            <strong>Rebar:</strong> Position according to engineering
            specifications
          </li>
          <li>
            <strong>Fiber reinforcement:</strong> Add to concrete mix for crack
            control
          </li>
        </ul>
        <p className="text-sm">
          <strong>Weather considerations:</strong> Plan concrete work for
          temperatures between 50-80°F with no rain forecast for 24 hours.
        </p>
      </>
    ),
  },
  {
    id: "concrete-finishing-techniques-maintenance",
    question:
      "What are the different concrete finishing techniques and maintenance requirements?",
    answer: (
      <>
        <p className="mb-2">
          Concrete finishing affects both appearance and functionality.
          Different finishes provide varying levels of slip resistance,
          durability, and aesthetic appeal.
        </p>
        <p className="mb-2">
          <strong>Common concrete finishes:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Float finish:</strong> Smooth, level surface using bull
            float
          </li>
          <li>
            <strong>Broom finish:</strong> Textured surface for slip resistance
          </li>
          <li>
            <strong>Trowel finish:</strong> Dense, smooth surface for indoor use
          </li>
          <li>
            <strong>Stamped concrete:</strong> Decorative patterns mimicking
            stone, brick
          </li>
          <li>
            <strong>Exposed aggregate:</strong> Decorative stone surface
          </li>
        </ul>
        <p className="mb-2">
          <strong>Maintenance requirements:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          <li>
            <strong>Sealing:</strong> Apply sealer every 2-3 years to prevent
            water damage
          </li>
          <li>
            <strong>Crack repair:</strong> Fill small cracks promptly to prevent
            expansion
          </li>
          <li>
            <strong>Cleaning:</strong> Regular washing with mild detergent and
            water
          </li>
          <li>
            <strong>De-icing caution:</strong> Avoid salt-based de-icers in
            first year
          </li>
        </ul>
        <p className="mb-2">
          <strong>Preventive measures:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Install control joints to control cracking locations</li>
          <li>Proper drainage to prevent water pooling</li>
          <li>Avoid heavy loads until full cure (28 days)</li>
          <li>Regular inspection for early problem detection</li>
        </ul>
      </>
    ),
  },
];

const disclaimer = (
  <>
    <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Note</h3>
    <p className="text-blue-700 text-sm">
      Concrete calculations are estimates based on standard formulas and typical
      conditions. Always consult local building codes, obtain proper permits,
      and consider professional consultation for structural applications. Site
      conditions, weather, and specific project requirements may affect actual
      material needs and costs.
    </p>
  </>
);

export default function ConcreteFAQSection() {
  return (
    <FAQSection
      items={faqData}
      title="Frequently Asked Questions About Concrete Calculations"
      allowMultipleOpen={false}
      includeSchema={true}
      schemaId="concrete-calculator-faq-schema"
      disclaimer={disclaimer}
      relatedLinks={[
        { href: "/percentage", label: "Percentage Calculator" },
        { href: "/time", label: "Time Calculator" },
        { href: "/subnet", label: "Subnet Calculator" },
        { href: "/grade", label: "Grade Calculator" },
      ]}
    />
  );
}
