import { validateAllergies, validateImageData, validateAnalysisRequest } from '@/lib/utils/validation';

describe('validation utilities', () => {
  describe('validateAllergies', () => {
    it('should return true for non-empty allergies', () => {
      expect(validateAllergies('peanuts, shellfish')).toBe(true);
    });

    it('should return true for allergies with only spaces that trim to content', () => {
      expect(validateAllergies('  dairy  ')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(validateAllergies('')).toBe(false);
    });

    it('should return false for string with only spaces', () => {
      expect(validateAllergies('   ')).toBe(false);
    });
  });

  describe('validateImageData', () => {
    it('should return true for valid image data', () => {
      expect(validateImageData('data:image/jpeg;base64,validdata')).toBe(true);
    });

    it('should return false for null image data', () => {
      expect(validateImageData(null)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateImageData('')).toBe(false);
    });
  });

  describe('validateAnalysisRequest', () => {
    it('should return valid for complete request', () => {
      const result = validateAnalysisRequest('data:image/jpeg;base64,validdata', 'peanuts');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return invalid for missing image', () => {
      const result = validateAnalysisRequest(null, 'peanuts');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please upload an image');
    });

    it('should return invalid for empty image', () => {
      const result = validateAnalysisRequest('', 'peanuts');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please upload an image');
    });

    it('should return invalid for missing allergies', () => {
      const result = validateAnalysisRequest('data:image/jpeg;base64,validdata', '');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please enter your allergies');
    });

    it('should return invalid for allergies with only spaces', () => {
      const result = validateAnalysisRequest('data:image/jpeg;base64,validdata', '   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please enter your allergies');
    });
  });
});