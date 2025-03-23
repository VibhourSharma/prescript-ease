import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");
  const [useMetric, setUseMetric] = useState<boolean>(true);

  const calculateBMI = () => {
    if (height && weight) {
      let bmiValue: number;

      if (useMetric) {
        // Metric formula: weight (kg) / (height (m))²
        bmiValue = weight / Math.pow(height / 100, 2);
      } else {
        // Imperial formula: (weight (lbs) * 703) / (height (in))²
        bmiValue = (weight * 703) / Math.pow(height, 2);
      }

      setBmi(parseFloat(bmiValue.toFixed(1)));
    }
  };

  useEffect(() => {
    if (bmi !== null) {
      if (bmi < 18.5) {
        setBmiCategory("Underweight");
      } else if (bmi >= 18.5 && bmi < 25) {
        setBmiCategory("Normal weight");
      } else if (bmi >= 25 && bmi < 30) {
        setBmiCategory("Overweight");
      } else {
        setBmiCategory("Obesity");
      }
    }
  }, [bmi]);

  const getBmiCategoryColor = (): string => {
    if (!bmiCategory) return "bg-gray-200";

    switch (bmiCategory) {
      case "Underweight":
        return "bg-amber-400";
      case "Normal weight":
        return "bg-green-500";
      case "Overweight":
        return "bg-orange-500";
      case "Obesity":
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiCategory("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <p className="text-muted-foreground">
          BMI (Body Mass Index) is a measurement that indicates if a person has
          a healthy body weight for their height.
        </p>

        <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg">
          <span
            className={`text-sm font-medium ${
              useMetric ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            Imperial
          </span>
          <Switch
            checked={useMetric}
            onCheckedChange={(checked) => {
              setUseMetric(checked);
              resetCalculator();
            }}
          />
          <span
            className={`text-sm font-medium ${
              useMetric ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Metric
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height {useMetric ? "(cm)" : "(in)"}</Label>
            <Input
              id="height"
              type="number"
              placeholder={
                useMetric ? "Height in centimeters" : "Height in inches"
              }
              value={height}
              onChange={(e) =>
                setHeight(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">
              Weight {useMetric ? "(kg)" : "(lbs)"}
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder={
                useMetric ? "Weight in kilograms" : "Weight in pounds"
              }
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="text-base"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateBMI}
              disabled={height === "" || weight === ""}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate BMI
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
            {bmi === null ? (
              <div className="flex items-center justify-center h-full min-h-52 p-6 text-center">
                <p className="text-muted-foreground">
                  Enter your height and weight to calculate your BMI.
                </p>
              </div>
            ) : (
              <>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">Your BMI Result</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold text-primary">
                      {bmi}
                    </span>
                    <span className="text-lg text-muted-foreground mb-1">
                      kg/m²
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getBmiCategoryColor()}`}
                    ></div>
                    <span className="font-medium">{bmiCategory}</span>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 text-sm">
                  <p className="mb-2 font-medium">BMI Categories:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      <span>Underweight: BMI less than 18.5</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Normal weight: BMI 18.5 to 24.9</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span>Overweight: BMI 25 to 29.9</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span>Obesity: BMI 30 or higher</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg text-sm mt-6">
        <p className="font-medium mb-2">Important Note:</p>
        <p className="text-muted-foreground">
          BMI is a general indicator and doesn't account for factors like muscle
          mass, bone density, or distribution of fat. For a comprehensive health
          assessment, please consult with a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default BMICalculator;
