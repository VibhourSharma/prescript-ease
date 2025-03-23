import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from "@/hooks/use-mobile";

const BodyFatCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("male");
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [bodyFatCategory, setBodyFatCategory] = useState<string>("");
  const [useMetric, setUseMetric] = useState<boolean>(true);
  const isMobile = useIsMobile();

  const calculateBodyFat = () => {
    if (height && weight && age) {
      let bmi: number;

      if (useMetric) {
        // Metric formula: weight (kg) / (height (m))²
        bmi = weight / Math.pow(height / 100, 2);
      } else {
        // Imperial formula: (weight (lbs) * 703) / (height (in))²
        bmi = (weight * 703) / Math.pow(height, 2);
      }

      // U.S. Navy Method for body fat calculation
      const bodyFatPercentage =
        gender === "male"
          ? 1.2 * bmi + 0.23 * Number(age) - 10.8 * 1 - 5.4
          : 1.2 * bmi + 0.23 * Number(age) - 10.8 * 0 - 5.4;

      setBodyFat(parseFloat(bodyFatPercentage.toFixed(1)));
    }
  };

  useEffect(() => {
    if (bodyFat !== null) {
      if (gender === "male") {
        if (bodyFat < 6) {
          setBodyFatCategory("Essential fat");
        } else if (bodyFat >= 6 && bodyFat < 14) {
          setBodyFatCategory("Athletic");
        } else if (bodyFat >= 14 && bodyFat < 18) {
          setBodyFatCategory("Fitness");
        } else if (bodyFat >= 18 && bodyFat < 25) {
          setBodyFatCategory("Average");
        } else {
          setBodyFatCategory("Obese");
        }
      } else {
        if (bodyFat < 13) {
          setBodyFatCategory("Essential fat");
        } else if (bodyFat >= 13 && bodyFat < 21) {
          setBodyFatCategory("Athletic");
        } else if (bodyFat >= 21 && bodyFat < 25) {
          setBodyFatCategory("Fitness");
        } else if (bodyFat >= 25 && bodyFat < 32) {
          setBodyFatCategory("Average");
        } else {
          setBodyFatCategory("Obese");
        }
      }
    }
  }, [bodyFat, gender]);

  const getBodyFatCategoryColor = (): string => {
    if (!bodyFatCategory) return "bg-gray-200";

    switch (bodyFatCategory) {
      case "Essential fat":
        return "bg-amber-400";
      case "Athletic":
        return "bg-green-500";
      case "Fitness":
        return "bg-emerald-500";
      case "Average":
        return "bg-orange-500";
      case "Obese":
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setBodyFat(null);
    setBodyFatCategory("");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4 mb-2 md:mb-4">
        <p className="text-sm md:text-base text-muted-foreground">
          Body fat percentage is the amount of body fat as a proportion of your
          body weight. This calculator uses the U.S. Navy method to estimate
          body fat.
        </p>

        <div className="flex items-center gap-3 bg-muted/30 p-2 md:p-3 rounded-lg shrink-0">
          <span
            className={`text-xs md:text-sm font-medium ${
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
            className={`text-xs md:text-sm font-medium ${
              useMetric ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Metric
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <RadioGroup
              id="gender"
              value={gender}
              onValueChange={setGender}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">
                  Male
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) =>
                setAge(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="text-base"
            />
          </div>

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
              onClick={calculateBodyFat}
              disabled={height === "" || weight === "" || age === ""}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate Body Fat
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
            {bodyFat === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your details to calculate your body fat percentage.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Your Body Fat Result
                  </h3>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl md:text-5xl font-bold text-primary">
                      {bodyFat}
                    </span>
                    <span className="text-base md:text-lg text-muted-foreground mb-1">
                      %
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getBodyFatCategoryColor()}`}
                    ></div>
                    <span className="font-medium">{bodyFatCategory}</span>
                  </div>
                </div>

                <div className="mt-auto pt-2 md:pt-4">
                  <div className="px-4 md:px-6 pb-2 md:pb-4">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(
                            100,
                            (bodyFat / (gender === "male" ? 40 : 45)) * 100
                          )}%`,
                          backgroundColor: getBodyFatCategoryColor().replace(
                            "bg-",
                            ""
                          ),
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-3 md:p-4 text-xs md:text-sm">
                    <p className="mb-2 font-medium">
                      Body Fat Categories (
                      {gender === "male" ? "Male" : "Female"}):
                    </p>
                    {gender === "male" ? (
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                          <span>Essential fat: 2-5%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Athletic: 6-13%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span>Fitness: 14-17%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span>Average: 18-24%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Obese: 25%+</span>
                        </li>
                      </ul>
                    ) : (
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                          <span>Essential fat: 10-13%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Athletic: 14-20%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span>Fitness: 21-24%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span>Average: 25-31%</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Obese: 32%+</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 p-3 md:p-4 rounded-lg text-xs md:text-sm mt-4 md:mt-6">
        <p className="font-medium mb-1 md:mb-2">Important Note:</p>
        <p className="text-muted-foreground">
          This calculator provides an estimate only. For a more accurate body
          fat measurement, consider methods like DEXA scans, hydrostatic
          weighing, or skinfold calipers measured by a professional.
        </p>
      </div>
    </div>
  );
};

export default BodyFatCalculator;
