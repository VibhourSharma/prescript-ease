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
import { Apple, Sandwich, Coffee, Beef, Fish, Egg } from "lucide-react";

const ProteinCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("active");
  const [proteinNeed, setProteinNeed] = useState<number | null>(null);

  const activityFactors = {
    sedentary: { factor: 0.8, description: "Little to no exercise" },
    active: { factor: 1.2, description: "Regular exercise 3-5 times a week" },
    athlete: { factor: 1.8, description: "Intense training 6+ times a week" },
  };

  const calculateProteinNeed = () => {
    if (weight) {
      const factor = activityFactors[activityLevel].factor;
      // Calculate daily protein need in grams (based on kg of body weight)
      const protein = Math.round((weight as number) * factor);
      setProteinNeed(protein);
    }
  };

  const resetCalculator = () => {
    setWeight("");
    setActivityLevel("active");
    setProteinNeed(null);
  };

  const getProteinSources = (): ProteinSource[] => {
    return [
      {
        name: "Chicken Breast",
        amount: "100g (3.5oz)",
        protein: 31,
        icon: <Beef className="h-4 w-4" />,
      },
      {
        name: "Greek Yogurt",
        amount: "1 cup (245g)",
        protein: 23,
        icon: <Coffee className="h-4 w-4" />,
      },
      {
        name: "Salmon",
        amount: "100g (3.5oz)",
        protein: 25,
        icon: <Fish className="h-4 w-4" />,
      },
      {
        name: "Eggs",
        amount: "2 large",
        protein: 12,
        icon: <Egg className="h-4 w-4" />,
      },
      {
        name: "Lentils",
        amount: "1 cup cooked",
        protein: 18,
        icon: <Apple className="h-4 w-4" />,
      },
      {
        name: "Tofu",
        amount: "100g (3.5oz)",
        protein: 8,
        icon: <Sandwich className="h-4 w-4" />,
      },
    ];
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Calculate how much protein you need daily based on your weight and
        activity level.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value ? parseFloat(e.target.value) : "")
              }
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select
              value={activityLevel}
              onValueChange={(value) =>
                setActivityLevel(value as ActivityLevel)
              }
            >
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="athlete">Athlete</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {activityFactors[activityLevel].description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateProteinNeed}
              disabled={weight === ""}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate Protein Needs
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
            {proteinNeed === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your weight and activity level to calculate your daily
                  protein requirement.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6 space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Your Daily Protein Needs
                  </h3>

                  <div className="flex items-end gap-1">
                    <span className="text-3xl md:text-5xl font-bold text-primary">
                      {proteinNeed}
                    </span>
                    <span className="text-base md:text-lg text-muted-foreground mb-1">
                      grams per day
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Based on your weight of {weight}kg and {activityLevel}{" "}
                    activity level.
                  </p>
                </div>

                <div className="mt-auto">
                  <h4 className="font-medium text-sm px-4 pt-2 pb-3">
                    Protein-Rich Food Examples:
                  </h4>
                  <div className="bg-muted/20 p-2 md:p-3 max-h-56 overflow-auto">
                    <div className="space-y-2">
                      {getProteinSources().map((source, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 border-b last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {source.icon}
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {source.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {source.amount}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">
                              {source.protein}g
                            </p>
                            <p className="text-xs text-muted-foreground">
                              protein
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
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
          Protein needs vary based on individual factors such as age, health
          status, and specific training goals. This calculator provides general
          recommendations. For personalized nutrition advice, consult with a
          registered dietitian.
        </p>
      </div>
    </div>
  );
};

export default ProteinCalculator;
