
import React, { useState } from 'react';
import { Check, AlertTriangle, Download, Copy, Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { usePrescription } from '@/context/PrescriptionContext';
import MedicineItem from './MedicineItem';
import { cn } from '@/lib/utils';

const ResultsView: React.FC = () => {
  const { prescriptionData } = usePrescription();
  const [activeTab, setActiveTab] = useState('overview');

  if (!prescriptionData) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No prescription data available</h2>
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

  const { medicines, diagnosis, accuracy, issues, rawText } = prescriptionData;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied to clipboard`);
      })
      .catch((err) => {
        console.error('Error copying text: ', err);
        toast.error('Failed to copy text');
      });
  };

  const downloadResults = () => {
    const element = document.createElement('a');
    
    // Create a simple text version of the results
    let content = `PRESCRIPTION RESULTS\n\n`;
    content += `Diagnosis: ${diagnosis}\n\n`;
    content += `MEDICINES:\n`;
    
    medicines.forEach((med, index) => {
      content += `${index + 1}. ${med.name} - ${med.dosage}\n`;
      content += `   Frequency: ${med.frequency}\n`;
      content += `   Duration: ${med.duration}\n`;
      content += `   Notes: ${med.notes}\n\n`;
    });
    
    content += `\nRaw Prescription Text:\n${rawText}\n`;
    
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'prescription_results.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Results downloaded successfully');
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
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {accuracy}% Accuracy
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Analyzed on {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(rawText, 'Raw text')} className="gap-1">
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">Copy Text</span>
          </Button>
          <Button variant="outline" size="sm" onClick={printResults} className="gap-1">
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          <Button variant="default" size="sm" onClick={downloadResults} className="gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                <CardDescription>The identified medical condition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{diagnosis}</p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Accuracy Score</CardTitle>
                  <CardDescription>Confidence level of the analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{accuracy}%</span>
                      <span className="text-sm text-muted-foreground">
                        {accuracy > 90 ? 'High Confidence' : accuracy > 70 ? 'Medium Confidence' : 'Low Confidence'}
                      </span>
                    </div>
                    <Progress value={accuracy} className="h-2" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Issues</CardTitle>
                  <CardDescription>Potential concerns identified</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Summary</CardTitle>
                <CardDescription>Key information from your prescription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Medicines ({medicines.length})</h4>
                    <ul className="space-y-2">
                      {medicines.map((medicine, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>
                            <span className="font-medium">{medicine.name}</span> - {medicine.dosage}, {medicine.frequency}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => copyToClipboard(`${medicine.name} - ${medicine.dosage}, ${medicine.frequency}, ${medicine.duration}. ${medicine.notes}`, 'Medicine details')}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Alert>
              <AlertTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Important Notice
              </AlertTitle>
              <AlertDescription>
                This analysis is provided for informational purposes only and should not replace 
                professional medical advice. Always consult with your healthcare provider.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
        
        <TabsContent value="medicines" className="animate-fade-in">
          <div className="space-y-6">
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Prescribed Medicines</h3>
              <p className="text-sm text-muted-foreground">
                Click on each medicine to view detailed information.
              </p>
            </div>
            
            <div className="space-y-4">
              {medicines.map((medicine, index) => (
                <MedicineItem 
                  key={index}
                  medicine={medicine}
                  index={index}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rawText" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Raw Prescription Text</CardTitle>
              <CardDescription>The exact text extracted from your prescription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-secondary/50 p-4 rounded-lg whitespace-pre-wrap text-sm font-mono overflow-x-auto">
                  {rawText}
                </pre>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(rawText, 'Raw text')}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsView;
