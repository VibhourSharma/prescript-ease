import { Upload, Search, FileCheck } from "lucide-react";

const Step = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center relative">
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative z-10">
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-sm min-h-[200px] flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm flex-grow">{description}</p>
    </div>
  </div>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 px-4 relative bg-secondary/50">
    <div className="container mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          How The Platform Works
        </h2>
        <p className="text-lg text-muted-foreground">
          Converting complex prescriptions into clear, understandable
          information in just three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <Step
          icon={<Upload className="h-6 w-6" />}
          title="Upload Your Prescription"
          description="Snap a photo or upload an image of your prescription. Our system accepts various formats including JPG, PNG, and PDF."
        />
        <Step
          icon={<Search className="h-6 w-6" />}
          title="Automatic Decoding"
          description="Our advanced AI instantly processes the image, recognizing handwriting, medical terms, and prescription elements with high accuracy."
        />
        <Step
          icon={<FileCheck className="h-6 w-6" />}
          title="View Detailed Results"
          description="Get a complete breakdown of your prescription including medication names, dosages, usage instructions, and even potential drug interactions."
        />
      </div>
    </div>
  </section>
);

export default HowItWorks;
