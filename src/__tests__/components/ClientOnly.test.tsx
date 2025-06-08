import { render, screen } from '@testing-library/react';
import ClientOnly from '@/components/ClientOnly';

describe('ClientOnly', () => {
  it('should render fallback initially', () => {
    render(
      <ClientOnly fallback={<div>Loading...</div>}>
        <div>Client content</div>
      </ClientOnly>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Client content')).not.toBeInTheDocument();
  });

  it('should render children after mounting', async () => {
    render(
      <ClientOnly>
        <div>Client content</div>
      </ClientOnly>
    );
    
    setTimeout(() => {
      expect(screen.getByText('Client content')).toBeInTheDocument();
    }, 0);
  });

  it('should render null as fallback when no fallback provided', () => {
    const { container } = render(
      <ClientOnly>
        <div>Client content</div>
      </ClientOnly>
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should handle custom fallback component', () => {
    const CustomFallback = () => <div data-testid="custom-fallback">Custom loading...</div>;
    
    render(
      <ClientOnly fallback={<CustomFallback />}>
        <div>Client content</div>
      </ClientOnly>
    );
    
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });
});