

const mockMedicines: Record<string, Medicine> = {
    "paracetamol": {
        name: "Paracetamol",
        usage: "Pain reliever and fever reducer commonly used for headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.",
        alternatives: ["Ibuprofen", "Aspirin", "Naproxen"],
        sideEffects: ["Nausea", "Stomach pain", "Loss of appetite", "Headache"],
        safeForPregnancy: true
    },
    "ibuprofen": {
        name: "Ibuprofen",
        usage: "Nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation.",
        alternatives: ["Paracetamol", "Naproxen", "Aspirin"],
        sideEffects: ["Stomach pain", "Heartburn", "Nausea", "Dizziness", "Mild headache"],
        safeForPregnancy: false
    },
    "aspirin": {
        name: "Aspirin",
        usage: "Pain reliever, fever reducer, and anti-inflammatory medication. Also used to reduce the risk of heart attack and stroke.",
        alternatives: ["Paracetamol", "Ibuprofen", "Naproxen"],
        sideEffects: ["Upset stomach", "Heartburn", "Stomach bleeding", "Easy bruising/bleeding"],
        safeForPregnancy: false
    }
};

export const searchMedicine = (query: string): Medicine | null => {
    const normalizedQuery = query.trim().toLowerCase();
    return mockMedicines[normalizedQuery] || null;
};