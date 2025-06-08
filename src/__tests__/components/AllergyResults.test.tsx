import { render, screen } from '@testing-library/react';
import AllergyResults from '@/components/AllergyResults';

const mockSafeResults = {
  safe: true,
  detected_allergens: [],
  potential_allergens: [],
  safe_ingredients: ['wheat', 'water', 'salt'],
  warning_ingredients: [],
  unsafe_ingredients: [],
  ingredients: ['wheat', 'water', 'salt'],
  analysis: 'This product appears safe for consumption.',
};

const mockUnsafeResults = {
  safe: false,
  detected_allergens: ['peanuts', 'dairy'],
  potential_allergens: [],
  safe_ingredients: ['wheat', 'salt'],
  warning_ingredients: [],
  unsafe_ingredients: ['peanuts', 'milk'],
  ingredients: ['wheat', 'peanuts', 'milk', 'salt'],
  analysis: 'This product contains allergens that match your allergies.',
};

describe('AllergyResults', () => {
  it('should display safe message for safe products', () => {
    render(<AllergyResults results={mockSafeResults} />);

    expect(screen.getByText('SAFE TO CONSUME')).toBeInTheDocument();
  });

  it('should display unsafe message for unsafe products', () => {
    render(<AllergyResults results={mockUnsafeResults} />);

    expect(screen.getByText('CONTAINS ALLERGENS')).toBeInTheDocument();
  });

  it('should display detected allergens for unsafe products', () => {
    render(<AllergyResults results={mockUnsafeResults} />);

    expect(screen.getByText('DETECTED ALLERGENS:')).toBeInTheDocument();
    expect(screen.getAllByText('peanuts')).toHaveLength(2); // Appears in detected_allergens and ingredients
    expect(screen.getByText('dairy')).toBeInTheDocument();
  });

  it('should not display allergens section for safe products', () => {
    render(<AllergyResults results={mockSafeResults} />);

    expect(screen.queryByText('DETECTED ALLERGENS:')).not.toBeInTheDocument();
  });

  it('should display all detected ingredients', () => {
    render(<AllergyResults results={mockSafeResults} />);

    expect(screen.getByText('DETECTED INGREDIENTS:')).toBeInTheDocument();
    expect(screen.getByText('wheat')).toBeInTheDocument();
    expect(screen.getByText('water')).toBeInTheDocument();
    expect(screen.getByText('salt')).toBeInTheDocument();
  });

  it('should display analysis when provided', () => {
    render(<AllergyResults results={mockSafeResults} />);

    expect(screen.getByText('DETAILED ANALYSIS:')).toBeInTheDocument();
    expect(screen.getByText('This product appears safe for consumption.')).toBeInTheDocument();
  });

  it('should handle empty ingredients list', () => {
    const resultsWithoutIngredients = {
      ...mockSafeResults,
      ingredients: [],
      safe_ingredients: [],
      warning_ingredients: [],
      unsafe_ingredients: [],
    };

    render(<AllergyResults results={resultsWithoutIngredients} />);

    expect(screen.queryByText('DETECTED INGREDIENTS:')).not.toBeInTheDocument();
  });

  it('should handle empty analysis', () => {
    const resultsWithoutAnalysis = {
      ...mockSafeResults,
      analysis: '',
    };

    render(<AllergyResults results={resultsWithoutAnalysis} />);

    expect(screen.queryByText('DETAILED ANALYSIS:')).not.toBeInTheDocument();
  });
});
