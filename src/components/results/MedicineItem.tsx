import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  AlertCircle,
  Pill,
  Check,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MedicineItem: React.FC<MedicineItemProps> = ({ medicine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const toggleOpen = () => {
    if (!isOpen && !medicine.details) {
      // Simulate loading details if they don't exist
      setIsDetailsLoading(true);
      setTimeout(() => {
        setIsDetailsLoading(false);
        setIsOpen(true);
      }, 800);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const copyMedicineDetails = () => {
    const details = `${medicine.name} - ${medicine.dosage}\nFrequency: ${medicine.frequency}\nDuration: ${medicine.duration}\nNotes: ${medicine.notes}`;

    navigator.clipboard
      .writeText(details)
      .then(() => {
        toast.success("Medicine details copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy details");
      });
  };

  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden transition-all duration-300",
        isOpen ? "shadow-md" : "hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "p-4 flex justify-between items-center cursor-pointer",
          isOpen ? "bg-primary/5" : "bg-card"
        )}
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Pill className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{medicine.name}</h3>
            <p className="text-sm text-muted-foreground">
              {medicine.dosage} - {medicine.frequency}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              copyMedicineDetails();
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <div className="flex h-4 w-4 items-center justify-center">
            {isDetailsLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : isOpen ? (
              <ChevronUp className="h-5 w-5 transition-transform" />
            ) : (
              <ChevronDown className="h-5 w-5 transition-transform" />
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Details
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Dosage:</span>
                    <span className="text-sm ml-1">{medicine.dosage}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Frequency:</span>
                    <span className="text-sm ml-1">{medicine.frequency}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Duration:</span>
                    <span className="text-sm ml-1">{medicine.duration}</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Notes:</span>
                    <span className="text-sm ml-1">{medicine.notes}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Information
              </h4>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium">Purpose</h5>
                  <p className="text-sm text-muted-foreground">
                    {medicine.details.purpose}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-medium">Possible Side Effects</h5>
                  <p className="text-sm text-muted-foreground">
                    {medicine.details.sideEffects}
                  </p>
                </div>

                <div>
                  <h5 className="text-sm font-medium">Warnings</h5>
                  <p className="text-sm text-muted-foreground">
                    {medicine.details.warnings}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="text-sm font-medium mb-2">
              Alternative Medications
            </h4>
            <div className="flex flex-wrap gap-2">
              {medicine.details.alternatives.map((alt, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
            <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="text-xs text-yellow-800">
              This information is for educational purposes only. Always consult
              your doctor or pharmacist for specific advice about your
              medication.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineItem;
