import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays, differenceInWeeks, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PregnancyDueDateCalculator: React.FC = () => {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const calculateDueDate = () => {
    if (lmpDate) {
      // Naegele's rule: LMP + 280 days (40 weeks)
      const calculatedDueDate = addDays(lmpDate, 280);
      setDueDate(calculatedDueDate);
    }
  };

  const getCurrentTrimester = (): {
    trimester: number;
    weeks: number;
  } | null => {
    if (!lmpDate || !dueDate) return null;

    const today = new Date();

    // If before LMP, not pregnant yet
    if (isBefore(today, lmpDate)) {
      return null;
    }

    // If after due date, baby is overdue
    if (isBefore(dueDate, today)) {
      return { trimester: 3, weeks: 40 };
    }

    const weeksPregnant = differenceInWeeks(today, lmpDate);

    if (weeksPregnant < 13) {
      return { trimester: 1, weeks: weeksPregnant };
    } else if (weeksPregnant < 27) {
      return { trimester: 2, weeks: weeksPregnant };
    } else {
      return { trimester: 3, weeks: weeksPregnant };
    }
  };

  const resetCalculator = () => {
    setLmpDate(undefined);
    setDueDate(null);
  };

  const trimesterInfo = getCurrentTrimester();

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Calculate your estimated due date based on the first day of your last
        menstrual period (LMP).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lmp-date">Last Menstrual Period (LMP)</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="lmp-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !lmpDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lmpDate ? format(lmpDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={lmpDate}
                  onSelect={(date) => {
                    setLmpDate(date);
                    setCalendarOpen(false);
                  }}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateDueDate}
              disabled={!lmpDate}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate Due Date
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
            <p className="font-medium mb-1">How is the due date calculated?</p>
            <p className="text-muted-foreground">
              The due date is calculated using Naegele's rule, which adds 280
              days (40 weeks) to the first day of your last menstrual period.
              This is an estimate, as most pregnancies last between 38 and 42
              weeks.
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {dueDate === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Enter the first day of your last period to calculate your
                  estimated due date.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-4">
                    Your Pregnancy Timeline
                  </h3>

                  <div className="bg-primary/5 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      Estimated Due Date
                    </h4>
                    <p className="text-2xl md:text-3xl font-bold text-primary">
                      {format(dueDate, "MMMM d, yyyy")}
                    </p>
                  </div>

                  {trimesterInfo && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">
                          Current Stage
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-medium">
                            Trimester {trimesterInfo.trimester}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                            Week {trimesterInfo.weeks}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              (trimesterInfo.weeks / 40) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>

                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>Trimester 1</span>
                        <span>Trimester 2</span>
                        <span>Trimester 3</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto bg-muted/20 p-4">
                  <h4 className="font-medium text-sm mb-2">
                    Trimester {trimesterInfo?.trimester} Highlights:
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {trimesterInfo?.trimester === 1 ? (
                      <>
                        <li>• Baby's major organs are developing</li>
                        <li>• Morning sickness may peak</li>
                        <li>• Fatigue is common</li>
                        <li>• First ultrasound may be scheduled</li>
                      </>
                    ) : trimesterInfo?.trimester === 2 ? (
                      <>
                        <li>• You may feel baby's first movements</li>
                        <li>• Morning sickness often improves</li>
                        <li>• Energy levels typically increase</li>
                        <li>• Baby's gender may be visible on ultrasound</li>
                      </>
                    ) : (
                      <>
                        <li>• Baby is gaining weight rapidly</li>
                        <li>• You may experience Braxton Hicks contractions</li>
                        <li>• Sleeping may become more difficult</li>
                        <li>• Baby settles into birth position</li>
                      </>
                    )}
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
          This calculator provides an estimate only and should not replace
          professional medical advice. Consult with your healthcare provider for
          the most accurate due date estimation and prenatal care.
        </p>
      </div>
    </div>
  );
};

export default PregnancyDueDateCalculator;
