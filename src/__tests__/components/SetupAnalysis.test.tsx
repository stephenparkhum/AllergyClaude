import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SetupAnalysis from '@/components/SetupAnalysis';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock ImageUpload component
jest.mock('@/components/ImageUpload', () => {
  const MockImageUpload = ({ onImageUpload }: { onImageUpload: (data: string) => void }) => (
    <div data-testid="image-upload">
      <button
        onClick={() => onImageUpload('data:image/jpeg;base64,mockImageData')}
        data-testid="mock-upload-button"
        type="button"
      >
        Upload Image
      </button>
    </div>
  );
  MockImageUpload.displayName = 'MockImageUpload';
  return MockImageUpload;
});

// Mock useMediaQuery to control mobile/desktop view
const mockUseMediaQuery = jest.fn();
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: () => mockUseMediaQuery(),
}));

const theme = createTheme();

const defaultProps = {
  allergies: '',
  setAllergies: jest.fn(),
  uploadedImage: null,
  onImageUpload: jest.fn(),
  onRemoveImage: jest.fn(),
  onAnalyze: jest.fn(),
  isAnalyzing: false,
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SetupAnalysis', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false); // Desktop
    });

    it('should render desktop layout correctly', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      expect(screen.getByTestId('sidebar-card')).toBeInTheDocument();
      expect(screen.getByText('Setup')).toBeInTheDocument();
      expect(screen.getByText('Analysis')).toBeInTheDocument();
    });

    it('should render allergies input with correct placeholder', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      const allergiesInput = screen.getByLabelText('Known Allergies');
      expect(allergiesInput).toBeInTheDocument();
      expect(allergiesInput).toHaveAttribute('placeholder', 'peanuts, dairy, gluten... (separate with commas)');
    });

    it('should display current allergies value', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} allergies="peanuts, dairy" />);

      const allergiesInput = screen.getByDisplayValue('peanuts, dairy');
      expect(allergiesInput).toBeInTheDocument();
    });

    it('should call setAllergies when input changes', () => {
      const setAllergies = jest.fn();
      renderWithTheme(<SetupAnalysis {...defaultProps} setAllergies={setAllergies} />);

      const allergiesInput = screen.getByLabelText('Known Allergies');
      fireEvent.change(allergiesInput, { target: { value: 'shellfish' } });

      expect(setAllergies).toHaveBeenCalledWith('shellfish');
    });

    it('should show ImageUpload component when no image is uploaded', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      expect(screen.getByTestId('image-upload')).toBeInTheDocument();
    });

    it('should show uploaded image when image is present', () => {
      renderWithTheme(
        <SetupAnalysis {...defaultProps} uploadedImage="data:image/jpeg;base64,testImageData" />
      );

      expect(screen.getByAltText('Uploaded photo')).toBeInTheDocument();
      expect(screen.getByText('Upload Different Image')).toBeInTheDocument();
      expect(screen.queryByTestId('image-upload')).not.toBeInTheDocument();
    });

    it('should call onRemoveImage when remove button is clicked', () => {
      const onRemoveImage = jest.fn();
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          uploadedImage="data:image/jpeg;base64,testImageData"
          onRemoveImage={onRemoveImage}
        />
      );

      fireEvent.click(screen.getByText('Upload Different Image'));
      expect(onRemoveImage).toHaveBeenCalled();
    });

    it('should disable analyze button when requirements not met', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      const analyzeButton = screen.getByTestId('analyze-button');
      expect(analyzeButton).toBeDisabled();
    });

    it('should enable analyze button when all requirements are met', () => {
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies="peanuts"
          uploadedImage="data:image/jpeg;base64,testImageData"
        />
      );

      const analyzeButton = screen.getByTestId('analyze-button');
      expect(analyzeButton).not.toBeDisabled();
    });

    it('should disable analyze button when analyzing', () => {
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies="peanuts"
          uploadedImage="data:image/jpeg;base64,testImageData"
          isAnalyzing={true}
        />
      );

      const analyzeButton = screen.getByTestId('analyze-button');
      expect(analyzeButton).toBeDisabled();
      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
    });

    it('should call onAnalyze when analyze button is clicked', () => {
      const onAnalyze = jest.fn();
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies="peanuts"
          uploadedImage="data:image/jpeg;base64,testImageData"
          onAnalyze={onAnalyze}
        />
      );

      fireEvent.click(screen.getByTestId('analyze-button'));
      expect(onAnalyze).toHaveBeenCalled();
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true); // Mobile
    });

    it('should render mobile layout correctly', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      expect(screen.getByTestId('input-card')).toBeInTheDocument();
      expect(screen.getByText('Setup')).toBeInTheDocument();
      expect(screen.getByText('Analysis')).toBeInTheDocument();
    });

    it('should render allergies input with mobile placeholder', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      const allergiesInput = screen.getByLabelText('Known allergies');
      expect(allergiesInput).toBeInTheDocument();
      expect(allergiesInput).toHaveAttribute('placeholder', 'peanuts, shellfish, dairy... (separate with commas)');
    });

    it('should show larger analyze button on mobile', () => {
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies="peanuts"
          uploadedImage="data:image/jpeg;base64,testImageData"
        />
      );

      const analyzeButton = screen.getByTestId('analyze-button');
      expect(analyzeButton).toBeInTheDocument();
      expect(screen.getByText('Analyze Ingredients')).toBeInTheDocument();
    });
  });

  describe('Image Upload Integration', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('should call onImageUpload when image is uploaded through ImageUpload component', () => {
      const onImageUpload = jest.fn();
      renderWithTheme(<SetupAnalysis {...defaultProps} onImageUpload={onImageUpload} />);

      fireEvent.click(screen.getByTestId('mock-upload-button'));
      expect(onImageUpload).toHaveBeenCalledWith('data:image/jpeg;base64,mockImageData');
    });

    it('should switch from ImageUpload to image preview when image is uploaded', async () => {
      const { rerender } = renderWithTheme(<SetupAnalysis {...defaultProps} />);

      expect(screen.getByTestId('image-upload')).toBeInTheDocument();

      // Simulate image upload
      rerender(
        <ThemeProvider theme={theme}>
          <SetupAnalysis {...defaultProps} uploadedImage="data:image/jpeg;base64,testImageData" />
        </ThemeProvider>
      );

      expect(screen.queryByTestId('image-upload')).not.toBeInTheDocument();
      expect(screen.getByAltText('Uploaded photo')).toBeInTheDocument();
    });
  });

  describe('Button States', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('should show "Analyze Ingredients" when not analyzing', () => {
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies="peanuts"
          uploadedImage="data:image/jpeg;base64,testImageData"
        />
      );

      expect(screen.getByText('Analyze Ingredients')).toBeInTheDocument();
    });

    it('should show "Analyzing..." when analyzing', () => {
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies="peanuts"
          uploadedImage="data:image/jpeg;base64,testImageData"
          isAnalyzing={true}
        />
      );

      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
    });

    it('should disable button when allergies are empty', () => {
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies=""
          uploadedImage="data:image/jpeg;base64,testImageData"
        />
      );

      expect(screen.getByTestId('analyze-button')).toBeDisabled();
    });

    it('should disable button when allergies are only whitespace', () => {
      renderWithTheme(
        <SetupAnalysis
          {...defaultProps}
          allergies="   "
          uploadedImage="data:image/jpeg;base64,testImageData"
        />
      );

      expect(screen.getByTestId('analyze-button')).toBeDisabled();
    });

    it('should disable button when no image is uploaded', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} allergies="peanuts" uploadedImage={null} />);

      expect(screen.getByTestId('analyze-button')).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false);
    });

    it('should have proper test ids for testing', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      expect(screen.getByTestId('sidebar-card')).toBeInTheDocument();
      expect(screen.getByTestId('allergies-input')).toBeInTheDocument();
      expect(screen.getByTestId('analyze-button')).toBeInTheDocument();
    });

    it('should have accessible form labels', () => {
      renderWithTheme(<SetupAnalysis {...defaultProps} />);

      expect(screen.getByLabelText('Known Allergies')).toBeInTheDocument();
    });
  });
});