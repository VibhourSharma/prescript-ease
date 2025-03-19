
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us - PreScriptEase</title>
        <meta name="description" content="Learn more about PreScriptEase, our mission to simplify prescription reading, and our team." />
        <link rel="canonical" href="https://prescriptease.com/about" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">About PreScriptEase</h1>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg mb-4">
                At PreScriptEase, our mission is to bridge the gap between complex medical prescriptions and patient understanding. 
                We believe that clear communication is essential for effective healthcare, and our platform exists to make 
                prescription information accessible to everyone.
              </p>
              <p className="text-lg">
                By leveraging advanced technology, we aim to reduce medication errors, improve patient compliance, 
                and empower individuals to take control of their health journey.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">How We Started</h2>
              <p className="text-lg mb-4">
                PreScriptEase was born from a personal experience. Our founder, after struggling to decipher a prescription 
                for their elderly parent, recognized a widespread problem that needed solving. What began as a simple tool 
                to translate doctor's handwriting has evolved into a comprehensive platform that provides detailed information 
                about medications and their usage.
              </p>
              <p className="text-lg">
                Since our founding in 2022, we've helped thousands of patients better understand their medications, leading to 
                improved health outcomes and peace of mind.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
              <p className="text-lg mb-4">
                PreScriptEase combines optical character recognition (OCR), machine learning, and a comprehensive 
                medication database to accurately decode prescriptions. Our system continues to learn and improve with each 
                prescription processed, making it increasingly accurate over time.
              </p>
              <p className="text-lg">
                We prioritize privacy and security in everything we do. Your prescription data is encrypted, never stored 
                longer than necessary for processing, and never shared with third parties.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-lg mb-4">
                We're always looking to improve our service and welcome your feedback. For questions, suggestions, or partnership 
                inquiries, please reach out to us at:
              </p>
              <div className="bg-secondary/50 p-6 rounded-lg text-center">
                <p className="text-lg font-medium">support@prescriptease.com</p>
                <p className="text-lg font-medium">1-800-SCRIPT-EASE</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
