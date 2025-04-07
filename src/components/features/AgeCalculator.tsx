import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  format,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  addYears,
  addMonths,
} from "date-fns";

import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [age, setAge] = useState<AgeResult | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const today = new Date();

  // Calculate age whenever birthDate changes
  useEffect(() => {
    if (birthDate) {
      calculateAge();
    }
  }, [birthDate]);

  const calculateAge = () => {
    if (!birthDate) return;

    // Today without time
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Calculate years
    const years = differenceInYears(currentDate, birthDate);

    // Calculate total months and remaining months
    const totalMonths = differenceInMonths(currentDate, birthDate);
    const months = totalMonths % 12;

    // Calculate days
    // Add years and months to birthdate to get to the same point in time as today
    const tempDate = addMonths(addYears(birthDate, years), months);
    // Calculate the remaining days
    const days = differenceInDays(currentDate, tempDate);

    // Calculate total days alive
    const totalDays = differenceInDays(currentDate, birthDate);

    // Calculate next birthday
    const nextBirthdayYear =
      currentDate.getMonth() > birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() >= birthDate.getDate())
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();

    const nextBirthday = new Date(
      nextBirthdayYear,
      birthDate.getMonth(),
      birthDate.getDate()
    );

    // Calculate days until next birthday
    const daysUntilNextBirthday = differenceInDays(nextBirthday, currentDate);

    setAge({
      years,
      months,
      days,
      totalDays,
      nextBirthday,
      daysUntilNextBirthday,
    });
  };

  const resetCalculator = () => {
    setBirthDate(undefined);
    setAge(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-muted-foreground mb-4">
        Calculate your exact age in years, months, and days based on your date
        of birth.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birth-date">Date of Birth</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="birth-date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !birthDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate
                    ? format(birthDate, "PPP")
                    : "Select date of birth"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={(date) => {
                    setBirthDate(date);
                    setCalendarOpen(false);
                  }}
                  disabled={(date) => date > today}
                  initialFocus
                  defaultMonth={new Date(today.getFullYear() - 20, 0)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={calculateAge}
              disabled={!birthDate}
              className="transition-all duration-300 hover:scale-105"
            >
              Calculate Age
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
            <p className="font-medium mb-1">Did you know?</p>
            <p className="text-muted-foreground">
              The way we measure age varies across cultures. Some East Asian
              countries consider a baby to be one year old at birth, and
              everyone gets a year older on New Year's Day, not on their
              birthday.
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {age === null ? (
              <div className="flex items-center justify-center h-full min-h-40 md:min-h-52 p-4 md:p-6 text-center">
                <p className="text-sm md:text-base text-muted-foreground">
                  Select your date of birth to calculate your exact age.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg md:text-xl font-semibold">
                      Your Age
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-center py-2">
                    <div className="bg-primary/10 p-3 rounded-lg text-center w-24">
                      <div className="text-3xl font-bold text-primary">
                        {age.years}
                      </div>
                      <div className="text-xs text-muted-foreground">Years</div>
                    </div>

                    <div className="bg-primary/10 p-3 rounded-lg text-center w-24">
                      <div className="text-3xl font-bold text-primary">
                        {age.months}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Months
                      </div>
                    </div>

                    <div className="bg-primary/10 p-3 rounded-lg text-center w-24">
                      <div className="text-3xl font-bold text-primary">
                        {age.days}
                      </div>
                      <div className="text-xs text-muted-foreground">Days</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Total days you've been alive:</span>
                      <span className="font-medium text-foreground">
                        {age.totalDays.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Next birthday:</span>
                      <span className="font-medium text-foreground">
                        {format(age.nextBirthday, "MMMM d, yyyy")}
                      </span>
                    </div>

                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>Days until next birthday:</span>
                      <span className="font-medium text-foreground">
                        {age.daysUntilNextBirthday}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto bg-muted/20 p-4">
                  <h4 className="font-medium text-sm mb-2">Born on:</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {format(birthDate as Date, "MMMM d, yyyy")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(birthDate as Date, "EEEE")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgeCalculator;
