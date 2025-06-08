'use client';

import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { siteData } from '@/lib/siteData';

export default function Footer() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <>
      <footer
        className="border-t mt-12"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        data-testid="footer"
      >
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          {/* Mobile: Single column with horizontal links */}
          <div className="block md:hidden">
            <div className="text-center space-y-4">
              {/* Navigation Links */}
              <div className="flex justify-center items-center gap-6 text-sm">
                <Link
                  href="/"
                  data-testid="footer-home-link"
                  style={{ color: 'var(--muted)' }}
                  className="hover:text-accent transition-colors"
                >
                  Home
                </Link>
                <span style={{ color: 'var(--border)' }}>•</span>
                <Link
                  href="/how-to"
                  data-testid="footer-howto-link"
                  style={{ color: 'var(--muted)' }}
                  className="hover:text-accent transition-colors"
                >
                  How to Use
                </Link>
                <span style={{ color: 'var(--border)' }}>•</span>
                <button
                  onClick={() => setIsDisclaimerOpen(true)}
                  data-testid="disclaimer-button"
                  style={{ color: 'var(--muted)' }}
                  className="hover:text-accent transition-colors text-sm"
                >
                  Disclaimer
                </button>
              </div>
              
              {/* Safety Notice */}
              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#f59e0b' }}>
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                <span>Always verify ingredients manually</span>
              </div>
              
              {/* Copyright */}
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                {siteData.legal.copyright}
              </p>
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden md:block">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              {/* Left side: Brand and links */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-6 text-sm">
                  <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                    {siteData.name}
                  </span>
                  <Link
                    href="/"
                    data-testid="footer-home-link"
                    style={{ color: 'var(--muted)' }}
                    className="hover:text-accent transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/how-to"
                    data-testid="footer-howto-link"
                    style={{ color: 'var(--muted)' }}
                    className="hover:text-accent transition-colors"
                  >
                    How to Use
                  </Link>
                  <button
                    onClick={() => setIsDisclaimerOpen(true)}
                    data-testid="disclaimer-button"
                    style={{ color: 'var(--muted)' }}
                    className="hover:text-accent transition-colors"
                  >
                    Disclaimer
                  </button>
                </div>
              </div>

              {/* Right side: Safety notice and copyright */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2" style={{ color: '#f59e0b' }}>
                  <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                  <span className="text-xs">Always verify ingredients</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {siteData.legal.copyright}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      <Dialog
        open={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
        maxWidth="md"
        fullWidth
        data-testid="disclaimer-modal"
      >
        <DialogTitle className="flex gap-1 items-center">
          <AlertTriangle className="h-6 w-6 text-amber-600" aria-hidden="true" />
          <span className="font-playfair text-xl">IMPORTANT DISCLAIMER & SAFETY NOTICE</span>
        </DialogTitle>
        <DialogContent>
          <div className="space-y-6 font-source-sans-pro">
            {/* Primary Warning */}
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 dark:text-red-200 font-playfair mb-2">
                ⚠️ ALWAYS DOUBLE-CHECK INGREDIENTS
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                This AI tool is designed to assist with ingredient analysis but should NEVER be your
                only method of checking food safety. Always read ingredient labels carefully
                yourself and verify all results.
              </p>
            </div>

            {/* Medical Disclaimer */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white font-playfair mb-2">
                Medical Disclaimer
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                Allergy Agents is not a medical device and does not provide medical advice. This
                tool is for informational purposes only and should not replace:
              </p>
              <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc list-inside space-y-1 ml-4">
                <li>Professional medical advice from healthcare providers</li>
                <li>Consultation with allergists or dietitians</li>
                <li>Your own careful reading of ingredient labels</li>
                <li>Following your prescribed allergy management plan</li>
              </ul>
            </div>

            {/* Accuracy Limitations */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white font-playfair mb-2">
                Accuracy Limitations
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                While we strive for accuracy, AI analysis may have limitations including:
              </p>
              <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc list-inside space-y-1 ml-4">
                <li>Misreading text in poor quality images</li>
                <li>Missing alternative names for allergens</li>
                <li>Inability to detect manufacturing cross-contamination</li>
                <li>Potential false positives or false negatives</li>
                <li>Limited knowledge of regional ingredient naming</li>
              </ul>
            </div>

            {/* Emergency Situations */}
            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 font-playfair mb-2">
                🚨 Emergency Situations
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                If you experience an allergic reaction, seek immediate medical attention. Call
                emergency services or go to the nearest emergency room. Do not waste time using this
                app during an emergency.
              </p>
            </div>

            {/* User Responsibility */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white font-playfair mb-2">
                Your Responsibility
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                By using Allergy Agents, you acknowledge that you understand these limitations and
                agree to:
              </p>
              <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Always verify results by reading labels yourself</li>
                <li>Consult healthcare providers for medical advice</li>
                <li>
                  Use this tool as a supplement, not replacement, for careful ingredient checking
                </li>
                <li>Take full responsibility for your food safety decisions</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 font-playfair mb-2">
                Questions or Concerns?
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                If you have questions about food allergies or this tool's results, consult with your
                healthcare provider, allergist, or a registered dietitian who specializes in food
                allergies.
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsDisclaimerOpen(false)}
            className="font-source-sans-pro"
            data-testid="disclaimer-close-button"
          >
            I Understand
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
