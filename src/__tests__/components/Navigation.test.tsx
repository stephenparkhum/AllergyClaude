import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import Navigation from '@/components/Navigation';
import { siteData } from '@/lib/siteData';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
  useTheme: jest.fn(),
}));

jest.mock('@/components/NoSSR', () => {
  const MockNoSSR = ({ children }: { children: React.ReactNode; fallback?: React.ReactNode }) => {
    return <div data-testid="nossr-wrapper">{children}</div>;
  };
  return MockNoSSR;
});

jest.mock('@/components/ThemeToggle', () => {
  const MockThemeToggle = ({ iconColor }: { iconColor?: string }) => {
    return <button data-testid="theme-toggle" style={{ color: iconColor }}>Theme Toggle</button>;
  };
  return MockThemeToggle;
});

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;
const mockUseMuiTheme = useMuiTheme as jest.MockedFunction<typeof useMuiTheme>;

describe('Navigation', () => {
  const mockTheme = {
    palette: {
      primary: {
        main: '#4F6F8C',
      },
    },
    breakpoints: {
      down: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMuiTheme.mockReturnValue(mockTheme as ReturnType<typeof useMuiTheme>);
    mockUseMediaQuery.mockReturnValue(false); // Default to desktop
    mockUsePathname.mockReturnValue('/');
  });

  describe('Desktop Layout', () => {
    it('should render navigation with site name on home page', () => {
      render(<Navigation />);
      
      expect(screen.getByTestId('nav-title')).toHaveTextContent(siteData.name);
    });

    it('should render "How to Use" button on home page', () => {
      render(<Navigation />);
      
      const howToButton = screen.getByTestId('how-to-nav-button');
      expect(howToButton).toBeInTheDocument();
      expect(howToButton).toHaveTextContent('How to Use');
    });

    it('should render "Analyzer" button on non-home page', () => {
      mockUsePathname.mockReturnValue('/how-to');
      
      render(<Navigation />);
      
      const backButton = screen.getByTestId('home-nav-button');
      expect(backButton).toBeInTheDocument();
      expect(backButton).toHaveTextContent('Analyzer');
    });

    it('should render theme toggle', () => {
      render(<Navigation />);
      
      const themeToggle = screen.getByTestId('theme-toggle');
      expect(themeToggle).toBeInTheDocument();
    });

    it('should render Home button on non-home page', () => {
      mockUsePathname.mockReturnValue('/how-to');
      
      render(<Navigation />);
      
      expect(screen.getByTestId('landing-nav-button')).toHaveTextContent('Home');
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true); // Mobile
    });

    it('should render mobile navigation with site name', () => {
      render(<Navigation />);
      
      expect(screen.getByTestId('nav-title')).toHaveTextContent(siteData.name);
      expect(screen.getByTestId('mobile-menu-button')).toBeInTheDocument();
    });

    it('should render mobile navigation correctly', () => {
      render(<Navigation />);
      
      expect(screen.getByTestId('mobile-menu-button')).toBeInTheDocument();
    });

    it('should open mobile menu when menu button is clicked', () => {
      render(<Navigation />);
      
      const menuButton = screen.getByTestId('mobile-menu-button');
      fireEvent.click(menuButton);
      
      expect(screen.getByTestId('mobile-menu-drawer')).toBeInTheDocument();
    });

    it('should render mobile menu with navigation links', () => {
      render(<Navigation />);
      
      // Open menu
      const menuButton = screen.getByTestId('mobile-menu-button');
      fireEvent.click(menuButton);
      
      expect(screen.getByTestId('mobile-how-to-button')).toBeInTheDocument();
    });

    it('should render home button in mobile menu on non-home page', () => {
      mockUsePathname.mockReturnValue('/how-to');
      
      render(<Navigation />);
      
      // Open menu
      const menuButton = screen.getByTestId('mobile-menu-button');
      fireEvent.click(menuButton);
      
      expect(screen.getByTestId('mobile-landing-button')).toBeInTheDocument();
    });

    it('should use horizontal layout on mobile', () => {
      render(<Navigation />);
      
      // Find the mobile layout container
      const mobileContainer = screen.getByTestId('nav-title').parentElement?.parentElement;
      expect(mobileContainer).toHaveClass('flex', 'items-center', 'justify-between', 'h-16');
    });
  });

  describe('Styling', () => {
    it('should have backdrop blur styling', () => {
      render(<Navigation />);
      
      const nav = screen.getByTestId('navigation');
      expect(nav).toHaveClass('backdrop-blur-md');
    });

    it('should have CSS variable color for title', () => {
      render(<Navigation />);
      
      const title = screen.getByTestId('nav-title');
      expect(title).toHaveStyle('color: var(--foreground)');
    });

    it('should have consistent padding', () => {
      mockUseMediaQuery.mockReturnValue(true);
      
      render(<Navigation />);
      
      // Find the main container div
      const nav = screen.getByTestId('navigation');
      const container = nav.querySelector('.max-w-7xl');
      expect(container).toHaveClass('px-4', 'sm:px-6');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for mobile menu button', () => {
      mockUseMediaQuery.mockReturnValue(true);
      
      render(<Navigation />);
      
      const menuButton = screen.getByTestId('mobile-menu-button');
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
    });

    it('should have proper aria-label for navigation buttons', () => {
      render(<Navigation />);
      
      const howToButton = screen.getByTestId('how-to-nav-button');
      expect(howToButton).toHaveAttribute('aria-label', 'Learn how to use Allergy Agents');
    });
  });
});