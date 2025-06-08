'use client';

import { Button } from '@mui/material';
import { CheckCircle, XCircle, AlertTriangle, Camera, FileImage, Eye, Shield } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { siteData } from '@/lib/siteData';

export default function HowToPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="text-4xl md:text-5xl font-semibold mb-6"
            style={{ color: 'var(--foreground)' }}
            data-testid="how-to-title"
          >
            How to Use {siteData.name}
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--muted)' }}
            data-testid="how-to-subtitle"
          >
            Learn how to quickly and safely analyze food ingredients for allergens using our
            AI-powered tool.
          </p>
        </div>

        {/* Important Notice */}
        <div
          className="minimal-card p-6 mb-12"
          data-testid="safety-notice"
          style={{
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            borderColor: 'rgba(255, 193, 7, 0.3)',
          }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 mt-0.5" style={{ color: '#ff9800' }} />
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Important Safety Notice
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                This tool is designed to assist with ingredient analysis but should NEVER be your
                only method of checking food safety. Always read ingredient labels carefully
                yourself and consult healthcare providers for medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="minimal-card p-8 mb-12" data-testid="step-guide-card">
          <h2 className="text-2xl font-semibold mb-8" style={{ color: 'var(--foreground)' }}>
            Step-by-Step Guide
          </h2>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6" data-testid="step-1">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
              >
                <span className="text-xl font-semibold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  List Your Allergies
                </h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Enter all your known allergies in the text area. Be specific and include all forms
                  (e.g., "milk, dairy, lactose").
                </p>
                <div
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    <strong>Example:</strong> "peanuts, tree nuts, shellfish, dairy, eggs, soy"
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6" data-testid="step-2">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
              >
                <span className="text-xl font-semibold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Take a Clear Photo
                </h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Photograph the ingredient list on the food package. Ensure the text is clear and
                  readable.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: 'rgba(76, 175, 80, 0.1)',
                      border: '1px solid rgba(76, 175, 80, 0.3)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5" style={{ color: '#4caf50' }} />
                      <span className="font-semibold" style={{ color: '#2e7d32' }}>
                        Good Photos
                      </span>
                    </div>
                    <ul className="text-sm space-y-1" style={{ color: '#388e3c' }}>
                      <li>• Clear, focused ingredient list</li>
                      <li>• Good lighting</li>
                      <li>• Text is readable</li>
                      <li>• Full ingredients panel visible</li>
                    </ul>
                  </div>
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      border: '1px solid rgba(244, 67, 54, 0.3)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5" style={{ color: '#f44336' }} />
                      <span className="font-semibold" style={{ color: '#c62828' }}>
                        Avoid
                      </span>
                    </div>
                    <ul className="text-sm space-y-1" style={{ color: '#d32f2f' }}>
                      <li>• Blurry or out-of-focus images</li>
                      <li>• Poor lighting/shadows</li>
                      <li>• Partial ingredient lists</li>
                      <li>• Reflective surfaces/glare</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6" data-testid="step-3">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}
              >
                <span className="text-xl font-semibold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Upload and Analyze
                </h3>
                <p className="mb-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Upload your photo and click "Analyze" to get instant allergy detection results.
                </p>
                <div
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    The AI will scan the ingredients and cross-reference them with your allergies,
                    including hidden allergens and "may contain" warnings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Good Use Cases */}
        <div className="minimal-card p-8 mb-12" data-testid="good-use-cases-card">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="h-6 w-6" style={{ color: '#4caf50' }} />
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
              Recommended Use Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Packaged Foods',
                desc: 'Snacks, cereals, canned goods, frozen meals with clear ingredient labels',
              },
              {
                title: 'Ingredient Verification',
                desc: 'Double-checking ingredient lists for hidden allergens or alternative names',
              },
              {
                title: 'New Products',
                desc: "Trying new foods or brands when you're unsure about their safety",
              },
              {
                title: 'Travel & Shopping',
                desc: 'Quick checks while grocery shopping or when traveling abroad',
              },
              {
                title: 'Education',
                desc: 'Learning about hidden allergens and alternative ingredient names',
              },
              {
                title: 'Family Safety',
                desc: 'Helping family members or caregivers check food safety',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-4"
                style={{
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.2)',
                }}
              >
                <h3 className="font-semibold mb-2" style={{ color: '#2e7d32' }}>
                  ✓ {item.title}
                </h3>
                <p className="text-sm" style={{ color: '#388e3c' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Limitations */}
        <div className="minimal-card p-8 mb-12" data-testid="avoid-use-cases-card">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="h-6 w-6" style={{ color: '#f44336' }} />
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
              Important Limitations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Emergency Situations',
                desc: 'Never rely solely on this app during allergic reactions. Seek immediate medical help.',
              },
              {
                title: 'Restaurant Meals',
                desc: 'Cannot analyze prepared foods, restaurant dishes, or foods without ingredient labels',
              },
              {
                title: 'Severe Allergies',
                desc: 'Always verify ingredients manually if you have life-threatening allergies',
              },
              {
                title: 'Cross-Contamination',
                desc: "Cannot detect facility cross-contamination beyond what's listed on labels",
              },
              {
                title: 'Unclear Images',
                desc: 'Results may be inaccurate with blurry, partial, or poor-quality images',
              },
              {
                title: 'Sole Decision Making',
                desc: 'Always double-check results and consult healthcare providers for medical advice',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-4"
                style={{
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.2)',
                }}
              >
                <h3 className="font-semibold mb-2" style={{ color: '#c62828' }}>
                  ⚠️ {item.title}
                </h3>
                <p className="text-sm" style={{ color: '#d32f2f' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Best Results */}
        <div className="minimal-card p-8 mb-12" data-testid="tips-card">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-6 w-6" style={{ color: 'var(--accent)' }} />
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
              Tips for Best Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Camera className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Photo Quality
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Use good lighting and ensure ingredients text is clear and in focus
              </p>
            </div>

            <div className="text-center">
              <FileImage className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Complete Labels
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Capture the entire ingredient list including "may contain" warnings
              </p>
            </div>

            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--accent)' }} />
              <h3 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Verify Results
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Always double-check the analysis with your own reading of the label
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="minimal-card p-8 text-center" data-testid="cta-card">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            Ready to Get Started?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted)' }}>
            Now that you know how to use {siteData.name} safely and effectively, head back to the
            main page to start analyzing your food for allergens.
          </p>
          <Link href="/">
            <Button
              variant="contained"
              size="large"
              data-testid="start-analyzing-button"
              sx={{
                backgroundColor: 'var(--accent)',
                color: 'white',
                borderRadius: 'calc(var(--radius) - 2px)',
                fontWeight: 500,
                textTransform: 'none',
                boxShadow: 'none',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'var(--accent)',
                  opacity: 0.9,
                  boxShadow: 'none',
                },
              }}
            >
              Start Analyzing Food
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
