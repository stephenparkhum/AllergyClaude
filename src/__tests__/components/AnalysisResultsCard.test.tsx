import { render, screen, fireEvent } from '@testing-library/react';
import AnalysisResultsCard from '@/components/AnalysisResultsCard';

const mockSafeResults = {
  safe: true,
  food_name: 'Organic Crackers',
  food_brand: 'Healthy Brand',
  detected_allergens: [],
  potential_allergens: [],
  safe_ingredients: ['wheat', 'water', 'salt', 'olive oil'],
  warning_ingredients: [],
  unsafe_ingredients: [],
  ingredients: ['wheat', 'water', 'salt', 'olive oil'],
  analysis: 'This product appears safe for consumption based on your allergy profile.',
};

const mockUnsafeResults = {
  safe: false,
  food_name: 'Mixed Nuts',
  food_brand: 'Snack Co',
  detected_allergens: ['peanuts', 'tree nuts'],
  potential_allergens: ['sesame'],
  safe_ingredients: ['salt'],
  warning_ingredients: ['natural flavors'],
  unsafe_ingredients: ['peanuts', 'almonds'],
  ingredients: ['peanuts', 'almonds', 'salt', 'natural flavors'],
  analysis: 'This product contains multiple allergens that match your allergy profile and should be avoided.',
};

const mockUnknownProduct = {
  safe: true,
  food_name: 'Unknown Product',
  food_brand: 'Unknown Brand',
  detected_allergens: [],
  potential_allergens: [],
  safe_ingredients: ['sugar'],
  warning_ingredients: [],
  unsafe_ingredients: [],
  ingredients: ['sugar'],
  analysis: 'Unable to identify product but ingredients appear safe.',
};

describe('AnalysisResultsCard', () => {
  describe('Loading State', () => {
    it('should display loading state with spinner and message', () => {
      render(<AnalysisResultsCard results={null} isAnalyzing={true} isMobile={false} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText('Analyzing ingredients...')).toBeInTheDocument();
      expect(screen.getByText('This may take a moment')).toBeInTheDocument();
    });

    it('should display mobile loading state', () => {
      render(<AnalysisResultsCard results={null} isAnalyzing={true} isMobile={true} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText('Analyzing ingredients...')).toBeInTheDocument();
      expect(screen.queryByText('This may take a moment')).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should display empty state when no results and not analyzing', () => {
      render(<AnalysisResultsCard results={null} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('Ready to Analyze')).toBeInTheDocument();
      expect(screen.getByText('Upload a food label photo and enter your allergies to get started')).toBeInTheDocument();
    });

    it('should display mobile empty state', () => {
      render(<AnalysisResultsCard results={null} isAnalyzing={false} isMobile={true} />);

      expect(screen.getByText('Upload an image to begin analysis')).toBeInTheDocument();
      expect(screen.queryByText('Ready to Analyze')).not.toBeInTheDocument();
    });
  });

  describe('Results Display', () => {
    it('should display safe results correctly', () => {
      render(<AnalysisResultsCard results={mockSafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('Analysis Results')).toBeInTheDocument();
      expect(screen.getByText('SAFE TO CONSUME')).toBeInTheDocument();
      expect(screen.getByText('0 allergens detected')).toBeInTheDocument();
    });

    it('should display unsafe results correctly', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('CONTAINS ALLERGENS')).toBeInTheDocument();
      expect(screen.getByText('2 allergens detected')).toBeInTheDocument();
    });

    it('should display mobile results title', () => {
      render(<AnalysisResultsCard results={mockSafeResults} isAnalyzing={false} isMobile={true} />);

      expect(screen.getByText('Results')).toBeInTheDocument();
      expect(screen.queryByText('Analysis Results')).not.toBeInTheDocument();
    });

    it('should display product information when available', () => {
      render(<AnalysisResultsCard results={mockSafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('Product Information')).toBeInTheDocument();
      expect(screen.getByText('Healthy Brand')).toBeInTheDocument();
      expect(screen.getByText('Organic Crackers')).toBeInTheDocument();
    });

    it('should hide product information for unknown products', () => {
      render(<AnalysisResultsCard results={mockUnknownProduct} isAnalyzing={false} isMobile={false} />);

      expect(screen.queryByText('Product Information')).not.toBeInTheDocument();
    });
  });

  describe('Tab Functionality', () => {
    it('should display all three tabs', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('Safety Overview')).toBeInTheDocument();
      expect(screen.getByText('All Ingredients')).toBeInTheDocument();
      expect(screen.getByText('Detailed Analysis')).toBeInTheDocument();
    });

    it('should display mobile tab labels', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={true} />);

      expect(screen.getByText('Safety')).toBeInTheDocument();
      expect(screen.getByText('Ingredients')).toBeInTheDocument();
      expect(screen.getByText('Analysis')).toBeInTheDocument();
    });

    it('should switch between tabs when clicked', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      // Default should show Safety Overview content
      expect(screen.getByText('⚠️ Detected Allergens')).toBeInTheDocument();

      // Click on All Ingredients tab
      fireEvent.click(screen.getByText('All Ingredients'));
      expect(screen.getByText('⚠️ Unsafe for Your Allergies (2)')).toBeInTheDocument();

      // Click on Detailed Analysis tab
      fireEvent.click(screen.getByText('Detailed Analysis'));
      expect(screen.getByText(mockUnsafeResults.analysis)).toBeInTheDocument();
    });
  });

  describe('Safety Tab Content', () => {
    it('should display detected allergens', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('⚠️ Detected Allergens')).toBeInTheDocument();
      expect(screen.getByText('peanuts')).toBeInTheDocument();
      expect(screen.getByText('tree nuts')).toBeInTheDocument();
    });

    it('should display potential allergens', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('⚡ Potential Allergens')).toBeInTheDocument();
      expect(screen.getByText('sesame')).toBeInTheDocument();
    });

    it('should display safe ingredients count on desktop', () => {
      render(<AnalysisResultsCard results={mockSafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('✅ Safe Ingredients (4)')).toBeInTheDocument();
      expect(screen.getByText('wheat, water, salt, olive oil')).toBeInTheDocument();
    });

    it('should not display safe ingredients on mobile', () => {
      render(<AnalysisResultsCard results={mockSafeResults} isAnalyzing={false} isMobile={true} />);

      expect(screen.queryByText('✅ Safe Ingredients (4)')).not.toBeInTheDocument();
    });
  });

  describe('Ingredients Tab Content', () => {
    it('should display all ingredients with appropriate colors', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      // Switch to ingredients tab
      fireEvent.click(screen.getByText('All Ingredients'));

      // Check that ingredients are displayed
      expect(screen.getAllByText('peanuts')).toHaveLength(2); // One in all ingredients, one in unsafe section
      expect(screen.getByText('salt')).toBeInTheDocument();
    });

    it('should display unsafe ingredients section when present', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      fireEvent.click(screen.getByText('All Ingredients'));
      expect(screen.getByText('⚠️ Unsafe for Your Allergies (2)')).toBeInTheDocument();
    });
  });

  describe('Analysis Tab Content', () => {
    it('should display the analysis text', () => {
      render(<AnalysisResultsCard results={mockSafeResults} isAnalyzing={false} isMobile={false} />);

      fireEvent.click(screen.getByText('Detailed Analysis'));
      expect(screen.getByText(mockSafeResults.analysis)).toBeInTheDocument();
    });

    it('should handle empty analysis', () => {
      const resultsWithoutAnalysis = { ...mockSafeResults, analysis: '' };
      render(<AnalysisResultsCard results={resultsWithoutAnalysis} isAnalyzing={false} isMobile={false} />);

      fireEvent.click(screen.getByText('Detailed Analysis'));
      const analysisText = screen.getByText('', { selector: 'p' });
      expect(analysisText).toBeInTheDocument();
      expect(analysisText).toHaveTextContent('');
    });
  });

  describe('Allergen Count Display', () => {
    it('should display singular allergen text for one allergen', () => {
      const singleAllergenResults = {
        ...mockUnsafeResults,
        detected_allergens: ['peanuts'],
      };
      render(<AnalysisResultsCard results={singleAllergenResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('1 allergen detected')).toBeInTheDocument();
    });

    it('should display plural allergen text for multiple allergens', () => {
      render(<AnalysisResultsCard results={mockUnsafeResults} isAnalyzing={false} isMobile={false} />);

      expect(screen.getByText('2 allergens detected')).toBeInTheDocument();
    });
  });
});