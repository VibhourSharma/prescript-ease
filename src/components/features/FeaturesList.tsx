import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Plus, FileText } from "lucide-react";
import BMICalculator from "./BMICalculator";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  component: React.ReactNode;
};

const FeaturesList: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>("bmi-calculator");

  const features: Feature[] = [
    {
      id: "bmi-calculator",
      title: "BMI Calculator",
      description:
        "Calculate your Body Mass Index and understand your weight category.",
      icon: Calculator,
      component: <BMICalculator />,
    },
    {
      id: "coming-soon-1",
      title: "Coming Soon",
      description: "New feature will be available shortly.",
      icon: Plus,
      component: (
        <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground text-lg">
            This feature is coming soon!
          </p>
        </div>
      ),
    },
    {
      id: "coming-soon-2",
      title: "Coming Soon",
      description: "New feature will be available shortly.",
      icon: FileText,
      component: (
        <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground text-lg">
            This feature is coming soon!
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-1">
        <div className="space-y-4 sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Available Features</h2>
          {features.map((feature) => (
            <>
              <Card
                className={`cursor-pointer hover:shadow-md transition-all duration-300 ${
                  activeFeature === feature.id
                    ? "border-primary/50 bg-primary/5"
                    : "hover:border-primary/30"
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div
                    className={`p-2 rounded-md ${
                      activeFeature === feature.id
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <>
          <h2 className="text-2xl font-bold mb-6">
            {features.find((f) => f.id === activeFeature)?.title}
          </h2>

          {features.find((f) => f.id === activeFeature)?.component}
        </>
      </div>
    </div>
  );
};

export default FeaturesList;
