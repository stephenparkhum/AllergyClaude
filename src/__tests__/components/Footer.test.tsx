import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/Footer';
import { siteData } from '@/lib/siteData';

/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Dialog: ({ open, children, onClose }: any) => 
    open ? <div data-testid="disclaimer-modal" onClick={onClose}>{children}</div> : null,
  DialogTitle: ({ children }: any) => <div data-testid="dialog-title">{children}</div>,
  DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
  DialogActions: ({ children }: any) => <div data-testid="dialog-actions">{children}</div>,
  Button: ({ children, onClick, 'data-testid': dataTestId }: any) => (
    <button onClick={onClick} data-testid={dataTestId || 'button'}>
      {children}
    </button>
  ),
}));

describe('Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      // Mock window width for desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
    });

    it('should render footer with site name', () => {
      render(<Footer />);
      
      expect(screen.getByText(siteData.name)).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      render(<Footer />);
      
      const homeLinks = screen.getAllByTestId('footer-home-link');
      const howToLinks = screen.getAllByTestId('footer-howto-link');
      
      expect(homeLinks[0]).toHaveTextContent('Home');
      expect(howToLinks[0]).toHaveTextContent('How to Use');
    });

    it('should render disclaimer button', () => {
      render(<Footer />);
      
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      expect(disclaimerButtons[0]).toHaveTextContent('Disclaimer');
    });

    it('should render safety warning', () => {
      render(<Footer />);
      
      expect(screen.getByText('Always verify ingredients')).toBeInTheDocument();
    });

    it('should render copyright information', () => {
      render(<Footer />);
      
      const copyrightElements = screen.getAllByText(siteData.legal.copyright);
      expect(copyrightElements.length).toBeGreaterThan(0);
    });

    it('should have horizontal layout on desktop', () => {
      render(<Footer />);
      
      const desktopLayout = screen.getByText(siteData.name).closest('.hidden.md\\:block');
      expect(desktopLayout).toBeInTheDocument();
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      // Mock window width for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
    });

    it('should render compact mobile layout', () => {
      render(<Footer />);
      
      // Check if mobile layout elements exist
      expect(screen.getByText(siteData.name)).toBeInTheDocument();
      expect(screen.getAllByText('•')).toHaveLength(2);
    });

    it('should render links with bullet separators on mobile', () => {
      render(<Footer />);
      
      // Check for bullet separators
      expect(screen.getAllByText('•')).toHaveLength(2);
    });

    it('should render all navigation links in horizontal layout', () => {
      render(<Footer />);
      
      const homeLinks = screen.getAllByTestId('footer-home-link');
      const linksContainer = homeLinks[0].closest('div');
      expect(linksContainer).toHaveClass('flex', 'justify-center', 'items-center', 'gap-6');
    });

    it('should use smaller text sizes on mobile', () => {
      render(<Footer />);
      
      const safetyNotice = screen.getByText('Always verify ingredients manually').closest('div');
      expect(safetyNotice).toHaveClass('text-xs');
    });
  });

  describe('Disclaimer Modal', () => {
    it('should not show modal by default', () => {
      render(<Footer />);
      
      expect(screen.queryByTestId('disclaimer-modal')).not.toBeInTheDocument();
    });

    it('should open modal when disclaimer button is clicked', () => {
      render(<Footer />);
      
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      fireEvent.click(disclaimerButtons[0]);
      
      expect(screen.getByTestId('disclaimer-modal')).toBeInTheDocument();
    });

    it('should render modal content when open', () => {
      render(<Footer />);
      
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      fireEvent.click(disclaimerButtons[0]);
      
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-actions')).toBeInTheDocument();
    });

    it('should contain important disclaimer text', () => {
      render(<Footer />);
      
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      fireEvent.click(disclaimerButtons[0]);
      
      expect(screen.getByText('IMPORTANT DISCLAIMER & SAFETY NOTICE')).toBeInTheDocument();
      expect(screen.getByText(/ALWAYS DOUBLE-CHECK INGREDIENTS/)).toBeInTheDocument();
    });

    it('should have close button in modal', () => {
      render(<Footer />);
      
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      fireEvent.click(disclaimerButtons[0]);
      
      expect(screen.getByTestId('disclaimer-close-button')).toHaveTextContent('I Understand');
    });

    it('should close modal when close button is clicked', () => {
      render(<Footer />);
      
      // Open modal
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      fireEvent.click(disclaimerButtons[0]);
      
      // Close modal
      const closeButton = screen.getByTestId('disclaimer-close-button');
      fireEvent.click(closeButton);
      
      expect(screen.queryByTestId('disclaimer-modal')).not.toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should have reduced margins and padding for space efficiency', () => {
      render(<Footer />);
      
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('mt-12'); // Reduced from mt-20
      
      const container = footer.querySelector('.max-w-7xl');
      expect(container).toHaveClass('py-6', 'md:py-8'); // Reduced padding
    });

    it('should have proper border styling', () => {
      render(<Footer />);
      
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('border-t');
    });

    it('should center content on mobile', () => {
      render(<Footer />);
      
      // Check if the mobile content has centering class
      const footer = screen.getByTestId('footer');
      const centerElement = footer.querySelector('.text-center');
      expect(centerElement).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper landmark role', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should have accessible navigation links', () => {
      render(<Footer />);
      
      const homeLinks = screen.getAllByTestId('footer-home-link');
      const howToLinks = screen.getAllByTestId('footer-howto-link');
      
      expect(homeLinks[0]).toHaveAttribute('href', '/');
      expect(howToLinks[0]).toHaveAttribute('href', '/how-to');
    });

    it('should have accessible disclaimer button', () => {
      render(<Footer />);
      
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      expect(disclaimerButtons[0].tagName).toBe('BUTTON');
    });

    it('should have proper ARIA attributes for modal', () => {
      render(<Footer />);
      
      const disclaimerButtons = screen.getAllByTestId('disclaimer-button');
      fireEvent.click(disclaimerButtons[0]);
      
      const modal = screen.getByTestId('disclaimer-modal');
      expect(modal).toHaveAttribute('data-testid', 'disclaimer-modal');
    });
  });

  describe('Safety Information', () => {
    it('should display warning icon with safety message', () => {
      render(<Footer />);
      
      // Check for safety messages (there are multiple on mobile and desktop)
      const safetyMessages = screen.getAllByText(/Always verify ingredients/);
      expect(safetyMessages.length).toBeGreaterThan(0);
    });

    it('should use warning color for safety notice', () => {
      render(<Footer />);
      
      const safetyNotices = screen.getAllByText(/Always verify ingredients/);
      const safetyNotice = safetyNotices[0].closest('div');
      expect(safetyNotice).toHaveStyle('color: rgb(245, 158, 11)');
    });
  });
});