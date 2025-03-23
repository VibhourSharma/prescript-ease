import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";

interface HeartRateZone {
  name: string;
  intensity: string;
  min: number;
  max: number;
  description: string;
  color: string;
}

const HeartRateCalculator: React.FC = () => {
  const [age, setAge] = useState<number | "">("");
  const [restingHR, setRestingHR] = useState<number | "">("");
  const [heartRateZones, setHeartRateZones] = useState<HeartRateZone[] | null>(
    null
  );

  const calculateHeartRateZones = () => {
    if (age !== "" && restingHR !== "") {
      // Using Karvonen formula: Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR
      const maxHR = 220 - (age as number);
      const hrReserve = maxHR - (restingHR as number);

      const zones: HeartRateZone[] = [
        {
          name: "Zone 1",
          intensity: "Very Light",
          min: Math.round((restingHR as number) + hrReserve * 0.5),
          max: Math.round((restingHR as number) + hrReserve * 0.6),
          description: "Warm-up & Recovery",
          color: "bg-blue-400",
        },
        {
          name: "Zone 2",
          intensity: "Light",
          min: Math.round((restingHR as number) + hrReserve * 0.6),
          max: Math.round((restingHR as number) + hrReserve * 0.7),
          description: "Fat Burn & Base Building",
          color: "bg-green-400",
        },
        {
          name: "Zone 3",
          intensity: "Moderate",
          min: Math.round((restingHR as number) + hrReserve * 0.7),
          max: Math.round((restingHR as number) + hrReserve * 0.8),
          description: "Cardio & Endurance",
          color: "bg-yellow-400",
        },
        {
          name: "Zone 4",
          intensity: "Hard",
          min: Math.round((restingHR as number) + hrReserve * 0.8),
          max: Math.round((restingHR as number) + hrReserve * 0.9),
          description: "Anaerobic & Performance",
          color: "bg-orange-400",
        },
        {
          name: "Zone 5",
          intensity: "Maximum",
          min: Math.round((restingHR as number) + hrReserve * 0.9),
          max: maxHR,
          description: "Peak & Power",
          color: "bg-red-400",
        },
      ];

      setHeartRateZones(zones);
    }
  };

  const resetCalculator = () => {
    setAge("");
    setRestingHR("");
    setHeartRateZones(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Calculate your optimal heart rate zones for different exercise
        intensities based on your age and resting heart rate.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
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
              min={1}
              max={120}
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resting-hr">
              Resting Heart Rate (bpm)
              <span className="text-xs text-muted-foreground ml-2">
                (Measure when you first wake up)
              </span>
            </Label>
            <Input
              id="resting-hr"
              type="number"
              placeholder="Enter your resting heart rate"
              value={restingHR}
              onChange={(e) =>
                setRestingHR(e.target.value ? parseInt(e.target.value) : "")
              }
              min={30}
              max={120}
              className="text-base"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateHeartRateZones}
              disabled={age === "" || restingHR === ""}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate Heart Rate Zones
            </Button>

            <Button
              variant="outline"
              onClick={resetCalculator}
              className="transition-all duration-300"
            >
              Reset
            </Button>
          </div>

          <div className="bg-muted/30 p-3 rounded-lg text-xs md:text-sm">
            <p className="font-medium mb-1">
              How to find your resting heart rate:
            </p>
            <p className="text-muted-foreground">
              Take your pulse first thing in the morning before you get out of
              bed. Count the beats for 60 seconds, or count for 30 seconds and
              multiply by 2.
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {heartRateZones === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter your age and resting heart rate to calculate your target
                  heart rate zones.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart
                      className="h-5 w-5 text-red-500"
                      fill="rgba(239, 68, 68, 0.2)"
                    />
                    <h3 className="text-lg md:text-xl font-semibold">
                      Your Heart Rate Zones
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {heartRateZones.map((zone, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden border rounded-lg p-3"
                      >
                        <div
                          className={`absolute top-0 left-0 bottom-0 opacity-20 ${zone.color}`}
                          style={{ width: `${(index + 1) * 20}%` }}
                        ></div>
                        <div className="relative">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-semibold">
                                {zone.name}
                              </span>
                              <span className="ml-2 text-xs text-muted-foreground">
                                ({zone.intensity})
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold">
                                {zone.min} - {zone.max}
                              </span>
                              <span className="text-xs text-muted-foreground ml-1">
                                bpm
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {zone.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto bg-muted/20 p-4">
                  <h4 className="font-medium text-sm mb-2">Training Tips:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>
                      • For fat burning: Focus on Zone 2 for longer periods
                      (30-60 min)
                    </li>
                    <li>• For endurance: Spend most time in Zones 2-3</li>
                    <li>• For performance: Add intervals in Zones 4-5</li>
                    <li>
                      • Recovery days: Stay in Zone 1 to allow your body to heal
                    </li>
                    <li>
                      • Beginners: Start with Zones 1-2 and gradually progress
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 p-3 md:p-4 rounded-lg text-xs md:text-sm mt-4 md:mt-6">
        <p className="font-medium mb-1 md:mb-2">Important Note:</p>
        <p className="text-muted-foreground">
          These heart rate zones are estimates based on formulas. Individual
          factors like fitness level, medications, and health conditions may
          affect your actual zones. Consider working with a fitness professional
          for personalized heart rate training.
        </p>
      </div>
    </div>
  );
};

export default HeartRateCalculator;
