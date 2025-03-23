declare type StepProps = {
    icon: React.ReactNode;
    number: number;
    title: string;
    description: string;
    isLast?: boolean;
}

declare type Medicine = {
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

declare type PrescriptionData = {
    medicines: Medicine[];
    diagnosis: string;
    accuracy: number;
    issues: string[];
    rawText: string;
}

declare type PrescriptionContextType = {
    prescriptionData: PrescriptionData | null;
    setPrescriptionData: (data: PrescriptionData) => void;
    clearPrescriptionData: () => void;
}

declare type MedicineItemProps = {
    medicine: Medicine;
    index: number;
}