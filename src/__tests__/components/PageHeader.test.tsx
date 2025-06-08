import { render, screen } from '@testing-library/react';
import PageHeader from '@/components/PageHeader';
import { siteData } from '@/lib/siteData';

describe('PageHeader', () => {
  it('should render custom title and subtitle', () => {
    render(
      <PageHeader 
        title="Custom Title" 
        subtitle="Custom subtitle text" 
      />
    );
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom subtitle text')).toBeInTheDocument();
  });

  it('should render site name and tagline when showSiteName is true', () => {
    render(<PageHeader showSiteName={true} />);
    
    expect(screen.getByText(siteData.name)).toBeInTheDocument();
    expect(screen.getByText(siteData.tagline)).toBeInTheDocument();
  });

  it('should render nothing when no props provided', () => {
    const { container } = render(<PageHeader />);
    
    expect(container.firstChild).toBeNull();
  });

  it('should render only title when only title provided', () => {
    render(<PageHeader title="Only Title" />);
    
    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByTestId('page-subtitle')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <PageHeader 
        title="Test Title" 
        className="custom-class" 
      />
    );
    
    const header = screen.getByTestId('page-header');
    expect(header).toHaveClass('custom-class');
  });

  it('should have correct test ids', () => {
    render(
      <PageHeader 
        title="Test Title" 
        subtitle="Test Subtitle" 
      />
    );
    
    expect(screen.getByTestId('page-header')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('page-subtitle')).toBeInTheDocument();
  });
});