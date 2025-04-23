import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  ClipboardPlus,
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
    const details = medicine.name;

    navigator.clipboard
      .writeText(details)
      .then(() => {
        toast.success("Medicine name copied to clipboard");
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
            <ClipboardPlus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{medicine.name}</h3>
            <p className="text-sm text-muted-foreground">
              Click on each medicine to view detailed information.
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
                Information
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div>
                    <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5 bg-blue-100 rounded-full p-0.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Purpose</h5>
                    <p className="text-sm text-muted-foreground">
                      {medicine.details.purpose}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5 bg-blue-100 rounded-full p-0.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">
                      Possible Side Effects
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {medicine.details.sideEffects}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div>
                    <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5 bg-blue-100 rounded-full p-0.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Warnings</h5>
                    <p className="text-sm text-muted-foreground">
                      {medicine.details.warnings.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {medicine.details.alternatives.length > 0 && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default MedicineItem;
