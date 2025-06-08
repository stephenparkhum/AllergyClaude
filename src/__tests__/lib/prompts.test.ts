import { createAnalysisPrompt, createSystemMessage } from '@/lib/prompts';

describe('prompts', () => {
  describe('createSystemMessage', () => {
    it('should create system message with user allergies', () => {
      const allergies = 'peanuts, shellfish, dairy';
      const result = createSystemMessage(allergies);
      
      expect(result).toContain('You are an expert food safety analyst');
      expect(result).toContain('peanuts, shellfish, dairy');
      expect(result).toContain('Direct allergen ingredients');
      expect(result).toContain('Cross-contamination risks');
    });

    it('should handle empty allergies', () => {
      const result = createSystemMessage('');
      expect(result).toContain('You are an expert food safety analyst');
      expect(result).toContain('following allergies: ');
    });
  });

  describe('createAnalysisPrompt', () => {
    it('should create analysis prompt with user allergies', () => {
      const options = { userAllergies: 'peanuts, dairy' };
      const result = createAnalysisPrompt(options);
      
      expect(result).toContain('USER\'S ALLERGIES: peanuts, dairy');
      expect(result).toContain('food safety analyst');
      expect(result).toContain('Please analyze this food ingredient');
    });

    it('should use custom user message when provided', () => {
      const options = { 
        userAllergies: 'shellfish', 
        userMessage: 'Custom analysis request'
      };
      const result = createAnalysisPrompt(options);
      
      expect(result).toContain('Custom analysis request');
      expect(result).not.toContain('Please analyze this food ingredient');
    });

    it('should use default message when no custom message provided', () => {
      const options = { userAllergies: 'nuts' };
      const result = createAnalysisPrompt(options);
      
      expect(result).toContain('Please analyze this food ingredient');
      expect(result).toContain('1. If it\'s safe for me to consume');
    });

    it('should include system prompt with user allergies', () => {
      const options = { userAllergies: 'gluten, soy' };
      const result = createAnalysisPrompt(options);
      
      expect(result).toContain('USER\'S ALLERGIES: gluten, soy');
      expect(result).toContain('Be extremely thorough');
      expect(result).toContain('alternative names of allergens');
    });
  });
});