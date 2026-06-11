import { createContext, useContext, useState } from "react";

type OnboardingData = {
  selectedClass: string;
  setSelectedClass: (value: string) => void;

  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;

  selectedStream: string;
  setSelectedStream: (value: string) => void;

  selectedCombination: string;
  setSelectedCombination: (value: string) => void;

  selectedOptionalSubject: string;
  setSelectedOptionalSubject: (value: string) => void;

  generatedSubjects: string[];
  setGeneratedSubjects: (value: string[]) => void;
};

const OnboardingContext = createContext<OnboardingData | null>(null);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedClass, setSelectedClass] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [selectedStream, setSelectedStream] = useState("");

  const [selectedCombination, setSelectedCombination] =
    useState("");

  const [
    selectedOptionalSubject,
    setSelectedOptionalSubject,
  ] = useState("");

  const [generatedSubjects, setGeneratedSubjects] =
    useState<string[]>([]);

  return (
    <OnboardingContext.Provider
      value={{
        selectedClass,
        setSelectedClass,

        selectedLanguage,
        setSelectedLanguage,

        selectedStream,
        setSelectedStream,

        selectedCombination,
        setSelectedCombination,

        selectedOptionalSubject,
        setSelectedOptionalSubject,

        generatedSubjects,
        setGeneratedSubjects,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error(
      "useOnboarding must be used inside OnboardingProvider"
    );
  }

  return context;
}