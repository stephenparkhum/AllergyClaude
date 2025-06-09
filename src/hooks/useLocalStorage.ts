import { useState, useEffect } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from '@/lib/utils/storage';

/**
 * Custom hook for managing localStorage with SSR-safe hydration
 * 
 * @param key - The localStorage key
 * @param initialValue - The initial value to use before hydration
 * @returns [storedValue, setValue, isLoaded] tuple
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load value from localStorage on client-side mount
  useEffect(() => {
    try {
      const item = getFromLocalStorage(key);
      if (item) {
        setStoredValue(item);
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Function to update both state and localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Only save to localStorage after component has mounted and if value exists
      if (isLoaded && valueToStore !== null && valueToStore !== undefined) {
        // For strings, only save if not empty after trimming
        if (typeof valueToStore === 'string') {
          if (valueToStore.trim()) {
            saveToLocalStorage(key, valueToStore);
          }
        } else {
          saveToLocalStorage(key, valueToStore);
        }
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, isLoaded] as const;
}