import { isValidImageFile, convertFileToDataURL, extractBase64Data } from '@/lib/utils/image';

describe('image utilities', () => {
  describe('isValidImageFile', () => {
    it('should return true for valid image files', () => {
      const imageFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      expect(isValidImageFile(imageFile)).toBe(true);
    });

    it('should return true for png files', () => {
      const imageFile = new File([''], 'test.png', { type: 'image/png' });
      expect(isValidImageFile(imageFile)).toBe(true);
    });

    it('should return false for non-image files', () => {
      const textFile = new File([''], 'test.txt', { type: 'text/plain' });
      expect(isValidImageFile(textFile)).toBe(false);
    });

    it('should return false for files without type', () => {
      const unknownFile = new File([''], 'test', { type: '' });
      expect(isValidImageFile(unknownFile)).toBe(false);
    });
  });

  describe('convertFileToDataURL', () => {
    it('should convert file to data URL', async () => {
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });
      const expectedDataURL = 'data:image/jpeg;base64,dGVzdCBjb250ZW50';

      global.FileReader = jest.fn(() => ({
        readAsDataURL: jest.fn(function (this: FileReader) {
          this.onload?.({ target: { result: expectedDataURL } } as ProgressEvent<FileReader>);
        }),
        onload: null,
        onerror: null,
      })) as unknown as typeof FileReader;

      const result = await convertFileToDataURL(mockFile);
      expect(result).toBe(expectedDataURL);
    });

    it('should reject on file reader error', async () => {
      const mockFile = new File(['test content'], 'test.jpg', { type: 'image/jpeg' });

      global.FileReader = jest.fn(() => ({
        readAsDataURL: jest.fn(function (this: FileReader) {
          this.onerror?.(new ProgressEvent('error'));
        }),
        onload: null,
        onerror: null,
      })) as unknown as typeof FileReader;

      await expect(convertFileToDataURL(mockFile)).rejects.toThrow('Failed to read file');
    });
  });

  describe('extractBase64Data', () => {
    it('should extract base64 data from data URL', () => {
      const dataURL =
        'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      const expected =
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

      expect(extractBase64Data(dataURL)).toBe(expected);
    });

    it('should handle PNG data URLs', () => {
      const dataURL = 'data:image/png;base64,testbase64data';
      const expected = 'testbase64data';

      expect(extractBase64Data(dataURL)).toBe(expected);
    });

    it('should return original string if no data URL prefix', () => {
      const input = 'justbase64data';
      expect(extractBase64Data(input)).toBe(input);
    });
  });
});
