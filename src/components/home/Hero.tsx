import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, ChevronRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 md:pt-40 overflow-hidden sm:min-h-screen bg-secondary/50">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4 max-w-fit">
              Simplifying Healthcare
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Decode Prescriptions With{" "}
              <span className="text-primary">AI Precision</span>
            </h1>

            <p className="mt-6 text-xl text-muted-foreground max-w-xl">
              Transform hard-to-read prescriptions into clear, actionable
              information in seconds with our advanced AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button asChild size="lg" className="group">
                <Link to="/upload" className="flex items-center gap-2">
                  <FileUp size={18} />
                  Upload Prescription
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/#how-it-works" className="flex items-center gap-2">
                  <FileText size={18} />
                  Learn How It Works
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="mt-12 flex justify-center gap-6 flex-wrap">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-muted-foreground">
                    99% Accuracy
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-muted-foreground">
                    Trusted by 10k+ Users
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-muted-foreground">
                    HIPAA Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative z-10 w-full max-w-lg mx-auto lg:ml-auto">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-background to-muted overflow-hidden shadow-xl border border-border/40 p-5 backdrop-blur-sm">
                <div className="bg-foreground/5 rounded-lg h-full flex flex-col">
                  <div className="bg-background/80 p-3 flex gap-2 border-b border-border/40">
                    <div className="w-3 h-3 rounded-full bg-destructive/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                  </div>
                  <div className="flex-1 p-4 relative">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA0Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0tNCAwSDI4di00aDR2NHptLTYgMGgtNHYtNGg0djR6bS02IDBoLTJ2LTRoMnY0em0tNCAwSDEwdi00aDR2NHptLTYgMEg0di00aDJ2NHptMzYtNGgtM3Y0aDN2LTR6TTQgMzBoLTJ2NGgydi00em0wLThoLTJ2NGgydi00em0wLThoLTJ2NGgydi00em0wLThoLTJ2NGgyVjZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
                    <div className="h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="h-6 bg-foreground/10 rounded animate-pulse-light"></div>
                        <div className="h-4 w-3/4 bg-foreground/10 rounded animate-pulse-light delay-75"></div>
                        <div className="h-4 w-5/6 bg-foreground/10 rounded animate-pulse-light delay-150"></div>
                      </div>
                      <div className="mt-auto space-y-2">
                        <div className="h-10 bg-foreground/5 rounded-lg border border-border/40 flex items-center px-4">
                          <div className="w-4 h-4 rounded-full bg-primary/20 mr-3"></div>
                          <div className="h-4 w-1/2 bg-foreground/10 rounded"></div>
                        </div>
                        <div className="h-10 bg-foreground/5 rounded-lg border border-border/40 flex items-center px-4">
                          <div className="w-4 h-4 rounded-full bg-primary/20 mr-3"></div>
                          <div className="h-4 w-2/3 bg-foreground/10 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// import React from "react";
// import { Link } from "react-router-dom";
// import { Upload, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const Hero: React.FC = () => {
//   return (
//     <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
//       {/* Background decorations */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div
//           className="absolute -right-64 -top-64 w-96 h-96 rounded-full bg-primary/5 animate-float"
//           style={{ animationDelay: "-1.5s" }}
//         ></div>
//         <div
//           className="absolute -left-64 top-40 w-96 h-96 rounded-full bg-primary/10 animate-float"
//           style={{ animationDelay: "-1s" }}
//         ></div>
//         <div
//           className="absolute right-20 bottom-10 w-64 h-64 rounded-full bg-primary/5 animate-float"
//           style={{ animationDelay: "-0.5s" }}
//         ></div>
//       </div>

//       <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
//         <div className="text-center max-w-3xl mx-auto">
//           <div className="inline-block">
//             <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6 animate-fade-in">
//               Simplifying Healthcare
//             </span>
//           </div>

//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-slide-up text-balance">
//             Decode Medical <br /> Prescriptions with{" "}
//             <span className="text-primary">Precision</span>
//           </h1>

//           <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up animation-delay-200 text-balance">
//             Upload your prescription and get instant, accurate translations with
//             detailed medicine information, all in seconds.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-300">
//             <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
//               <Link to="/upload">
//                 <Upload className="h-4 w-4" />
//                 Upload Prescription
//               </Link>
//             </Button>
//             <Button
//               asChild
//               variant="outline"
//               size="lg"
//               className="gap-2 w-full sm:w-auto"
//             >
//               <Link to="/features">
//                 Features
//                 <ArrowRight className="h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           <div className="mt-12 flex justify-center gap-6 flex-wrap">
//             <div className="flex items-center">
//               <svg
//                 className="h-5 w-5 text-primary"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="ml-2 text-sm text-muted-foreground">
//                 99% Accuracy
//               </span>
//             </div>
//             <div className="flex items-center">
//               <svg
//                 className="h-5 w-5 text-primary"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="ml-2 text-sm text-muted-foreground">
//                 Trusted by 10k+ Users
//               </span>
//             </div>
//             <div className="flex items-center">
//               <svg
//                 className="h-5 w-5 text-primary"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="ml-2 text-sm text-muted-foreground">
//                 HIPAA Compliant
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Wave SVG at the bottom */}
//       <div className="absolute bottom-0 left-0 right-0">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1440 100"
//           className="w-full"
//         >
//           <path
//             fill="currentColor"
//             fillOpacity="0.05"
//             d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,74.7C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//           ></path>
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default Hero;
