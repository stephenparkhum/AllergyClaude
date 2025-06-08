import { siteData } from '@/lib/siteData';

describe('siteData', () => {
  describe('legal.copyright', () => {
    it('should include current year in copyright', () => {
      const currentYear = new Date().getFullYear();
      const copyright = siteData.legal.copyright;

      expect(copyright).toContain(currentYear.toString());
      expect(copyright).toContain('©');
      expect(copyright).toContain('Allergy Agents');
    });

    it('should show year range when current year is after founded year', () => {
      const currentYear = new Date().getFullYear();
      const foundedYear = parseInt(siteData.founded);
      const copyright = siteData.legal.copyright;

      if (currentYear > foundedYear) {
        expect(copyright).toContain(`${foundedYear}-${currentYear}`);
      } else {
        expect(copyright).toContain(currentYear.toString());
      }
    });

    it('should include disclaimer text', () => {
      const copyright = siteData.legal.copyright;

      expect(copyright).toContain('This tool is for informational purposes only');
      expect(copyright).toContain('should not replace professional medical advice');
    });

    it('should be a getter that calculates copyright each time', () => {
      // Verify that it's actually a getter by checking the property descriptor
      const descriptor = Object.getOwnPropertyDescriptor(siteData.legal, 'copyright');
      expect(descriptor?.get).toBeDefined();
      expect(descriptor?.set).toBeUndefined();

      // Verify multiple calls return the same result (since year doesn't change during test)
      const copyright1 = siteData.legal.copyright;
      const copyright2 = siteData.legal.copyright;
      expect(copyright1).toBe(copyright2);
    });

    it('should dynamically calculate year range based on founded year', () => {
      const currentYear = new Date().getFullYear();
      const foundedYear = parseInt(siteData.founded);
      const copyright = siteData.legal.copyright;

      // Test the specific logic for year range calculation
      if (currentYear > foundedYear) {
        // Should show range like "2024-2025"
        expect(copyright).toMatch(new RegExp(`© ${foundedYear}-${currentYear} Allergy Agents`));
      } else {
        // Should show single year like "2024"
        expect(copyright).toMatch(new RegExp(`© ${currentYear} Allergy Agents`));
      }
    });

    it('should format copyright string correctly', () => {
      const copyright = siteData.legal.copyright;

      // Check overall format: "© YEAR(S) Allergy Agents. Disclaimer text."
      expect(copyright).toMatch(
        /^© \d{4}(-\d{4})? Allergy Agents\. This tool is for informational purposes only and should not replace professional medical advice\.$/
      );
    });

    it('should handle edge case where founded year equals current year', () => {
      // Mock the current year to equal the founded year
      const originalDate = Date;
      const foundedYear = parseInt(siteData.founded);

      // Create a mock Date that returns the founded year
      const mockDate = jest.fn(() => ({
        getFullYear: () => foundedYear,
      }));

      // Replace Date constructor temporarily
      global.Date = mockDate as typeof Date;
      global.Date.prototype = originalDate.prototype;

      const copyright = siteData.legal.copyright;

      // Should show single year, not range
      expect(copyright).toContain(`© ${foundedYear} Allergy Agents`);
      expect(copyright).not.toContain('-');

      // Restore original Date
      global.Date = originalDate;
    });

    it('should be computed property not static string', () => {
      // Verify it's not just a static string by checking it contains current year
      const currentYear = new Date().getFullYear();
      const copyright = siteData.legal.copyright;

      // This test confirms the property is computed dynamically
      expect(copyright).toContain(currentYear.toString());

      // Test that it's a function/getter, not a static value
      const propertyDescriptor = Object.getOwnPropertyDescriptor(siteData.legal, 'copyright');
      expect(typeof propertyDescriptor?.get).toBe('function');
    });

    it('should maintain consistent format across multiple calls', () => {
      const copyright1 = siteData.legal.copyright;
      const copyright2 = siteData.legal.copyright;
      const copyright3 = siteData.legal.copyright;

      // All calls should return identical strings (since year doesn't change)
      expect(copyright1).toBe(copyright2);
      expect(copyright2).toBe(copyright3);

      // All should have the same format
      [copyright1, copyright2, copyright3].forEach(copyright => {
        expect(copyright).toMatch(/^© \d{4}(-\d{4})? Allergy Agents\./);
        expect(copyright).toContain('informational purposes only');
      });
    });

    it('should correctly handle different year scenarios', () => {
      const originalDate = global.Date;
      const foundedYear = parseInt(siteData.founded);

      try {
        // Test scenario 1: Future year (should show range)
        const futureYear = foundedYear + 5;
        jest.spyOn(global, 'Date').mockImplementation(
          () =>
            ({
              getFullYear: () => futureYear,
            }) as Date
        );

        const futureYearCopyright = siteData.legal.copyright;
        expect(futureYearCopyright).toContain(`© ${foundedYear}-${futureYear} Allergy Agents`);

        // Test scenario 2: Same year as founded (should show single year)
        jest.spyOn(global, 'Date').mockImplementation(
          () =>
            ({
              getFullYear: () => foundedYear,
            }) as Date
        );

        const sameYearCopyright = siteData.legal.copyright;
        expect(sameYearCopyright).toContain(`© ${foundedYear} Allergy Agents`);
        expect(sameYearCopyright).not.toContain('-');
      } finally {
        // Always restore original Date
        global.Date = originalDate;
        jest.restoreAllMocks();
      }
    });
  });

  it('should have all required properties', () => {
    expect(siteData.name).toBeDefined();
    expect(siteData.tagline).toBeDefined();
    expect(siteData.description).toBeDefined();
    expect(siteData.legal.company).toBeDefined();
    expect(siteData.legal.copyright).toBeDefined();
  });
});
