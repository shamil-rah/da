
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import OnboardingPersonalInfo from "@/components/onboarding/OnboardingPersonalInfo";
import OnboardingPortfolio from "@/components/onboarding/OnboardingPortfolio";
import OnboardingServices from "@/components/onboarding/OnboardingServices";
import OnboardingAvailability from "@/components/onboarding/OnboardingAvailability";

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "portfolio", title: "Portfolio" },
  { id: "services", title: "Services" },
  { id: "availability", title: "Availability" },
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { updateUser } = useAppContext();

  const handleNext = () => {
    // Mark current step as completed
    if (!completedSteps.includes(steps[currentStep].id)) {
      setCompletedSteps([...completedSteps, steps[currentStep].id]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All steps completed
      finishOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const finishOnboarding = () => {
    // Update user onboarding status
    updateUser({ createdAt: new Date().toISOString() });
    
    toast({
      title: "Onboarding Complete!",
      description: "Your Boothly profile is now ready to receive bookings.",
    });
    
    // Signal that onboarding is complete
    onComplete();
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  const skipOnboarding = () => {
    updateUser({ createdAt: new Date().toISOString() });
    onComplete();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto pt-10 px-4 sm:px-6 pb-24">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-xl bg-boothly-purple flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set up your Boothly profile</h1>
          <p className="text-gray-600">
            Let's get your profile set up so clients can book your services
          </p>
        </div>

        {/* Progress indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`h-12 w-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    currentStep === index 
                      ? "bg-boothly-purple text-white ring-4 ring-purple-100" 
                      : completedSteps.includes(step.id)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span 
                  className={`text-xs font-medium ${
                    currentStep === index 
                      ? "text-boothly-purple" 
                      : completedSteps.includes(step.id)
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="mt-6 h-2 bg-gray-200 rounded-full max-w-2xl mx-auto">
            <div 
              className="h-2 bg-gradient-to-r from-boothly-purple to-boothly-purple-light rounded-full transition-all"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && <OnboardingPersonalInfo onComplete={handleNext} />}
              {currentStep === 1 && <OnboardingPortfolio onComplete={handleNext} />}
              {currentStep === 2 && <OnboardingServices onComplete={handleNext} />}
              {currentStep === 3 && <OnboardingAvailability onComplete={handleNext} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between max-w-2xl mx-auto">
          <div>
            {currentStep > 0 ? (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
              >
                Back
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                onClick={skipOnboarding}
              >
                Skip for now
              </Button>
            )}
          </div>
          
          <div>
            {currentStep < steps.length - 1 ? (
              <Button 
                onClick={handleNext}
              >
                Continue
              </Button>
            ) : (
              <Button 
                onClick={finishOnboarding}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
