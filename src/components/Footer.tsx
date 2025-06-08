"use client";

import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { siteData } from "@/lib/siteData";

export default function Footer() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12" data-testid="footer">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* About Section */}
            <div>
              <h3 className="text-lg font-semibold font-playfair text-gray-900 dark:text-white mb-4">
                {siteData.name.toUpperCase()}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-source-sans-pro leading-relaxed">
                {siteData.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold font-playfair text-gray-900 dark:text-white mb-4">
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-source-sans-pro transition-colors"
                    data-testid="footer-home-link"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/how-to" 
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-source-sans-pro transition-colors"
                    data-testid="footer-howto-link"
                  >
                    How to Use
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-lg font-semibold font-playfair text-gray-900 dark:text-white mb-4">
                IMPORTANT INFORMATION
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setIsDisclaimerOpen(true)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary font-source-sans-pro transition-colors text-left"
                    data-testid="disclaimer-button"
                  >
                    Disclaimer & Safety Notice
                  </button>
                </li>
                <li>
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 font-source-sans-pro">
                    <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                    Always verify ingredients manually
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 font-source-sans-pro">
              {siteData.legal.copyright}
            </p>
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
                      This AI tool is designed to assist with ingredient analysis but should NEVER be your only method of checking food safety. 
                      Always read ingredient labels carefully yourself and verify all results.
                    </p>
                  </div>

                  {/* Medical Disclaimer */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-playfair mb-2">
                      Medical Disclaimer
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                      Allergy Agents is not a medical device and does not provide medical advice. This tool is for informational purposes only and should not replace:
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
                      If you experience an allergic reaction, seek immediate medical attention. Call emergency services or go to the nearest emergency room. 
                      Do not waste time using this app during an emergency.
                    </p>
                  </div>

                  {/* User Responsibility */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white font-playfair mb-2">
                      Your Responsibility
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      By using Allergy Agents, you acknowledge that you understand these limitations and agree to:
                    </p>
                    <ul className="text-gray-600 dark:text-gray-400 text-sm list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Always verify results by reading labels yourself</li>
                      <li>Consult healthcare providers for medical advice</li>
                      <li>Use this tool as a supplement, not replacement, for careful ingredient checking</li>
                      <li>Take full responsibility for your food safety decisions</li>
                    </ul>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 font-playfair mb-2">
                      Questions or Concerns?
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                      If you have questions about food allergies or this tool's results, consult with your healthcare provider, 
                      allergist, or a registered dietitian who specializes in food allergies.
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