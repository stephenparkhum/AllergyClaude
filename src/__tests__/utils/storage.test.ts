import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from '@/lib/utils/storage';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('storage utilities', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  describe('saveToLocalStorage', () => {
    it('should save value to localStorage', () => {
      saveToLocalStorage('testKey', 'testValue');
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
    });

    it('should handle localStorage when window is undefined', () => {
      const originalWindow = global.window;
      delete (global as unknown as { window: unknown }).window;

      expect(() => saveToLocalStorage('testKey', 'testValue')).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe('getFromLocalStorage', () => {
    it('should retrieve value from localStorage', () => {
      mockLocalStorage.setItem('testKey', 'testValue');
      const result = getFromLocalStorage('testKey');
      expect(result).toBe('testValue');
    });

    it('should return null for non-existent key', () => {
      const result = getFromLocalStorage('nonExistentKey');
      expect(result).toBeNull();
    });

    it('should return null when window is undefined', () => {
      const originalWindow = global.window;
      delete (global as unknown as { window: unknown }).window;

      const result = getFromLocalStorage('testKey');
      expect(result).toBeNull();

      global.window = originalWindow;
    });
  });

  describe('removeFromLocalStorage', () => {
    it('should remove value from localStorage', () => {
      saveToLocalStorage('testKey', 'testValue');
      removeFromLocalStorage('testKey');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('should handle localStorage when window is undefined', () => {
      const originalWindow = global.window;
      delete (global as unknown as { window: unknown }).window;

      expect(() => removeFromLocalStorage('testKey')).not.toThrow();

      global.window = originalWindow;
    });
  });
});
