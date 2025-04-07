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

declare type AgeResult = {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    nextBirthday: Date;
    daysUntilNextBirthday: number;
}

declare type Feature = {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    component: React.ReactNode;
    status: "available" | "coming-soon";
};

declare type FeaturesListProps = {
    isMobile?: boolean;
}

declare type HeartRateZone = {
    name: string;
    intensity: string;
    min: number;
    max: number;
    description: string;
    color: string;
}

declare type FrameSize = "small" | "medium" | "large";

declare type ActivityLevel = "sedentary" | "active" | "athlete";

declare type ProteinSource = {
    name: string;
    amount: string;
    protein: number;
    icon: React.ReactNode;
}