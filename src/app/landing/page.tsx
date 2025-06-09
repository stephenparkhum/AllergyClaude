'use client';

import { Button, Card, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Shield, Eye, Zap, Users, CheckCircle, ArrowRight, Camera, Brain, Heart } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { siteData } from '@/lib/siteData';

export default function LandingPage() {
  const theme = useTheme();
  const _isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced computer vision and natural language processing to identify allergens in ingredients lists with precision.',
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'Instant Photo Scanning',
      description: 'Simply snap a photo of any food label and get comprehensive allergen analysis in seconds.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Comprehensive Safety Check',
      description: 'Cross-references ingredients with your allergy profile to identify potential risks and hidden allergens.',
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Clear Visual Results',
      description: 'Easy-to-understand safety indicators with detailed breakdowns of safe, warning, and unsafe ingredients.',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Get results in under 10 seconds, making grocery shopping safer and more efficient.',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Peace of Mind',
      description: 'Reduce anxiety around food choices with reliable, consistent allergen detection you can trust.',
    },
  ];

  const benefits = [
    'Prevent accidental exposure to allergens',
    'Save time reading complex ingredient lists',
    'Discover hidden allergens in processed foods',
    'Build confidence in food purchasing decisions',
    'Get detailed analysis beyond basic allergen warnings',
    'Access offline-capable allergen database',
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <Typography
              variant="h1"
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-none"
              style={{ color: 'var(--foreground)' }}
              data-testid="hero-title"
            >
              Your Food Safety,{' '}
              <span style={{ color: 'var(--secondary)' }}>Simplified</span>
            </Typography>
            
            <Typography
              variant="h2"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed"
              style={{ color: 'var(--muted)' }}
              data-testid="hero-subtitle"
            >
              {siteData.tagline} that analyzes ingredient photos to detect allergens instantly
            </Typography>
            
            <Typography
              variant="body1"
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--muted)' }}
              data-testid="hero-description"
            >
              Skip the stress of reading tiny ingredient labels. Our AI-powered tool helps you make safer food choices in seconds.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-testid="hero-cta-buttons">
              <Link href="/">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight className="h-5 w-5" />}
                  data-testid="hero-primary-cta"
                  sx={{
                    backgroundColor: 'var(--secondary)',
                    color: 'white',
                    borderRadius: 'calc(var(--radius) - 2px)',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    px: 6,
                    py: 2,
                    boxShadow: '0 4px 20px rgba(88, 86, 214, 0.3)',
                    '&:hover': {
                      backgroundColor: 'var(--secondary)',
                      opacity: 0.9,
                      boxShadow: '0 6px 25px rgba(88, 86, 214, 0.4)',
                    },
                  }}
                >
                  Start Analyzing Food
                </Button>
              </Link>
              
              <Link href="/how-to">
                <Button
                  variant="outlined"
                  size="large"
                  data-testid="hero-secondary-cta"
                  sx={{
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                    borderRadius: 'calc(var(--radius) - 2px)',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    px: 6,
                    py: 2,
                    '&:hover': {
                      borderColor: 'var(--secondary)',
                      backgroundColor: 'var(--accent-soft)',
                      color: 'var(--secondary)',
                    },
                  }}
                >
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full" style={{ backgroundColor: 'var(--accent-soft)' }} />
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full" style={{ backgroundColor: 'rgba(88, 86, 214, 0.1)' }} />
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24" style={{ backgroundColor: 'var(--surface)' }} data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Typography
              variant="h2"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
              style={{ color: 'var(--foreground)' }}
              data-testid="features-title"
            >
              Why Choose <span style={{ color: 'var(--secondary)' }}>Allergy Agents</span>?
            </Typography>
            <Typography
              variant="body1"
              className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--muted)' }}
              data-testid="features-subtitle"
            >
              Advanced AI technology meets practical food safety, designed for people with allergies who need reliable, fast results.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" data-testid="features-grid">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300 text-center"
                data-testid={`feature-card-${index}`}
                sx={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  '&:hover': {
                    borderColor: 'var(--secondary)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 sm:mb-6 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-soft)' }}>
                  <div style={{ color: 'var(--secondary)' }}>
                    {feature.icon}
                  </div>
                </div>
                <Typography
                  variant="h3"
                  className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 md:py-24" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Typography
                variant="h2"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8"
                style={{ color: 'var(--foreground)' }}
                data-testid="benefits-title"
              >
                Making Food Safety{' '}
                <span style={{ color: 'var(--secondary)' }}>Accessible</span>
              </Typography>
              <Typography
                variant="body1"
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed"
                style={{ color: 'var(--muted)' }}
                data-testid="benefits-description"
              >
                Living with food allergies shouldn't mean spending hours reading ingredient labels or avoiding entire food categories. Our AI-powered analysis gives you the confidence to explore more options safely.
              </Typography>
              <div className="space-y-3 sm:space-y-4" data-testid="benefits-list">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 text-left" data-testid={`benefit-item-${index}`}>
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mt-0.5 flex-shrink-0" style={{ color: 'var(--secondary)' }} />
                    <Typography
                      variant="body1"
                      className="text-sm sm:text-base md:text-lg"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {benefit}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <Card
                className="p-6 sm:p-8 w-full max-w-md"
                data-testid="testimonial-card"
                sx={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-soft)' }}>
                    <Users className="h-8 w-8 sm:h-10 sm:w-10" style={{ color: 'var(--secondary)' }} />
                  </div>
                  <Typography
                    variant="h3"
                    className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Join Thousands of Users
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-sm sm:text-base md:text-lg leading-relaxed"
                    style={{ color: 'var(--muted)' }}
                  >
                    People with food allergies trust Allergy Agents to help them make safer food choices every day.
                  </Typography>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 md:py-24" style={{ backgroundColor: 'var(--surface)' }} data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Typography
            variant="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8"
            style={{ color: 'var(--foreground)' }}
            data-testid="cta-title"
          >
            Ready to Take Control of Your{' '}
            <span style={{ color: 'var(--secondary)' }}>Food Safety</span>?
          </Typography>
          <Typography
            variant="body1"
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--muted)' }}
            data-testid="cta-description"
          >
            Start analyzing food labels today and experience the peace of mind that comes with knowing exactly what's in your food.
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center" data-testid="cta-buttons">
            <Link href="/">
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight className="h-5 w-5" />}
                data-testid="cta-primary-button"
                sx={{
                  backgroundColor: 'var(--secondary)',
                  color: 'white',
                  borderRadius: 'calc(var(--radius) - 2px)',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  px: 6,
                  py: 2.5,
                  boxShadow: '0 4px 20px rgba(88, 86, 214, 0.3)',
                  '&:hover': {
                    backgroundColor: 'var(--secondary)',
                    opacity: 0.9,
                    boxShadow: '0 6px 25px rgba(88, 86, 214, 0.4)',
                  },
                }}
              >
                Get Started Free
              </Button>
            </Link>
            
            <Link href="/how-to">
              <Button
                variant="text"
                size="large"
                endIcon={<ArrowRight className="h-5 w-5" />}
                data-testid="cta-secondary-button"
                sx={{
                  color: 'var(--secondary)',
                  borderRadius: 'calc(var(--radius) - 2px)',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  px: 6,
                  py: 2.5,
                  '&:hover': {
                    backgroundColor: 'var(--accent-soft)',
                  },
                }}
              >
                Watch Demo
              </Button>
            </Link>
          </div>

          <Typography
            variant="body2"
            className="text-xs sm:text-sm mt-6 sm:mt-8"
            style={{ color: 'var(--muted)' }}
            data-testid="copyright-text"
          >
            {siteData.legal.copyright}
          </Typography>
        </div>
      </section>

      <Footer />
    </div>
  );
}