import React, { useState } from "react";
import {
  AlertTriangle,
  Download,
  Printer,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { usePrescription } from "@/context/PrescriptionContext";
import MedicineItem from "./MedicineItem";

const ResultsView: React.FC = () => {
  const { prescriptionData } = usePrescription();
  console.log("prescriptionData", prescriptionData);
  const [activeTab, setActiveTab] = useState("overview");

  if (!prescriptionData) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">
          No prescription data available
        </h2>
        <p className="text-muted-foreground mb-6">
          Please upload a prescription to see results.
        </p>
        <Button asChild>
          <Link to="/upload">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to Upload
          </Link>
        </Button>
      </div>
    );
  }

  const { medicines, estimatedDiagnosis, accuracy, issues, rawText } =
    prescriptionData;

  const downloadResults = () => {
    const element = document.createElement("a");

    // Create a simple text version of the results
    let content = `PRESCRIPTION RESULTS\n\n`;
    content += `Diagnosis: ${estimatedDiagnosis}\n\n`;
    content += `MEDICINES:\n`;

    content += `\nRaw Prescription Text:\n${rawText}\n`;

    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "prescription_results.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Results downloaded successfully");
  };

  const printResults = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">Prescription Results</h2>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary min-w-fit"
            >
              {accuracy}% Accuracy
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Analyzed on {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={printResults}
            className="gap-1"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={downloadResults}
            className="gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medicines">Medicines</TabsTrigger>
          <TabsTrigger value="rawText">Raw Text</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="animate-fade-in">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Diagnosis</CardTitle>
                <CardDescription>
                  The identified medical condition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{estimatedDiagnosis}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Accuracy Score</CardTitle>
                  <CardDescription>
                    Confidence level of the analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{accuracy}%</span>
                      <span className="text-sm text-muted-foreground">
                        {accuracy > 90
                          ? "High Confidence"
                          : accuracy > 70
                          ? "Medium Confidence"
                          : "Low Confidence"}
                      </span>
                    </div>
                    <Progress value={accuracy} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Issues</CardTitle>
                  <CardDescription>
                    Potential issues with the Prescription
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {issues.map((issue, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-4 flex items-center gap-2 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
              <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-800">
                This information is for educational purposes only. Always
                consult your doctor or pharmacist for specific advice about your
                medication.
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medicines" className="animate-fade-in">
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Prescribed Medicines</h3>
              <p className="text-sm text-muted-foreground">
                A tentative interpretation of the medicines mentioned in the
                prescription.
              </p>
            </div>

            <div className="space-y-4">
              {medicines.map((medicine, index) => (
                <MedicineItem key={index} medicine={medicine} index={index} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rawText" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Raw Prescription Text</CardTitle>
              <CardDescription>
                Estimated text extracted from your prescription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-secondary/50 p-4 rounded-lg whitespace-pre-wrap text-sm font-mono overflow-x-auto">
                  {rawText}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsView;
