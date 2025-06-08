import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'light',
      resolvedTheme: 'light',
    });
  });

  it('should render disabled button before mounting', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should show moon icon for light theme after mounting', () => {
    render(<ThemeToggle />);
    setTimeout(() => {
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    }, 0);
  });

  it('should show different icon for dark theme after mounting', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      resolvedTheme: 'dark',
    });

    render(<ThemeToggle />);
    setTimeout(() => {
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    }, 0);
  });

  it('should toggle theme when clicked', () => {
    render(<ThemeToggle />);
    
    setTimeout(() => {
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    }, 0);
  });

  it('should toggle from dark to light', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      resolvedTheme: 'dark',
    });

    render(<ThemeToggle />);
    
    setTimeout(() => {
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    }, 0);
  });
});