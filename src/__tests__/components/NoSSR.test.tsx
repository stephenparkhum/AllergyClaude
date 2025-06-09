import { render, screen, waitFor } from '@testing-library/react';
import NoSSR from '@/components/NoSSR';

// The NoSSR component will immediately mount in test environment
// since we're not dealing with actual SSR

describe('NoSSR', () => {
  beforeEach(() => {
    // No setup needed
  });

  it('should render children in test environment', () => {
    const TestComponent = () => <div>Client-side content</div>;
    const FallbackComponent = () => <div>Loading fallback</div>;

    render(
      <NoSSR fallback={<FallbackComponent />}>
        <TestComponent />
      </NoSSR>
    );

    // In test environment, NoSSR immediately mounts
    expect(screen.getByText('Client-side content')).toBeInTheDocument();
  });

  it('should render children after mounting', async () => {
    const TestComponent = () => <div>Client-side content</div>;
    const FallbackComponent = () => <div>Loading fallback</div>;

    render(
      <NoSSR fallback={<FallbackComponent />}>
        <TestComponent />
      </NoSSR>
    );

    // Wait for useEffect to run and component to mount
    await waitFor(() => {
      expect(screen.getByText('Client-side content')).toBeInTheDocument();
    });

    expect(screen.queryByText('Loading fallback')).not.toBeInTheDocument();
  });

  it('should render children when no fallback is provided', () => {
    const TestComponent = () => <div>Client-side content</div>;

    render(
      <NoSSR>
        <TestComponent />
      </NoSSR>
    );

    // In test environment, renders children immediately
    expect(screen.getByText('Client-side content')).toBeInTheDocument();
  });

  it('should eventually render children when no fallback is provided', async () => {
    const TestComponent = () => <div>Client-side content</div>;

    render(
      <NoSSR>
        <TestComponent />
      </NoSSR>
    );

    await waitFor(() => {
      expect(screen.getByText('Client-side content')).toBeInTheDocument();
    });
  });

  it('should handle complex child components', () => {
    const ComplexComponent = () => (
      <div>
        <h1>Complex Component</h1>
        <button>Interactive Button</button>
        <p>Some paragraph text</p>
      </div>
    );

    render(
      <NoSSR fallback={<div>Loading complex component...</div>}>
        <ComplexComponent />
      </NoSSR>
    );

    // In test environment, shows complex component immediately
    expect(screen.getByText('Complex Component')).toBeInTheDocument();
    expect(screen.getByText('Interactive Button')).toBeInTheDocument();
    expect(screen.getByText('Some paragraph text')).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    render(
      <NoSSR fallback={<div>Loading multiple items...</div>}>
        <div>First child</div>
        <div>Second child</div>
        <span>Third child</span>
      </NoSSR>
    );

    // In test environment, shows all children immediately
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('should render NoSSR component correctly', () => {
    const TestComponent = () => <div>Test</div>;

    render(
      <NoSSR>
        <TestComponent />
      </NoSSR>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle string children', () => {
    render(
      <NoSSR fallback={<div>Loading text...</div>}>
        Just some text content
      </NoSSR>
    );

    expect(screen.getByText('Just some text content')).toBeInTheDocument();
  });

  it('should render children when custom fallback is provided', () => {
    const CustomFallback = ({ message }: { message: string }) => (
      <div role="status" aria-label="loading">
        {message}
      </div>
    );

    render(
      <NoSSR fallback={<CustomFallback message="Custom loading message" />}>
        <div>Content</div>
      </NoSSR>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});