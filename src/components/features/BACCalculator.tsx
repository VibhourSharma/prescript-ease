import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Wine, AlertTriangle } from "lucide-react";

const BACCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [gender, setGender] = useState<string>("male");
  const [drinks, setDrinks] = useState<number>(1);
  const [hours, setHours] = useState<number>(1);
  const [bac, setBac] = useState<number | null>(null);

  // Constants for BAC calculation
  const GENDER_CONSTANTS = {
    male: 0.68,
    female: 0.55,
  };

  const STANDARD_DRINK_GRAMS = 14; // 14 grams of pure alcohol in a standard drink

  const calculateBAC = () => {
    if (weight) {
      // Convert weight to grams
      const weightInGrams = (weight as number) * 1000;

      // Calculate alcohol distribution volume
      const distributionRatio = GENDER_CONSTANTS[gender as "male" | "female"];
      const bodyWaterInGrams = weightInGrams * distributionRatio;

      // Calculate alcohol consumed in grams
      const alcoholInGrams = drinks * STANDARD_DRINK_GRAMS;

      // Calculate initial BAC (%, g/dL)
      let calculatedBAC = alcoholInGrams / (bodyWaterInGrams / 100);

      // Subtract alcohol metabolized (average person metabolizes 0.015% per hour)
      calculatedBAC -= hours * 0.015;

      // Ensure BAC doesn't go below 0
      calculatedBAC = Math.max(0, calculatedBAC);

      // Round to 3 decimal places
      setBac(parseFloat(calculatedBAC.toFixed(3)));
    }
  };

  const resetCalculator = () => {
    setWeight("");
    setGender("male");
    setDrinks(1);
    setHours(1);
    setBac(null);
  };

  const getBACCategory = (
    bacValue: number
  ): { category: string; color: string } => {
    if (bacValue < 0.02) {
      return { category: "Minimal Impairment", color: "bg-green-500" };
    } else if (bacValue < 0.05) {
      return { category: "Mild Impairment", color: "bg-green-400" };
    } else if (bacValue < 0.08) {
      return { category: "Increased Impairment", color: "bg-yellow-400" };
    } else if (bacValue < 0.15) {
      return { category: "Significant Impairment", color: "bg-orange-500" };
    } else if (bacValue < 0.3) {
      return { category: "Severe Impairment", color: "bg-red-500" };
    } else {
      return { category: "Potentially Life-Threatening", color: "bg-red-700" };
    }
  };

  const getEffects = (bacValue: number): string[] => {
    if (bacValue < 0.02) {
      return ["No significant effects", "Subtle effects possible"];
    } else if (bacValue < 0.05) {
      return [
        "Mild relaxation",
        "Slight euphoria",
        "Minor judgment impairment",
      ];
    } else if (bacValue < 0.08) {
      return ["Reduced coordination", "Lowered alertness", "Impaired judgment"];
    } else if (bacValue < 0.15) {
      return [
        "Impaired balance",
        "Slurred speech",
        "Reduced reaction time",
        "Legal intoxication in most places",
      ];
    } else if (bacValue < 0.3) {
      return [
        "Confusion",
        "Nausea",
        "Drowsiness",
        "Significant impairment in all functions",
      ];
    } else {
      return [
        "Unconsciousness",
        "Danger of respiratory arrest",
        "Risk of death",
      ];
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Estimate your blood alcohol content (BAC) based on your weight, gender,
        number of drinks consumed, and time elapsed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value ? parseFloat(e.target.value) : "")
                }
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={gender}
                onValueChange={(value) => setGender(value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="drinks">Standard Drinks</Label>
              <span className="text-sm font-medium">{drinks}</span>
            </div>
            <Slider
              id="drinks"
              min={1}
              max={15}
              step={1}
              value={[drinks]}
              onValueChange={(value) => setDrinks(value[0])}
              className="py-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              1 standard drink = 12 oz beer (5%), 5 oz wine (12%), or 1.5 oz
              liquor (40%)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="hours">Hours Since First Drink</Label>
              <span className="text-sm font-medium">{hours}</span>
            </div>
            <Slider
              id="hours"
              min={0}
              max={12}
              step={0.5}
              value={[hours]}
              onValueChange={(value) => setHours(value[0])}
              className="py-2"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateBAC}
              disabled={weight === ""}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate BAC
            </Button>

            <Button
              variant="outline"
              onClick={resetCalculator}
              className="transition-all duration-300"
            >
              Reset
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {bac === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your information to estimate your blood alcohol content.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6 space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Your Estimated BAC
                  </h3>

                  <div className="flex items-center justify-center py-4">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={getBACCategory(bac).color.replace("bg-", "")}
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (bac / 0.4) * 283}
                          transform="rotate(-90 50 50)"
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <Wine className="h-8 w-8 text-primary mb-1" />
                        <div className="text-4xl font-bold">{bac}</div>
                        <div className="text-xs text-muted-foreground">
                          BAC %
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg ${
                      getBACCategory(bac).color
                    } bg-opacity-10 border border-opacity-30 border-current text-center`}
                  >
                    <p className="font-medium">
                      {getBACCategory(bac).category}
                    </p>
                  </div>

                  {bac >= 0.08 && (
                    <div className="flex items-center gap-2 p-3 bg-red-100 border border-red-300 rounded-lg text-red-800">
                      <AlertTriangle className="h-5 w-5" />
                      <div className="text-sm font-medium">
                        Above legal limit for driving in most areas (0.08%)
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto bg-muted/20 p-4">
                  <h4 className="font-medium text-sm mb-2">
                    Potential Effects:
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {getEffects(bac).map((effect, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary"></div>
                        <span>{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 p-3 md:p-4 rounded-lg text-xs md:text-sm mt-4 md:mt-6">
        <p className="font-medium mb-1 md:mb-2">Important Disclaimer:</p>
        <p className="text-muted-foreground">
          This calculator provides an estimate only and should not be used to
          determine whether you are fit to drive or operate machinery. Many
          factors can affect BAC and its effects, including medications, food
          consumed, and individual metabolism. The safest approach is to avoid
          driving or operating machinery after consuming any alcohol.
        </p>
      </div>
    </div>
  );
};

export default BACCalculator;
