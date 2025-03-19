
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ResultsView from '@/components/results/ResultsView';
import { usePrescription } from '@/context/PrescriptionContext';

const Results: React.FC = () => {
  const { prescriptionData } = usePrescription();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to upload page if no prescription data is available
    if (!prescriptionData) {
      navigate('/upload');
    }
  }, [prescriptionData, navigate]);

  if (!prescriptionData) {
    return null; // Will redirect via the useEffect
  }

  return (
    <>
      <Helmet>
        <title>Prescription Results - PreScriptEase</title>
        <meta name="description" content="View your decoded prescription with detailed medicine information and analysis." />
        <meta name="robots" content="noindex, follow" /> {/* Don't index results page */}
        <link rel="canonical" href="https://prescriptease.com/results" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-4">
          <div className="container mx-auto">
            <ResultsView />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Results;
