
import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-64 -top-64 w-96 h-96 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '-1.5s' }}></div>
        <div className="absolute -left-64 top-40 w-96 h-96 rounded-full bg-primary/10 animate-float" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute right-20 bottom-10 w-64 h-64 rounded-full bg-primary/5 animate-float" style={{ animationDelay: '-0.5s' }}></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6 animate-fade-in">
              Simplifying Healthcare
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-slide-up text-balance">
            Decode Medical Prescriptions with <span className="text-primary">Precision</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200 text-balance">
            Upload your prescription and get instant, accurate translations with detailed medicine information, all in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-300">
            <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
              <Link to="/upload">
                <Upload className="h-4 w-4" />
                Upload Prescription
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              <Link to="#how-it-works">
                How It Works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center gap-6 flex-wrap">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-sm text-muted-foreground">99% Accuracy</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-sm text-muted-foreground">Trusted by 10k+ Users</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-sm text-muted-foreground">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
          <path fill="currentColor" fillOpacity="0.05" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,74.7C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
