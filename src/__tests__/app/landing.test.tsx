import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LandingPage from '@/app/landing/page';

// Mock Next.js components
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('@/components/Navigation', () => {
  const MockNavigation = () => <nav data-testid="navigation">Navigation</nav>;
  MockNavigation.displayName = 'MockNavigation';
  return MockNavigation;
});

jest.mock('@/components/Footer', () => {
  const MockFooter = () => <footer data-testid="footer">Footer</footer>;
  MockFooter.displayName = 'MockFooter';
  return MockFooter;
});

// Mock useMediaQuery
const mockUseMediaQuery = jest.fn();
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => mockUseMediaQuery(),
}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('LandingPage', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(false); // Default to desktop
    jest.clearAllMocks();
  });

  describe('Hero Section', () => {
    it('should render hero section with main heading', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      expect(screen.getByTestId('hero-title')).toBeInTheDocument();
      expect(screen.getByText('Your Food Safety,')).toBeInTheDocument();
      expect(screen.getByText('Simplified')).toBeInTheDocument();
    });

    it('should display site tagline and description', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('hero-subtitle')).toBeInTheDocument();
      expect(screen.getByTestId('hero-description')).toBeInTheDocument();
      expect(screen.getByText(/AI-powered food safety dashboard/)).toBeInTheDocument();
      expect(screen.getByText(/Skip the stress of reading tiny ingredient labels/)).toBeInTheDocument();
    });

    it('should have call-to-action buttons in hero section', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('hero-cta-buttons')).toBeInTheDocument();
      expect(screen.getByTestId('hero-primary-cta')).toBeInTheDocument();
      expect(screen.getByTestId('hero-secondary-cta')).toBeInTheDocument();
      expect(screen.getByText('Start Analyzing Food')).toBeInTheDocument();
      expect(screen.getByText('Learn How It Works')).toBeInTheDocument();
    });

    it('should have correct links for CTA buttons', () => {
      renderWithTheme(<LandingPage />);

      const startButton = screen.getByTestId('hero-primary-cta').closest('a');
      const learnButton = screen.getByTestId('hero-secondary-cta').closest('a');

      expect(startButton).toHaveAttribute('href', '/');
      expect(learnButton).toHaveAttribute('href', '/how-to');
    });
  });

  describe('Features Section', () => {
    it('should render features section heading', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('features-section')).toBeInTheDocument();
      expect(screen.getByTestId('features-title')).toBeInTheDocument();
      expect(screen.getByTestId('features-subtitle')).toBeInTheDocument();
      expect(screen.getByTestId('features-title')).toHaveTextContent(/Why Choose.*Allergy Agents/);
    });

    it('should display all feature cards', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('features-grid')).toBeInTheDocument();
      expect(screen.getByTestId('feature-card-0')).toBeInTheDocument();
      expect(screen.getByTestId('feature-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('feature-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('feature-card-3')).toBeInTheDocument();
      expect(screen.getByTestId('feature-card-4')).toBeInTheDocument();
      expect(screen.getByTestId('feature-card-5')).toBeInTheDocument();
      
      expect(screen.getByText('AI-Powered Analysis')).toBeInTheDocument();
      expect(screen.getByText('Instant Photo Scanning')).toBeInTheDocument();
      expect(screen.getByText('Comprehensive Safety Check')).toBeInTheDocument();
      expect(screen.getByText('Clear Visual Results')).toBeInTheDocument();
      expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
      expect(screen.getByText('Peace of Mind')).toBeInTheDocument();
    });

    it('should display feature descriptions', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByText(/Advanced computer vision and natural language processing/)).toBeInTheDocument();
      expect(screen.getByText(/Simply snap a photo of any food label/)).toBeInTheDocument();
      expect(screen.getByText(/Cross-references ingredients with your allergy profile/)).toBeInTheDocument();
    });
  });

  describe('Benefits Section', () => {
    it('should render benefits section heading', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('benefits-section')).toBeInTheDocument();
      expect(screen.getByTestId('benefits-title')).toBeInTheDocument();
      expect(screen.getByTestId('benefits-description')).toBeInTheDocument();
      expect(screen.getByText('Making Food Safety')).toBeInTheDocument();
      expect(screen.getByText('Accessible')).toBeInTheDocument();
    });

    it('should display all benefit items', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('benefits-list')).toBeInTheDocument();
      expect(screen.getByTestId('benefit-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('benefit-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('benefit-item-2')).toBeInTheDocument();
      expect(screen.getByTestId('benefit-item-3')).toBeInTheDocument();
      expect(screen.getByTestId('benefit-item-4')).toBeInTheDocument();
      expect(screen.getByTestId('benefit-item-5')).toBeInTheDocument();
      
      expect(screen.getByText('Prevent accidental exposure to allergens')).toBeInTheDocument();
      expect(screen.getByText('Save time reading complex ingredient lists')).toBeInTheDocument();
      expect(screen.getByText('Discover hidden allergens in processed foods')).toBeInTheDocument();
      expect(screen.getByText('Build confidence in food purchasing decisions')).toBeInTheDocument();
      expect(screen.getByText('Get detailed analysis beyond basic allergen warnings')).toBeInTheDocument();
      expect(screen.getByText('Access offline-capable allergen database')).toBeInTheDocument();
    });

    it('should display user testimonial card', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('testimonial-card')).toBeInTheDocument();
      expect(screen.getByText('Join Thousands of Users')).toBeInTheDocument();
      expect(screen.getByText(/People with food allergies trust Allergy Agents/)).toBeInTheDocument();
    });
  });

  describe('Call to Action Section', () => {
    it('should render final CTA section', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('cta-section')).toBeInTheDocument();
      expect(screen.getByTestId('cta-title')).toBeInTheDocument();
      expect(screen.getByTestId('cta-description')).toBeInTheDocument();
      expect(screen.getByTestId('cta-title')).toHaveTextContent(/Ready to Take Control of Your.*Food Safety/);
    });

    it('should have final action buttons', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('cta-buttons')).toBeInTheDocument();
      expect(screen.getByTestId('cta-primary-button')).toBeInTheDocument();
      expect(screen.getByTestId('cta-secondary-button')).toBeInTheDocument();
      
      const buttons = screen.getAllByText('Get Started Free');
      const demoButtons = screen.getAllByText('Watch Demo');
      
      expect(buttons.length).toBeGreaterThan(0);
      expect(demoButtons.length).toBeGreaterThan(0);
    });

    it('should display copyright information', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('copyright-text')).toBeInTheDocument();
      expect(screen.getByTestId('copyright-text')).toHaveTextContent(/© 2024.*Allergy Agents/);
      expect(screen.getByTestId('copyright-text')).toHaveTextContent(/This tool is for informational purposes only/);
    });
  });

  describe('Navigation and Footer', () => {
    it('should render navigation component', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('navigation')).toBeInTheDocument();
    });

    it('should render footer component', () => {
      renderWithTheme(<LandingPage />);

      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should handle mobile layout', () => {
      mockUseMediaQuery.mockReturnValue(true); // Mobile
      renderWithTheme(<LandingPage />);

      // Should still render all main sections
      expect(screen.getByText('Your Food Safety,')).toBeInTheDocument();
      expect(screen.getByTestId('features-title')).toHaveTextContent(/Why Choose/);
      expect(screen.getByText('Making Food Safety')).toBeInTheDocument();
    });
  });

  describe('Color Schemes', () => {
    it('should use CSS custom properties for theming', () => {
      renderWithTheme(<LandingPage />);

      // Check that elements use CSS custom properties
      const heroHeading = screen.getByText('Your Food Safety,');
      expect(heroHeading).toHaveStyle('color: var(--foreground)');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderWithTheme(<LandingPage />);

      // Should have h1 for main heading
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();

      // Should have h2 for section headings
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('should have accessible button text', () => {
      renderWithTheme(<LandingPage />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveTextContent(/\S/); // Should have non-whitespace content
      });
    });
  });
});