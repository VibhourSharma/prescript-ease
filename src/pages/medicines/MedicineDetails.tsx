import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface MedicineDetailsProps {
  medicine: Medicine;
}

const MedicineDetails: React.FC<MedicineDetailsProps> = ({ medicine }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">{medicine.name}</h2>
          <p className="text-muted-foreground">{medicine.usage}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Cheaper Alternatives</h3>
            <div className="flex flex-wrap gap-2">
              {medicine.alternatives.map((alt) => (
                <span
                  key={alt}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Side Effects</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {medicine.sideEffects.map((effect) => (
                <li key={effect}>{effect}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Pregnancy Safety</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                medicine.safeForPregnancy
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {medicine.safeForPregnancy
                ? "Safe during pregnancy"
                : "Not safe during pregnancy"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Alert
        variant="destructive"
        className="bg-destructive/10 text-destructive"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Disclaimer: The information provided here is AI-generated and for
          informational purposes only. Always consult with a qualified
          healthcare professional for accurate medical advice and before making
          any decisions related to your health or treatment.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MedicineDetails;
