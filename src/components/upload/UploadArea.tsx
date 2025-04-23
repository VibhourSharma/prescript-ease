import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Image, X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePrescription } from "@/context/PrescriptionContext";
import { cn } from "@/lib/utils";

const UploadArea: React.FC = () => {
  // State variables
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setPrescriptionData } = usePrescription();

  // Handle drag events
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

  // Check if file is valid and set it to state
  const handleFile = (file: File) => {
    // Only accept image files (removed PDF)
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    // Check if file type is valid
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a JPG or PNG file only.");
      return;
    }

    // Check if file size is valid
    if (file.size > maxSize) {
      toast.error("File is too large. Maximum size is 10MB.");
      return;
    }

    // Set file and create preview
    setFile(file);

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFilePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Open file browser
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Remove selected file
  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Process the prescription image
  const handleProcessFile = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // Step 1: Send the image to AI for analysis
      const response = await puter.ai.chat(
        "Analyze this prescription image and extract medicine names, dosage, frequency, and other details. " +
          "Based on the medicines, suggest a possible diagnosis. " +
          "List any issues you encountered when analyzing the prescription (like unclear handwriting, incomplete information, etc). " +
          "Respond in JSON format with this structure: " +
          "{ " +
          '  "medicines": [{ "name": "MedicineName", "dosage": "Dosage", "frequency": "Frequency", "duration": "Duration", "notes": "Notes", ' +
          '    "details": { "purpose": "Purpose", "sideEffects": "Side effects", "warnings": "Warnings", "alternatives": ["Alt1", "Alt2"] } ' +
          "  }], " +
          '  "estimatedDiagnosis": "Diagnosis based on medicines", ' +
          '  "accuracy": prescription medicines accuracy score out of 100 where 100 being most and 0.1 being least accurate, ' +
          '  "issues": ["Issue with prescription clarity", "Missing information"], ' +
          '  "rawText": "Raw prescription text" ' +
          "}",
        file
      );

      // Step 2: Get the content from the response
      let jsonContent = response.message?.content || "";

      // Step 3: Clean up the response (remove code blocks)
      jsonContent = jsonContent.replace(/```json\n|\n```|```/g, "");

      // Step 4: Parse the JSON
      let prescriptionData;
      try {
        prescriptionData = JSON.parse(jsonContent);
      } catch (error) {
        console.error("Failed to parse response:", error);
        toast.error("Failed to analyze prescription. Please try again.");
        setIsUploading(false);
        return;
      }

      // Step 5: Set default values if anything is missing
      const finalData: PrescriptionData = {
        medicines: Array.isArray(prescriptionData.medicines)
          ? prescriptionData.medicines
          : [],
        estimatedDiagnosis:
          prescriptionData.estimatedDiagnosis || "Unknown diagnosis",
        accuracy: prescriptionData.accuracy || 0.1,
        issues: Array.isArray(prescriptionData.issues)
          ? prescriptionData.issues
          : ["Could not identify clear issues"],
        rawText:
          prescriptionData.rawText ||
          "Prescription text could not be extracted",
      };

      // Step 6: If no diagnosis was provided, try to generate one based on medicines
      if (
        finalData.estimatedDiagnosis === "Unknown diagnosis" &&
        finalData.medicines.length > 0
      ) {
        const medicineNames = finalData.medicines.map((m) => m.name).join(", ");
        finalData.estimatedDiagnosis = `Potential condition based on ${medicineNames}`;
      }

      // Step 7: Save the processed data
      setPrescriptionData(finalData);

      // Step 8: Show success message and navigate to results page
      toast.success("Prescription analyzed successfully!");
      navigate("/results");
    } catch (error) {
      console.error("Error analyzing prescription:", error);
      toast.error("Error analyzing prescription.");
    } finally {
      setIsUploading(false);
    }
  };

  // Get icon for file type
  const getFileIcon = () => {
    if (!file) return null;

    return <Image className="h-6 w-6 text-blue-500" />;
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        aria-label="Upload prescription file"
      />

      {/* Drop zone area */}
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
          // Empty state - show upload UI
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
              Supported formats: JPG, PNG (Max size: 10MB)
            </p>
          </div>
        ) : (
          // File selected state
          <div className="space-y-6">
            {/* File preview */}
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
              {/* Remove button */}
              <button
                onClick={removeFile}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* File info and process button */}
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

            {/* Loading message */}
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
