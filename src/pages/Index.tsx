import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>
          PreScriptEase - Decode Medical Prescriptions with Precision
        </title>
        <meta
          name="description"
          content="Upload your medical prescription and get instant, accurate translations with detailed medicine information, all in seconds."
        />
        <meta
          name="keywords"
          content="prescription decoder, medicine information, healthcare, medical prescription, prescription translation"
        />
        <meta
          property="og:title"
          content="PreScriptEase - Decode Medical Prescriptions with Precision"
        />
        <meta
          property="og:description"
          content="Upload your medical prescription and get instant, accurate translations with detailed medicine information, all in seconds."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prescriptease.com" />
        <meta
          property="og:image"
          content="https://prescriptease.com/og-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PreScriptEase - Decode Medical Prescriptions with Precision"
        />
        <meta
          name="twitter:description"
          content="Upload your medical prescription and get instant, accurate translations with detailed medicine information, all in seconds."
        />
        <meta
          name="twitter:image"
          content="https://prescriptease.com/og-image.png"
        />
        <link rel="canonical" href="https://prescriptease.com" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
