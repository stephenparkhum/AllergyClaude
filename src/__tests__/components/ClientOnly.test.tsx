import { render, screen } from '@testing-library/react';
import ClientOnly from '@/components/ClientOnly';
import * as React from 'react';

// Mock useState to control the mounted state
const mockSetState = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => [false, mockSetState]),
  useEffect: jest.fn((fn) => fn()),
}));

describe('ClientOnly', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset useState mock to return false (not mounted)
    (React.useState as jest.Mock).mockReturnValue([false, mockSetState]);
  });

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
    // Mock useState to return true (mounted)
    (React.useState as jest.Mock).mockReturnValue([true, mockSetState]);
    
    render(
      <ClientOnly>
        <div>Client content</div>
      </ClientOnly>
    );
    
    expect(screen.getByText('Client content')).toBeInTheDocument();
  });

  it('should render null as fallback when no fallback provided', () => {
    const { container } = render(
      <ClientOnly>
        <div>Client content</div>
      </ClientOnly>
    );
    
    // Should render a div with null content when not mounted and no fallback
    expect(container.firstChild).toHaveTextContent('');
    expect(container.firstChild?.nodeName).toBe('DIV');
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