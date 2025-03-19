
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
  details: {
    purpose: string;
    sideEffects: string;
    warnings: string;
    alternatives: string[];
  };
}

interface PrescriptionData {
  medicines: Medicine[];
  diagnosis: string;
  accuracy: number;
  issues: string[];
  rawText: string;
}

interface PrescriptionContextType {
  prescriptionData: PrescriptionData | null;
  setPrescriptionData: (data: PrescriptionData) => void;
  clearPrescriptionData: () => void;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export const PrescriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionData | null>(null);

  const clearPrescriptionData = () => {
    setPrescriptionData(null);
  };

  return (
    <PrescriptionContext.Provider
      value={{
        prescriptionData,
        setPrescriptionData,
        clearPrescriptionData,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
};

export const usePrescription = (): PrescriptionContextType => {
  const context = useContext(PrescriptionContext);
  if (context === undefined) {
    throw new Error('usePrescription must be used within a PrescriptionProvider');
  }
  return context;
};
