import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import * as React from 'react';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

// Mock React hooks to control mounting state
const mockSetMounted = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
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
    
    // Default to not mounted
    (React.useState as jest.Mock).mockReturnValue([false, mockSetMounted]);
    (React.useEffect as jest.Mock).mockImplementation((fn: () => void) => fn());
  });

  it('should render disabled button before mounting', () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle-loading');
    expect(button).toBeDisabled();
  });

  it('should show moon icon for light theme after mounting', () => {
    // Mock mounted state
    (React.useState as jest.Mock).mockReturnValue([true, mockSetMounted]);
    
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode. Currently in light mode.');
  });

  it('should show different icon for dark theme after mounting', () => {
    // Mock mounted state and dark theme
    (React.useState as jest.Mock).mockReturnValue([true, mockSetMounted]);
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      resolvedTheme: 'dark',
    });

    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode. Currently in dark mode.');
  });

  it('should toggle theme when clicked', () => {
    // Mock mounted state
    (React.useState as jest.Mock).mockReturnValue([true, mockSetMounted]);
    
    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should toggle from dark to light', () => {
    // Mock mounted state and dark theme
    (React.useState as jest.Mock).mockReturnValue([true, mockSetMounted]);
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      themes: ['light', 'dark'],
      systemTheme: 'dark',
      resolvedTheme: 'dark',
    });

    render(<ThemeToggle />);
    const button = screen.getByTestId('theme-toggle');
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});