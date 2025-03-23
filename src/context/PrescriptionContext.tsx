import React, { createContext, useContext, useState, ReactNode } from "react";

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(
  undefined
);

export const PrescriptionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [prescriptionData, setPrescriptionData] =
    useState<PrescriptionData | null>(null);

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
    throw new Error(
      "usePrescription must be used within a PrescriptionProvider"
    );
  }
  return context;
};
