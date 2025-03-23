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
import { ActivitySquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ActivityLevel =
  | "sedentary"
  | "lightlyActive"
  | "moderatelyActive"
  | "veryActive"
  | "extraActive";

const CalorieCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("male");
  const [height, setHeight] = useState<number | "">("");
  const [activityLevel, setActivityLevel] =
    useState<ActivityLevel>("moderatelyActive");
  const [calories, setCalories] = useState<number | null>(null);

  const activityLevels = {
    sedentary: { label: "Sedentary (little or no exercise)", factor: 1.2 },
    lightlyActive: {
      label: "Lightly Active (light exercise 1-3 days/week)",
      factor: 1.375,
    },
    moderatelyActive: {
      label: "Moderately Active (moderate exercise 3-5 days/week)",
      factor: 1.55,
    },
    veryActive: {
      label: "Very Active (hard exercise 6-7 days/week)",
      factor: 1.725,
    },
    extraActive: {
      label:
        "Extra Active (very hard exercise, physical job or training twice a day)",
      factor: 1.9,
    },
  };

  const calculateCalories = () => {
    if (weight && age && height) {
      // Mifflin-St Jeor Equation
      let bmr: number;

      if (gender === "male") {
        bmr =
          10 * (weight as number) +
          6.25 * (height as number) -
          5 * (age as number) +
          5;
      } else {
        bmr =
          10 * (weight as number) +
          6.25 * (height as number) -
          5 * (age as number) -
          161;
      }

      const totalCalories = bmr * activityLevels[activityLevel].factor;
      setCalories(Math.round(totalCalories));
    }
  };

  const resetCalculator = () => {
    setWeight("");
    setAge("");
    setHeight("");
    setGender("male");
    setActivityLevel("moderatelyActive");
    setCalories(null);
  };

  const getCalorieTips = () => {
    if (!calories) return [];

    return [
      "Take a 30-minute walk to burn approximately 100-200 calories",
      "Climbing stairs for 15 minutes can burn about 150 calories",
      "A 30-minute cycling session can burn 200-300 calories",
      "Swimming for 30 minutes burns around 250 calories",
      "HIIT workouts can burn up to 450 calories in 30 minutes",
    ];
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Calculate your daily calorie expenditure based on your body metrics and
        activity level.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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

            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value ? parseInt(e.target.value) : "")
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="Enter height"
                value={height}
                onChange={(e) =>
                  setHeight(e.target.value ? parseInt(e.target.value) : "")
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) =>
                  setWeight(e.target.value ? parseInt(e.target.value) : "")
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select
              value={activityLevel}
              onValueChange={(value) =>
                setActivityLevel(value as ActivityLevel)
              }
            >
              <SelectTrigger id="activity" className="text-sm">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(activityLevels).map(([key, { label }]) => (
                  <SelectItem key={key} value={key} className="text-sm">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateCalories}
              disabled={height === "" || weight === "" || age === ""}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate Calories
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
            {calories === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your details to calculate your daily calorie burn.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Your Daily Calorie Burn
                  </h3>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl md:text-5xl font-bold text-primary">
                      {calories}
                    </span>
                    <span className="text-base md:text-lg text-muted-foreground mb-1">
                      calories/day
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <ActivitySquare className="h-4 w-4 text-primary" />
                    <span>{activityLevels[activityLevel].label}</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Separator />
                  <div className="p-4 md:p-6 space-y-2">
                    <h4 className="font-medium text-sm md:text-base">
                      Tips to Increase Calorie Burn:
                    </h4>
                    <ul className="text-sm space-y-2">
                      {getCalorieTips().map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
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
          This calculator provides an estimate of your daily calorie
          expenditure. Individual results may vary based on factors such as
          metabolism, body composition, and specific activities. For
          personalized nutrition advice, consult with a healthcare professional.
        </p>
      </div>
    </div>
  );
};

export default CalorieCalculator;
