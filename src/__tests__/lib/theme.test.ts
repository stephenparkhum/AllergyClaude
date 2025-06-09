import { lightTheme, darkTheme } from '@/lib/theme';

describe('MUI Theme Configuration', () => {
  describe('Light Theme', () => {
    it('should have correct primary color', () => {
      expect(lightTheme.palette.primary.main).toBe('#4F6F8C');
      expect(lightTheme.palette.primary.contrastText).toBe('#ffffff');
    });

    it('should have correct secondary color', () => {
      expect(lightTheme.palette.secondary.main).toBe('#BBD8F2');
      expect(lightTheme.palette.secondary.contrastText).toBe('#000000');
    });

    it('should be in light mode', () => {
      expect(lightTheme.palette.mode).toBe('light');
    });

    it('should have correct typography configuration', () => {
      expect(lightTheme.typography.fontFamily).toBe('var(--font-source-sans-pro), sans-serif');
      expect(lightTheme.typography.h1?.fontFamily).toBe('var(--font-source-sans-pro), sans-serif');
    });
  });

  describe('Dark Theme', () => {
    it('should have correct primary color', () => {
      expect(darkTheme.palette.primary.main).toBe('#4F6F8C');
      expect(darkTheme.palette.primary.contrastText).toBe('#ffffff');
    });

    it('should have correct secondary color', () => {
      expect(darkTheme.palette.secondary.main).toBe('#BBD8F2');
      expect(darkTheme.palette.secondary.contrastText).toBe('#000000');
    });

    it('should be in dark mode', () => {
      expect(darkTheme.palette.mode).toBe('dark');
    });

    it('should have correct typography configuration', () => {
      expect(darkTheme.typography.fontFamily).toBe('var(--font-source-sans-pro), sans-serif');
      expect(darkTheme.typography.h1?.fontFamily).toBe('var(--font-source-sans-pro), sans-serif');
    });
  });

  describe('Color Accessibility', () => {
    it('should use white text on primary color for good contrast', () => {
      expect(lightTheme.palette.primary.contrastText).toBe('#ffffff');
      expect(darkTheme.palette.primary.contrastText).toBe('#ffffff');
    });

    it('should use black text on secondary color for good contrast', () => {
      expect(lightTheme.palette.secondary.contrastText).toBe('#000000');
      expect(darkTheme.palette.secondary.contrastText).toBe('#000000');
    });
  });

  describe('Theme Structure', () => {
    it('should have all required palette properties', () => {
      [lightTheme, darkTheme].forEach(theme => {
        expect(theme.palette.primary).toBeDefined();
        expect(theme.palette.secondary).toBeDefined();
        expect(theme.palette.background).toBeDefined();
        expect(theme.palette.text).toBeDefined();
      });
    });

    it('should have consistent typography across themes', () => {
      expect(lightTheme.typography.fontFamily).toBe(darkTheme.typography.fontFamily);
      expect(lightTheme.typography.h1?.fontFamily).toBe(darkTheme.typography.h1?.fontFamily);
    });
  });
});
