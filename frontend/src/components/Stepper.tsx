import React, { useEffect, useState } from "react";
import StepOne from "./formSteps/StepOne";
import StepTwo from "./formSteps/StepTwo";
import StepThree from "./formSteps/StepThree";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import StepFour from "./formSteps/StepFour";

interface Step {
  title: string;
}

const steps: Step[] = [
  { title: "Personal Info" },
  { title: "Professional Details" },
  { title: "Preferences" },
  { title: "Summary" },
];

const Stepper: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.userAuth.step);

  const [step, setStep] = useState<number>(currentStep || 1);

  useEffect(() => {
    if (currentStep) {
      setStep(currentStep);
    }
  }, [currentStep]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-4">
      {/* Stepper Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between ">
        {steps.map((s, index) => {
          const stepIndex = index + 1;
          const isActive = step === stepIndex;
          const isCompleted = step > stepIndex;

          return (
            <div
              key={index}
              className="flex-1 flex items-center group relative transition-all duration-300"
            >
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold 
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
              >
                {stepIndex}
              </div>

              {/* Title */}
              <div className="ml-3 pb-8">
                <span
                  className={`text-sm sm:text-base font-medium transition-colors 
                    ${isActive ? "text-blue-700" : "text-gray-500"}`}
                >
                  {s.title}
                </span>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="absolute left-[55px] top-5 w-full z-[-1] pt-2">
                  <div
                    className={`h-1 w-full ${
                      step > stepIndex ? "bg-green-500" : "bg-gray-300"
                    } transition-all duration-500`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className=" transition-all duration-500">
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}
      </div>
    </div>
  );
};

export default Stepper;
