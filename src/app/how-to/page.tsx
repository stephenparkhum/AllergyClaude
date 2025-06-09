'use client';

import { Button, Typography } from '@mui/material';
import { CheckCircle, XCircle, AlertTriangle, Camera, FileImage, Eye, Shield } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { howToData } from '@/lib/howToData';

export default function HowToPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Typography
            variant="h1"
            className="text-2xl md:text-3xl font-semibold mb-4"
            style={{ color: 'var(--foreground)' }}
            data-testid="how-to-title"
          >
            {howToData.pageTitle.split(' ').slice(0, 3).join(' ')}{' '}
            <span style={{ color: 'var(--secondary)' }}>
              {howToData.pageTitle.split(' ').slice(3).join(' ')}
            </span>
          </Typography>
          <Typography
            variant="body1"
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--muted)' }}
            data-testid="how-to-subtitle"
          >
            {howToData.pageSubtitle}
          </Typography>
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
              <Typography
                variant="h3"
                className="font-semibold mb-2"
                style={{ color: 'var(--foreground)' }}
              >
                {howToData.safetyNotice.title}
              </Typography>
              <Typography
                variant="body2"
                className="text-sm leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {howToData.safetyNotice.description}
              </Typography>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="minimal-card p-8 mb-12" data-testid="step-guide-card">
          <Typography
            variant="h2"
            className="text-2xl font-semibold mb-8"
            style={{ color: 'var(--foreground)' }}
          >
            Step-by-Step Guide
          </Typography>

          <div className="space-y-12">
            {howToData.steps.map((step, _index) => (
              <div key={step.id} className="flex gap-4 md:gap-6" data-testid={`step-${step.id}`}>
                <div
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: step.id === 2 ? 'var(--secondary)' : 'var(--accent)',
                    color: 'white',
                  }}
                >
                  <span className="text-lg md:text-xl font-semibold">{step.id}</span>
                </div>
                <div className="flex-1">
                  <Typography
                    variant="h3"
                    className="text-xl font-semibold mb-3"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="mb-4 leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {step.description}
                  </Typography>
                  {step.example && (
                    <div
                      className="rounded-lg p-4"
                      style={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-sm"
                        style={{ color: 'var(--muted)' }}
                      >
                        <strong>Example:</strong> "{step.example}"
                      </Typography>
                    </div>
                  )}
                  {step.id === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {howToData.photoTips.map((tipCategory, tipIndex) => (
                        <div
                          key={tipIndex}
                          className="rounded-lg p-4"
                          style={{
                            backgroundColor:
                              tipCategory.type === 'good'
                                ? 'rgba(76, 175, 80, 0.1)'
                                : 'rgba(244, 67, 54, 0.1)',
                            border:
                              tipCategory.type === 'good'
                                ? '1px solid rgba(76, 175, 80, 0.3)'
                                : '1px solid rgba(244, 67, 54, 0.3)',
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            {tipCategory.type === 'good' ? (
                              <CheckCircle className="h-5 w-5" style={{ color: '#4caf50' }} />
                            ) : (
                              <XCircle className="h-5 w-5" style={{ color: '#f44336' }} />
                            )}
                            <span
                              className="font-semibold"
                              style={{
                                color: tipCategory.type === 'good' ? '#2e7d32' : '#c62828',
                              }}
                            >
                              {tipCategory.title}
                            </span>
                          </div>
                          <ul
                            className="text-sm space-y-1"
                            style={{
                              color: tipCategory.type === 'good' ? '#388e3c' : '#d32f2f',
                            }}
                          >
                            {tipCategory.items.map((item, itemIndex) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {step.details && (
                    <div
                      className="rounded-lg p-4"
                      style={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Typography
                        variant="body2"
                        className="text-sm"
                        style={{ color: 'var(--muted)' }}
                      >
                        {step.details}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Good Use Cases */}
        <div className="minimal-card p-8 mb-12" data-testid="good-use-cases-card">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle className="h-6 w-6" style={{ color: '#4caf50' }} />
            <Typography
              variant="h2"
              className="text-2xl font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              Recommended Use Cases
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howToData.goodUseCases.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-4"
                style={{
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.2)',
                }}
              >
                <Typography
                  variant="h3"
                  className="font-semibold mb-2"
                  style={{ color: '#2e7d32' }}
                >
                  ✓ {item.title}
                </Typography>
                <Typography variant="body2" className="text-sm" style={{ color: '#388e3c' }}>
                  {item.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Important Limitations */}
        <div className="minimal-card p-8 mb-12" data-testid="avoid-use-cases-card">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="h-6 w-6" style={{ color: '#f44336' }} />
            <Typography
              variant="h2"
              className="text-2xl font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              Important Limitations
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howToData.limitations.map((item, index) => (
              <div
                key={index}
                className="rounded-lg p-4"
                style={{
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.2)',
                }}
              >
                <Typography
                  variant="h3"
                  className="font-semibold mb-2"
                  style={{ color: '#c62828' }}
                >
                  ⚠️ {item.title}
                </Typography>
                <Typography variant="body2" className="text-sm" style={{ color: '#d32f2f' }}>
                  {item.description}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Best Results */}
        <div className="minimal-card p-8 mb-12" data-testid="tips-card">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-6 w-6" style={{ color: 'var(--accent)' }} />
            <Typography
              variant="h2"
              className="text-2xl font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              Tips for Best Results
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howToData.tips.map((tip, index) => {
              const IconComponent =
                tip.icon === 'Camera' ? Camera : tip.icon === 'FileImage' ? FileImage : Eye;
              return (
                <div key={index} className="text-center">
                  <IconComponent
                    className="h-12 w-12 mx-auto mb-4"
                    style={{ color: 'var(--accent)' }}
                  />
                  <Typography
                    variant="h3"
                    className="font-semibold mb-3"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {tip.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    {tip.description}
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="minimal-card p-8 text-center" data-testid="cta-card">
          <Typography
            variant="h2"
            className="text-2xl font-semibold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            {howToData.callToAction.title}
          </Typography>
          <Typography
            variant="body1"
            className="mb-6 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {howToData.callToAction.description}
          </Typography>
          <Link href="/">
            <Button
              variant="contained"
              size="large"
              data-testid="start-analyzing-button"
              sx={{
                backgroundColor: 'var(--secondary)',
                color: 'white',
                borderRadius: 'calc(var(--radius) - 2px)',
                fontWeight: 500,
                textTransform: 'none',
                boxShadow: 'none',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'var(--secondary)',
                  opacity: 0.9,
                  boxShadow: 'none',
                },
              }}
            >
              {howToData.callToAction.buttonText}
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
