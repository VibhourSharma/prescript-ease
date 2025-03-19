
import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UploadArea from '@/components/upload/UploadArea';
import { Button } from '@/components/ui/button';

const Upload: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Upload Prescription - PreScriptEase</title>
        <meta name="description" content="Upload your medical prescription for instant decoding and detailed analysis." />
        <meta name="robots" content="noindex, follow" /> {/* Don't index upload page */}
        <link rel="canonical" href="https://prescriptease.com/upload" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-32 pb-20">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <Button variant="ghost" asChild className="mb-4">
                  <Link to="/" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <h1 className="text-3xl font-bold mb-2">Upload Your Prescription</h1>
                <p className="text-muted-foreground">
                  We support JPG, PNG, and PDF formats. Your data is secure and encrypted.
                </p>
              </div>
              
              <UploadArea />
              
              <div className="mt-12 p-4 border border-border rounded-lg bg-secondary/30">
                <h2 className="text-lg font-medium mb-2">Privacy & Security</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Your prescription data is protected with the highest level of security:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    HIPAA compliant
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Files deleted after processing
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    No data sharing with third parties
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Upload;
