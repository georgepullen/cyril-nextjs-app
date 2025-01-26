"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0D0D15] text-white font-mono">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-[#BE95FF]" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: January 20, 2025</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8 text-gray-300"
        >
          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">1. Introduction</h2>
            <p>I, George Pullen, built Cyril as a personal project. This Privacy Policy explains how I handle your information when you use Cyril&apos;s services.</p>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">2. Information Collection</h2>
            <div className="space-y-4">
              <p>I collect information that you provide directly when using Cyril:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Usage data and interaction patterns</li>
                <li>Content and data you input into the services</li>
                <li>Technical information about your device and connection</li>
              </ul>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">3. Use of Information</h2>
            <div className="space-y-4">
              <p>Your information is used to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve Cyril&apos;s services</li>
                <li>Personalize your experience</li>
                <li>Train and enhance the AI models</li>
                <li>Analyze usage patterns and optimize performance</li>
              </ul>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">4. Data Protection</h2>
            <p>I take the following measures to protect your data:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Secure access controls</li>
              <li>Limited data retention periods</li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data</li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">6. Contact</h2>
            <p>If you have any questions about this Privacy Policy, please contact me at:</p>
            <p className="mt-4">Email: george@cyril.guru</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;