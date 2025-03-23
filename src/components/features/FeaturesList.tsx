import React, { useState } from "react";
import {
  Calculator,
  Users,
  Scale,
  Heart,
  Calendar,
  Activity,
  Apple,
  Wine,
  Clock,
  ChevronDown,
} from "lucide-react";
import BMICalculator from "@/components/features/BMICalculator";
import BodyFatCalculator from "@/components/features/BodyFatCalculator";
import CalorieCalculator from "@/components/features/CalorieCalculator";
import IdealWeightCalculator from "@/components/features/IdealWeightCalculator";
import PregnancyDueDateCalculator from "@/components/features/PregnancyDueDateCalculator";
import HeartRateCalculator from "@/components/features/HeartRateCalculator";
import ProteinCalculator from "@/components/features/ProteinCalculator";
import BACCalculator from "@/components/features/BACCalculator";
import AgeCalculator from "@/components/features/AgeCalculator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.ReactNode;
  status: "available" | "coming-soon";
};

interface FeaturesListProps {
  isMobile?: boolean;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ isMobile }) => {
  const [activeFeature, setActiveFeature] = useState<string>("bmi-calculator");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const features: Feature[] = [
    {
      id: "bmi-calculator",
      title: "BMI Calculator",
      description:
        "Calculate your Body Mass Index and understand your weight category.",
      icon: Calculator,
      component: <BMICalculator />,
      status: "available",
    },
    {
      id: "body-fat-calculator",
      title: "Body Fat Calculator",
      description: "Estimate your body fat percentage based on measurements.",
      icon: Users,
      component: <BodyFatCalculator />,
      status: "available",
    },
    {
      id: "calorie-calculator",
      title: "Daily Calorie Calculator",
      description: "Calculate your daily calorie burn based on activity level.",
      icon: Activity,
      component: <CalorieCalculator />,
      status: "available",
    },
    {
      id: "ideal-weight-calculator",
      title: "Ideal Weight Calculator",
      description: "Find your ideal weight range based on height and frame.",
      icon: Scale,
      component: <IdealWeightCalculator />,
      status: "available",
    },
    {
      id: "due-date-calculator",
      title: "Pregnancy Due Date",
      description:
        "Calculate estimated due date based on last menstrual period.",
      icon: Calendar,
      component: <PregnancyDueDateCalculator />,
      status: "available",
    },
    {
      id: "heart-rate-calculator",
      title: "Heart Rate Zones",
      description: "Calculate your optimal heart rate zones for exercise.",
      icon: Heart,
      component: <HeartRateCalculator />,
      status: "available",
    },
    {
      id: "protein-calculator",
      title: "Protein Intake",
      description: "Calculate your daily protein requirements.",
      icon: Apple,
      component: <ProteinCalculator />,
      status: "available",
    },
    {
      id: "bac-calculator",
      title: "Blood Alcohol Content",
      description: "Estimate your blood alcohol content based on consumption.",
      icon: Wine,
      component: <BACCalculator />,
      status: "available",
    },
    {
      id: "age-calculator",
      title: "Age Calculator",
      description: "Calculate your exact age in years, months, and days.",
      icon: Clock,
      component: <AgeCalculator />,
      status: "available",
    },
  ];

  // Filter features by status
  const availableFeatures = features.filter((f) => f.status === "available");
  const comingSoonFeatures = features.filter((f) => f.status === "coming-soon");

  const handleFeatureSelect = (featureId: string) => {
    setActiveFeature(featureId);
    setIsMenuOpen(false);
    setIsPopoverOpen(false);
  };

  // Component for feature selector (used on both mobile and desktop)
  const FeatureSelector = ({
    isCollapsible = true,
  }: {
    isCollapsible?: boolean;
  }) => {
    const activeFeatureData = features.find((f) => f.id === activeFeature);

    return (
      <Collapsible
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        className="w-full border rounded-lg overflow-hidden bg-card"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              {activeFeatureData?.icon &&
                React.createElement(activeFeatureData.icon, { size: 20 })}
            </div>
            <div>
              <h3 className="font-semibold">Select Calculator</h3>
              <p className="text-sm text-muted-foreground">
                {activeFeatureData?.title}
              </p>
            </div>
          </div>
          {isCollapsible && (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          )}
        </div>

        <CollapsibleContent>
          <div className="p-2 divide-y">
            <div className="py-2">
              <p className="px-3 py-2 text-sm font-medium text-muted-foreground">
                Health Calculators
              </p>
              {availableFeatures.map((feature) => (
                <Button
                  key={feature.id}
                  variant="ghost"
                  className={`w-full justify-start mb-1 ${
                    activeFeature === feature.id
                      ? "bg-primary/10 text-primary"
                      : ""
                  }`}
                  onClick={() => handleFeatureSelect(feature.id)}
                >
                  <feature.icon className="mr-2 h-5 w-5" />
                  {feature.title}
                </Button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  // Component for desktop feature selector using Command (combobox)
  const DesktopFeatureSelector = () => {
    const activeFeatureData = features.find((f) => f.id === activeFeature);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Health Calculators</h2>
        <p className="text-muted-foreground mb-4">
          Select a calculator from our collection to help monitor and improve
          your health metrics.
        </p>

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                {activeFeatureData?.icon &&
                  React.createElement(activeFeatureData.icon, {
                    className: "h-4 w-4",
                  })}
                <span>
                  {activeFeatureData?.title || "Select calculator..."}
                </span>
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search calculators..." />
              <CommandList>
                <CommandEmpty>No calculator found.</CommandEmpty>
                <CommandGroup heading="Health Calculators">
                  {availableFeatures.map((feature) => (
                    <CommandItem
                      key={feature.id}
                      value={feature.title}
                      onSelect={() => handleFeatureSelect(feature.id)}
                      className="flex items-center gap-2"
                    >
                      <feature.icon className="h-4 w-4" />
                      <span>{feature.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {comingSoonFeatures.length > 0 && (
                  <CommandGroup heading="Coming Soon">
                    {comingSoonFeatures.map((feature) => (
                      <CommandItem
                        key={feature.id}
                        value={feature.title}
                        disabled
                        className="flex items-center gap-2 opacity-50"
                      >
                        <feature.icon className="h-4 w-4" />
                        <span>{feature.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className="mt-4 md:mt-8">
      {isMobile ? (
        <>
          <div className="mb-6">
            <FeatureSelector />
          </div>

          <div className="bg-background border rounded-xl p-4 md:p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              {features.find((f) => f.id === activeFeature)?.title}
            </h2>

            {features.find((f) => f.id === activeFeature)?.component}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-1">
            <DesktopFeatureSelector />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-background border rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">
                {features.find((f) => f.id === activeFeature)?.title}
              </h2>

              {features.find((f) => f.id === activeFeature)?.component}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesList;
