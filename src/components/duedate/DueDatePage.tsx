"use client";

import { useState, useEffect } from "react";
import DueDateForm from "@/components/duedate/DueDateForm";
import DueDateSummary from "@/components/duedate/DueDateSummary";
import PregnancyChart from "@/components/duedate/PregnancyChart";
import MilestonesTable from "@/components/duedate/MilestonesTable";
import FAQSection from "./FAQSection";
import {
  calculateDueDate,
  getPregnancyMilestones,
} from "@/utils/dueDateCalculations";
import {
  DueDateFormValues,
  DueDateResults,
  EstimationMethod,
  EmbryoAge,
  PregnancyMilestone,
} from "@/types/dueDate";

export default function DueDatePage() {
  const [formValues, setFormValues] = useState<DueDateFormValues>({
    estimationMethod: EstimationMethod.LAST_PERIOD,
    lastPeriodDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    cycleLength: 28,
    conceptionDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
    ultrasoundDate: new Date(),
    ultrasoundWeeks: 20,
    ultrasoundDays: 0,
    ivfTransferDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    embryoAge: EmbryoAge.DAY_5,
  });

  const [results, setResults] = useState<DueDateResults | null>(null);
  const [milestones, setMilestones] = useState<PregnancyMilestone[]>([]);

  useEffect(() => {
    try {
      const dueDateResults = calculateDueDate({
        estimationMethod: formValues.estimationMethod,
        lastPeriodDate: formValues.lastPeriodDate,
        cycleLength: formValues.cycleLength,
        conceptionDate: formValues.conceptionDate,
        ultrasoundDate: formValues.ultrasoundDate,
        ultrasoundWeeks: formValues.ultrasoundWeeks,
        ultrasoundDays: formValues.ultrasoundDays,
        ivfTransferDate: formValues.ivfTransferDate,
        embryoAge: formValues.embryoAge,
      });

      // Calculate LMP date for milestones
      let lmpDate: Date;
      switch (formValues.estimationMethod) {
        case EstimationMethod.LAST_PERIOD:
          lmpDate = formValues.lastPeriodDate;
          break;
        case EstimationMethod.CONCEPTION_DATE:
          lmpDate = new Date(formValues.conceptionDate);
          lmpDate.setDate(lmpDate.getDate() - 14);
          break;
        case EstimationMethod.ULTRASOUND:
          const totalUltrasoundDays =
            formValues.ultrasoundWeeks * 7 + formValues.ultrasoundDays;
          lmpDate = new Date(formValues.ultrasoundDate);
          lmpDate.setDate(lmpDate.getDate() - totalUltrasoundDays);
          break;
        case EstimationMethod.IVF_TRANSFER:
          lmpDate = new Date(formValues.ivfTransferDate);
          if (formValues.embryoAge === EmbryoAge.DAY_3) {
            lmpDate.setDate(lmpDate.getDate() - 17);
          } else if (formValues.embryoAge === EmbryoAge.DAY_5) {
            lmpDate.setDate(lmpDate.getDate() - 19);
          } else if (formValues.embryoAge === EmbryoAge.DAY_6) {
            lmpDate.setDate(lmpDate.getDate() - 20);
          }
          break;
        default:
          lmpDate = formValues.lastPeriodDate;
      }

      const pregnancyMilestones = getPregnancyMilestones(lmpDate);

      setResults(dueDateResults);
      setMilestones(pregnancyMilestones);
    } catch (error) {
      console.error("Error calculating due date:", error);
    }
  }, [formValues]);

  const handleInputChange = (
    name: string,
    value: Date | number | EstimationMethod | EmbryoAge
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Due Date Calculator (Pregnancy Due Date, LMP, Ultrasound & IVF Dating)
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Calculate your pregnancy due date with our comprehensive due date
          calculator using multiple methods: last menstrual period (LMP),
          conception date, ultrasound measurements, and IVF transfer dates.
          Features accurate gestational age tracking, pregnancy milestones
          timeline, trimester breakdown, and fetal development calendar.
          Essential for pregnancy planning, prenatal care scheduling, and
          understanding your baby's development journey from conception to
          delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Input form */}
        <div className="lg:col-span-4">
          <DueDateForm values={formValues} onChange={handleInputChange} />
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-8">
          {results && (
            <>
              <DueDateSummary results={results} />
              <PregnancyChart results={results} milestones={milestones} />
              <MilestonesTable milestones={milestones} />
            </>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
