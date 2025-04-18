import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, File, Image, FileText, X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePrescription } from "@/context/PrescriptionContext";
import { cn } from "@/lib/utils";

const UploadArea: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setPrescriptionData } = usePrescription();

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG, PNG, or PDF file.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("File is too large. Maximum size is 10MB.");
      return;
    }

    setFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!file) return null;

    switch (file.type) {
      case "image/jpeg":
      case "image/png":
      case "image/jpg":
        return <Image className="h-6 w-6 text-blue-500" />;
      case "application/pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const handleProcessFile = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would send the file to your backend here
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch('/api/decode-prescription', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      // Mock prescription data for demo
      const mockData = {
        medicines: [
          {
            name: "Amoxicillin",
            details: {
              purpose: "Antibiotic for treating bacterial infections",
              sideEffects: "Nausea, vomiting, diarrhea, rash",
              warnings:
                "May cause allergic reactions in some patients, may not be effective in some cases, may not be effective in some cases",
              alternatives: ["Azithromycin", "Clarithromycin"],
            },
          },
          {
            name: "Ibuprofen",
            dosage: "400mg",
            frequency: "Every 6 hours as needed",
            duration: "5 days",
            notes: "For pain and inflammation",
            details: {
              purpose:
                "Non-steroidal anti-inflammatory drug (NSAID) for pain relief",
              sideEffects: "Stomach upset, heartburn, dizziness",
              warnings:
                "Not recommended for patients with certain heart conditions",
              alternatives: ["Acetaminophen", "Naproxen"],
            },
          },
          {
            name: "Loratadine",
            dosage: "10mg",
            frequency: "Once daily",
            duration: "As needed",
            notes: "Take in the morning",
            details: {
              purpose: "Antihistamine for allergy symptoms",
              sideEffects: "Drowsiness, dry mouth, headache",
              warnings: "May cause drowsiness in some patients",
              alternatives: ["Cetirizine", "Fexofenadine"],
            },
          },
        ],
        diagnosis: "Upper respiratory infection with allergic rhinitis",
        accuracy: 95,
        issues: [
          "Some dosage instructions might be unclear",
          "Check with pharmacist about interactions",
        ],
        rawText:
          "Rx\n1. Amoxicillin 500mg - 1 tablet three times daily for 7 days\n2. Ibuprofen 400mg - 1 tablet every 6 hours as needed for 5 days\n3. Loratadine 10mg - 1 tablet daily in the morning as needed\n\nDiagnosis: Upper respiratory infection with allergic rhinitis\nReturn if symptoms worsen or do not improve in 5 days.\n\nDr. Smith",
      };

      // Save the data to context
      setPrescriptionData(mockData);

      toast.success("Prescription uploaded successfully!");

      // Navigate to results page
      navigate("/results");
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing prescription. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/jpeg,image/png,image/jpg,application/pdf"
        className="hidden"
        aria-label="Upload prescription file"
      />

      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-10 transition-all duration-300 text-center",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          file ? "bg-secondary/30" : "bg-transparent"
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {!file ? (
          <div className="space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary animate-bounce-slow" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">
                Upload your prescription
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="mx-auto"
              >
                Browse Files
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, PDF (Max size: 10MB)
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              {filePreview ? (
                <div className="relative w-40 h-40 mx-auto overflow-hidden rounded-lg shadow-sm border border-border">
                  <img
                    src={filePreview}
                    alt="Prescription preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-secondary/70 rounded-lg mx-auto flex items-center justify-center">
                  {getFileIcon()}
                </div>
              )}
              <button
                onClick={removeFile}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <p className="font-medium text-sm mb-1">{file.name}</p>
              <p className="text-xs text-muted-foreground mb-4">
                {(file.size / 1024).toFixed(2)} KB • {file.type}
              </p>

              <Button
                onClick={handleProcessFile}
                disabled={isUploading}
                className="mx-auto"
              >
                {isUploading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Process Prescription"
                )}
              </Button>
            </div>
            {isUploading && (
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Analyzing your prescription... This may take a few moments.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
