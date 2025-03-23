import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturesList from "@/components/features/FeaturesList";
import { useIsMobile } from "@/hooks/use-mobile";

const Features = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Health Calculators & Features - PreScriptEase</title>
        <meta
          name="description"
          content="Explore PreScriptEase's collection of health calculators including BMI, body fat percentage, calorie burn, heart rate zones, and more to help manage your health."
        />
        <meta
          name="keywords"
          content="health calculators, BMI calculator, body fat calculator, calorie calculator, ideal weight calculator, heart rate calculator, fitness tools, healthcare technology"
        />
        <meta
          property="og:title"
          content="Health Calculators & Features - PreScriptEase"
        />
        <meta
          property="og:description"
          content="Access a collection of health and fitness calculators to track and improve your wellbeing."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prescriptease.com/features" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16 md:pt-20">
          <section className="py-8 md:py-12 lg:py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-4 md:mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                  Health Calculators
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-3 md:mb-4">
                  Health & Fitness Tools
                </h1>
                <p className="text-base md:text-xl text-muted-foreground">
                  Explore our collection of calculators designed to help you
                  track and improve your health.
                </p>
              </div>

              <FeaturesList isMobile={isMobile} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Features;
