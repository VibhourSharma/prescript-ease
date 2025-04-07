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
import { Scale } from "lucide-react";

const IdealWeightCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | "">("");
  const [gender, setGender] = useState<string>("male");
  const [frameSize, setFrameSize] = useState<FrameSize>("medium");
  const [idealWeight, setIdealWeight] = useState<{
    min: number;
    max: number;
  } | null>(null);

  const frameSizeFactors = {
    small: { male: -10, female: -8 },
    medium: { male: 0, female: 0 },
    large: { male: 10, female: 8 },
  };

  const calculateIdealWeight = () => {
    if (height) {
      // Use the Devine formula as a base
      let baseWeight: number;

      if (gender === "male") {
        baseWeight = 50 + (2.3 * ((height as number) - 152.4)) / 2.54;
      } else {
        baseWeight = 45.5 + (2.3 * ((height as number) - 152.4)) / 2.54;
      }

      // Adjust for frame size
      const adjustment =
        frameSizeFactors[frameSize][gender as "male" | "female"];
      const min = Math.round(baseWeight - 5 + adjustment);
      const max = Math.round(baseWeight + 5 + adjustment);

      setIdealWeight({ min, max });
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setGender("male");
    setFrameSize("medium");
    setIdealWeight(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Find your ideal weight range based on your height, gender, and frame
        size.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="Enter your height"
              value={height}
              onChange={(e) =>
                setHeight(e.target.value ? parseInt(e.target.value) : "")
              }
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={(value) => setGender(value)}>
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
            <Label htmlFor="frame">Body Frame Size</Label>
            <Select
              value={frameSize}
              onValueChange={(value) => setFrameSize(value as FrameSize)}
            >
              <SelectTrigger id="frame">
                <SelectValue placeholder="Select frame size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateIdealWeight}
              disabled={height === ""}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate Ideal Weight
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
            {idealWeight === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your height, gender, and frame size to calculate your
                  ideal weight range.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6 space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Your Ideal Weight Range
                  </h3>

                  <div className="flex items-center justify-center py-4">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/10 rounded-full"></div>
                      <div className="relative text-center space-y-1">
                        <Scale className="h-10 w-10 text-primary mx-auto mb-2" />
                        <div className="text-4xl font-bold text-primary">
                          {idealWeight.min}-{idealWeight.max}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          kilograms
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm">
                      For a {gender} with a height of {height}cm and a{" "}
                      {frameSize} frame, an ideal weight range is between{" "}
                      <span className="font-medium">
                        {idealWeight.min} and {idealWeight.max} kg
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="mt-auto bg-muted/20 p-4">
                  <h4 className="font-medium text-sm mb-2">What this means:</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    This is an estimate based on standard formulas. Your
                    personal ideal weight may vary based on factors like muscle
                    mass, bone density, and overall body composition. Always
                    consult with a healthcare professional for personalized
                    advice.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdealWeightCalculator;
