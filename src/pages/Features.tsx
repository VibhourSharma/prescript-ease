import { Helmet } from "react-helmet";
import Footer from "@/components/layout/Footer";
import FeaturesList from "@/components/features/FeaturesList";
import Header from "@/components/layout/Header";

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features - PreScriptEase</title>
        <meta
          name="description"
          content="Explore the powerful features of PreScriptEase, including our BMI calculator and prescription decoding tools."
        />
        <meta
          name="keywords"
          content="prescription decoder features, BMI calculator, medical tools, healthcare technology"
        />
        <meta property="og:title" content="Features - PreScriptEase" />
        <meta
          property="og:description"
          content="Explore the powerful features of PreScriptEase, including our BMI calculator and prescription decoding tools."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prescriptease.com/features" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <section className="py-12 md:py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                  Tools & Features
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  PreScriptEase Features
                </h1>
                <p className="text-xl text-muted-foreground">
                  Explore our collection of tools designed to make healthcare
                  information more accessible.
                </p>
              </div>

              <FeaturesList />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Features;
