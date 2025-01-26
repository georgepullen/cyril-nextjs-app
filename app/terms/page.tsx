"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#0D0D15] text-white font-mono">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <FileText className="w-16 h-16 text-[#BE95FF]" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] bg-clip-text text-transparent">
            Terms of Service
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
            <p>Welcome to Cyril. These Terms of Service govern your use of Cyril&apos;s services, which are created and maintained by me, George Pullen, as a personal project. By using these services, you agree to these terms.</p>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">2. Service Description</h2>
            <p>Cyril is a personal project that provides:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>AI-powered cognitive enhancement tools</li>
              <li>Knowledge management and retention tools</li>
              <li>Data analysis and insights</li>
              <li>Cognitive workflow enhancement</li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">3. User Responsibilities</h2>
            <p>As a user, you agree to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide accurate information</li>
              <li>Keep your account secure</li>
              <li>Use the services legally and responsibly</li>
              <li>Not attempt to reverse engineer the services</li>
              <li>Not interfere with service operations</li>
            </ul>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">4. Intellectual Property</h2>
            <div className="space-y-4">
              <p>Cyril and its associated services remain my intellectual property. By using the services, you agree not to copy, modify, or create derivative works without explicit permission.</p>
              <p>You retain ownership of your content, but grant me a license to use and process it to provide the services.</p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">5. Disclaimer</h2>
            <div className="space-y-4">
              <p>Cyril is provided &quot;as is&quot; without warranties of any kind. As an individual developer, I cannot guarantee uninterrupted or error-free service.</p>
              <p>I am not liable for any damages resulting from your use of the services.</p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">6. Changes</h2>
            <p>I may modify these terms as the project evolves. I&apos;ll notify users of significant changes through the service. Continued use after changes indicates acceptance of the updated terms.</p>
          </section>

          <section className="bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5 p-6 rounded-lg border border-[#BE95FF]/10">
            <h2 className="text-xl font-semibold mb-4 text-white">7. Contact</h2>
            <p>For any questions about these terms, please contact me at:</p>
            <p className="mt-4">Email: george@cyril.guru</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;