import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const MedicineDetails = ({ medicine }: MedicineDetailsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">{medicine.name}</h2>
          <details className="group">
            <summary className="cursor-pointer list-none text-muted-foreground relative">
              <p className="line-clamp-4 group-open:line-clamp-none">
                {medicine.usage}
              </p>
              <span className="absolute bottom-0 text-sm right-0 bg-white text-primary px-1 group-open:hidden" />
            </summary>
          </details>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert
            variant="destructive"
            className="bg-destructive/10 text-destructive"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <details className="group">
                <summary className="cursor-pointer list-none relative">
                  <p className="line-clamp-2 group-open:line-clamp-none">
                    {medicine.dontUse}
                  </p>
                  <span className="absolute bottom-0 right-0 px-1 group-open:hidden" />
                </summary>
              </details>
            </AlertDescription>
          </Alert>

          <div>
            <h3 className="font-semibold mb-2 text-lg"> Stop Usage if:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <details className="group">
                <summary className="cursor-pointer list-none relative">
                  <p className="line-clamp-3 group-open:line-clamp-none">
                    {medicine.sideEffects}
                  </p>
                  <span className="absolute bottom-0 right-0 px-1 group-open:hidden" />
                </summary>
              </details>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-lg">Pregnancy Safety</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <details className="group">
                <summary className="cursor-pointer list-none relative">
                  <p className="line-clamp-3 group-open:line-clamp-none">
                    {medicine.pregnancyInfo}
                  </p>
                  <span className="absolute bottom-0 right-0 px-1 group-open:hidden" />
                </summary>
              </details>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-lg">Dosage:</h3>
            <div className="flex flex-wrap gap-2">
              <span className="p-2.5 rounded-sm bg-primary/10 text-primary border border-primary text-sm">
                <details className="group">
                  <summary className="cursor-pointer list-none relative">
                    <p className="line-clamp-3 group-open:line-clamp-none">
                      {medicine.dosage}
                    </p>
                    <span className="absolute bottom-0 right-0 px-1 group-open:hidden" />
                  </summary>
                </details>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
        <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
        <div className="text-sm text-yellow-800">
          Disclamer: Drug data is sourced from the openFDA, maintained by the US
          Food and Drug Administration and is provided for informational
          purposes only. Always consult a healthcare professional before using
          any medication.
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
